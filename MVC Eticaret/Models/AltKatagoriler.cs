using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MVC_Eticaret.Models
{
    public class Altkatagoriler
    {
        [Key]
        public int AltKatagoriId { get; set; }

        public string AltKatagori { get; set; }
        public int katagoriId { get; set; }
        public string AltKatagori_Link { get; set; }

    }
}
