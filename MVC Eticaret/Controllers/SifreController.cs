using Microsoft.AspNetCore.Mvc;
using MVC_Eticaret.Models;
using System.Linq;

namespace MVC_Eticaret.Controllers
{
    public class SifreController : Controller
    {
   // GET: Sifre

        public ActionResult ResetPassword(string id)
        {
            string sfr = "";

            foreach (char x in id)
            {
                int ascii = (int)x - 3;
                sfr += (char)ascii;
            }
            if (string.IsNullOrWhiteSpace(id))
            {
                return RedirectToAction("Eror404");

            }

            using (var context = new Context())
            {
                var user = context.UserProfile.Where(a => a.Mail == sfr).FirstOrDefault();
                if (user != null)
                {
                    ResetPasswordModel model = new ResetPasswordModel();
                    model.ResetCode = id;
                    return View(model);
                }


                else
                {
                    return RedirectToAction("Eror404");
                }
            }
        }

        [HttpPost]
        public ActionResult ResetPassword(ResetPasswordModel model)
        {
            string sfr = "";
            foreach (char x in model.ResetCode)
            {
                int ascii = (int)x - 3;
                sfr += (char)ascii;
            }

            var message = "";
            if (ModelState.IsValid)
            {
                using (var context = new Context())
                {
                    var user = context.UserProfile.Where(a => a.Mail == sfr).FirstOrDefault();
                    if (user != null)
                    {
                        user.Password = model.NewPassword;
                        context.SaveChanges();
                        message = "Yeni Şifre Güncellendi";
                    }

                }
            }
            else
            {
                message = "Bir Şeyler Yanlış Gitti";
            }
            ViewBag.Message = message;
            return View();
        }
    }
}