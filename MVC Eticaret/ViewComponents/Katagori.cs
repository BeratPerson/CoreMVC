﻿using Microsoft.AspNetCore.Mvc;
using MVC_Eticaret.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace MVC_Eticaret.ViewComponents
{
    public class Katagori : ViewComponent
    {
        Context c = new Context();
        public IViewComponentResult Invoke()
        {
            ViewModel viewModel = new ViewModel();
            viewModel.AltKatagori = c.AltKatagoriler.ToList();
            viewModel.Katagori = c.katagoriler.ToList();
            return View(viewModel);

        }
    }
}
