using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MVC_Eticaret.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;


namespace MVC_Eticaret.Controllers
{
    public class HomeController : Controller
    {

        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        Context c = new Context();
        public IActionResult Index()
        {
            var AktifUrunler = c.Urunler.Where(x => x.Urun_StokDurum == true).ToList();
            string user = GetSession("user");
            if (user != null)
            {
                ViewBag.User = c.UserProfile.Where(x => x.UserId == int.Parse(user)).ToList();
            }
            return View(AktifUrunler);
        }


        public IActionResult Catagory(int? id)
        {
            var Katagori = c.Urunler.Where(x => x.KatagoriId == id & x.Urun_StokDurum == true).ToList();
            return View(Katagori);
        }


        public IActionResult AltCatagory(int? id)
        {
            var Katagori = c.Urunler.Where(x => x.AltKatagoriId == id & x.Urun_StokDurum == true).ToList();
            return View(Katagori);
        }
        public IActionResult UrunDetay(int? id)
        {
            string user = GetSession("user");
            if (user != null)
            {
                ViewBag.User = c.UserProfile.Where(x => x.UserId == int.Parse(user)).ToList();

            }
            var Urun = c.Urunler.Where(x => x.Urun_Id == id).FirstOrDefault();
            return View(Urun);
        }
        public IActionResult Login()
        {
            return View();
        }
        public IActionResult LogOut()
        {
            Clear();
            return RedirectToAction("Index");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(UserProfile user)
        {
            if (ModelState.IsValid)
            {
                using (Context c = new Context())
                {
                    var obj = c.UserProfile.Where(a => a.UserName.Equals(user.UserName) && a.Password.Equals(user.Password)).FirstOrDefault();
                    if (obj != null)
                    {
                        SetSession("user", Convert.ToString(obj.UserId));
                        return RedirectToAction("Index");
                    }
                }
            }
            TempData["Message"] = "Bir şeyler  yanlış gitti.";

            return View(user);
        }
        public ActionResult Register()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Register(UserProfile user)
        {
            if (ModelState.IsValid)
            {
                using (var context = new Context())
                {
                    user.IsActive = true;
                    user.DogumTarihi = user.DogumTarihi;
                    user.UserName = user.UserName;
                    user.Name = user.Name;
                    user.LastName = user.LastName;
                    user.Mail = user.Mail;
                    user.TelNo = user.TelNo;
                    c.Add(user);
                    c.SaveChanges();
                    TempData["Register"]=("Başarılı");
                    return RedirectToAction("Login");

                }
            }
            TempData["Register"] = ("Bilgilerinizi Kontrol Ediniz.");

            return View();


        }
        public IActionResult Contact()
        {
            string user = GetSession("user");
            if (user != null)
            {
                ViewBag.User = c.UserProfile.Where(x => x.UserId == int.Parse(user)).ToList();

            }
            return View();
        }
        public void SetSession(string key, string value)
        {
            HttpContext.Session.SetString(key, value);
        }
        public void Clear()
        {
            HttpContext.Session.Clear();
        }
        public string GetSession(string key)
        {
            return HttpContext.Session.GetString(key); ;
        }
        [HttpPost]
        public ActionResult ForgotPassword(string Email)
        {
            string sfr = "";
            foreach (char x in Email)
            {
                int ascii = (int)x + 3;
                sfr += (char)ascii;
            }

            var verifyUrl = "/Sifre/ResetPassword/" + sfr;
            var link = "https://localhost:44329" + verifyUrl;
            using (var context = new Context())
            {
                var getUser = context.UserProfile.Where(x => x.Mail == Email).FirstOrDefault();
                if (getUser != null)
                {

                    var subject = "Şifre Sıfırlama Talebi";
                    var body = "Merhaba " + getUser.UserName + ", <br/> Kısa süre önce hesabınız için şifrenizi sıfırlamayı istediniz. Sıfırlamak için aşağıdaki bağlantıya tıklayın. " +

                         " <br/><br/><a href='" + link + "'>" + link + "</a> <br/><br/>" +
                         "Şifre sıfırlama talebinde bulunmadıysanız, lütfen bu e-postayı dikkate almayın veya bize bildirmek için yanıtlayın.<br/><br/> Teşekkürler";

                    SendEmail(getUser.Mail, body, subject);

                    ViewBag.Message = "Şifreyi sıfırla bağlantısı e-posta adresinize gönderildi.";
                }
                else
                {
                    ViewBag.Message = "Kullanıcı Bulunamadı";
                    return RedirectToAction("Login");
                }
            }

            return RedirectToAction("");
        }

        private void SendEmail(string emailAddress, string body, string subject)
        {
            using (MailMessage mm = new MailMessage("beratkisi1234@gmail.com", emailAddress))
            {
                mm.Subject = subject;
                mm.Body = body;
                mm.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.EnableSsl = true;
                NetworkCredential NetworkCred = new NetworkCredential("beratkisi1234@gmail.com", "mami1980");
                smtp.UseDefaultCredentials = true;
                smtp.Credentials = NetworkCred;
                smtp.Port = 587;
                smtp.Send(mm);
            }
        }


    }
}

