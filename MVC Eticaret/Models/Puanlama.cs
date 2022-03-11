using System.ComponentModel.DataAnnotations;

namespace MVC_Eticaret.Models
{
    public class Puanlama
    {
        [Key]
        public int Yorum_Id { get; set; }
        public int urun_Id { get; set; }
        public int urun_Puan { get; set; }
        public string urun_Yorum { get; set; }
        public string Yorum_Yapan_ad_Soyad { get; set; }
        public string Yorum_Yapan_Mail { get; set; }

    }
}
