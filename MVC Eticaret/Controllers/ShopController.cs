using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MVC_Eticaret.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MVC_Eticaret.Controllers
{
    public class ShopController : Controller
    {
        Context c =new Context();
        public IActionResult Product()
        {
            string user = GetSession("user");
            if (user != null)
            {
                ViewBag.User = c.UserProfile.Where(x => x.UserId == int.Parse(user)).ToList();

            }

            return View();
        }
        public IActionResult ProductDetails()
        {
            string user = GetSession("user");
            if (user != null)
            {
                ViewBag.User = c.UserProfile.Where(x => x.UserId == int.Parse(user)).ToList();

            }
            return View();
        }
        public IActionResult Checkout()
        {
            string user = GetSession("user");
            if (user != null)
            {
                ViewBag.User = c.UserProfile.Where(x => x.UserId == int.Parse(user)).ToList();

            }
            return View();
        }
        public IActionResult Cart()
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
        public string GetSession(string key)
        {
            return HttpContext.Session.GetString(key); ;
        }
    }
}
