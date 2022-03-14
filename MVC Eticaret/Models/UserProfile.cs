using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MVC_Eticaret.Models
{
    public class UserProfile
    {
        [Key]
        public int UserId { get; set; }
        [Required(ErrorMessage = "Kullanıcı Adı Boş geçilemez", AllowEmptyStrings = false)]
        [StringLength(50, MinimumLength = 3)]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Şifre Boş geçilemez", AllowEmptyStrings = false)]

        [StringLength(50, MinimumLength = 6)]
        public string Password { get; set; }
        [StringLength(50, MinimumLength = 3)]
        public string Name { get; set; }
        [StringLength(50, MinimumLength = 3)]
        public string LastName { get; set; }
        [StringLength(50, MinimumLength = 3)]
        public string Mail { get; set; }
        public string TelNo { get; set; }
        public DateTime DogumTarihi { get; set; }
        public bool IsActive { get; set; }

    }
}
