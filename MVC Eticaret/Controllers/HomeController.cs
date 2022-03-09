using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MVC_Eticaret.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace MVC_Eticaret.Controllers
{
    public class HomeController : Controller
    {
        private static readonly string isAktifTrue = "False";

        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        Context c = new Context();
        public IActionResult Index()
        {
            var AktifUrunler = c.Urunler.Where(x => x.Urun_StokDurum == true).ToList();
            return View(AktifUrunler);
        }
        public IActionResult UrunDetay(int? id)
        {
            var Urun = c.Urunler.Where(x => x.Urun_Id == id).FirstOrDefault();
            return View(Urun);
        }
        public IActionResult Login()
        {
            return View();
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
                        HttpContext.Session.SetString(isAktifTrue,"True");

                        return RedirectToAction("Index");
                    }
                }
            }
            return View(user);
        }



        public IActionResult Contact()
        {
            return View();
        }


    }
}
