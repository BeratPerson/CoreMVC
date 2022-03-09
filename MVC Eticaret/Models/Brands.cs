using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MVC_Eticaret.Models
{
    public class Brands
    {
        [Key]
        public int brand_Id { get; set; }
        public int brand_Adet { get; set; }
        public string brand_Adi { get; set; }
        public string brand_Link { get; set; }

    }
}
