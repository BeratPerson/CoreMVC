using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MVC_Eticaret.Models;

namespace MVC_Eticaret.Controllers
{
    public class AdminController : Controller
    {
        Context c = new Context();

        // GET: AdminController
        public ActionResult Index()
        {
            return View();

        }
        public ActionResult Product()
        {
            ViewBag.katagori = c.katagoriler;
            var urunler = c.Urunler;
            return View(urunler);
        }


        // GET: AdminController/Details/5
        public ActionResult ProductDetails(int id)
        {
            return View();
        }

        // GET: AdminController/Create
        public ActionResult ProductCreate()
        {
            return View();
        }

        // POST: AdminController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ProductCreate(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: AdminController/Edit/5
        public ActionResult ProductEdit(int id)
        {
            return View();
        }

        // POST: AdminController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ProductEdit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: AdminController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: AdminController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ProductDelete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
