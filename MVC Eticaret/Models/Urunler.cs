using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MVC_Eticaret.Models
{
    public class Urunler
    {
        [Key]
        public int Urun_Id { get; set; }
        public int Urun_WEB_Kimlik { get; set; }
        public string Urun_Adi { get; set; }
        public double Urun_Fiyat { get; set; }
        public string Urun_Detay { get; set; }
        public string Urun_Resim_1 { get; set; }
        public string Urun_Resim_2 { get; set; }
        public string Urun_Resim_3 { get; set; }
        public string Urun_Talep_Firma{ get; set; }
        public double Urun_Puan { get; set; }
        public string Urun_Durum { get; set; }
        public string Urun_Marka { get; set; }
        public bool Urun_StokDurum { get; set; }
        public DateTime urun_OlusturmaTarihi { get; set; }
    }
}
