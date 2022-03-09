using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MVC_Eticaret.Models
{
    public class ViewModel
    {
        public List<Katagoriler> Katagori { get; set; }

        public List<Altkatagoriler> AltKatagori { get; set; }

    }
    public class Katagoriler
    {
        [Key]
        public int katagoriId { get; set; }
        public string Katagori { get; set; }
        public string KatagoriLink { get; set; }

    }

}
