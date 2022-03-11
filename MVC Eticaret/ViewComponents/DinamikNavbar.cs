using Microsoft.AspNetCore.Mvc;
using MVC_Eticaret.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MVC_Eticaret.ViewComponents
{

    public class DinamikNavbar : ViewComponent
    {
        Context c = new Context();

        public IViewComponentResult Invoke()
        {
                return View();
        }
    }
}
