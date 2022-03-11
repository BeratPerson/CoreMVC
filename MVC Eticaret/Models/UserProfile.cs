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
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string UserName { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Password { get; set; }
        [DataType(DataType.Password)]
        [Compare("NewPassword", ErrorMessage = "Şifreler Eşleşmedi")]
        public string ConfirmPassword { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Name { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string LastName { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Mail { get; set; }
        public string TelNo { get; set; }
        public DateTime DogumTarihi { get; set; }
        public bool IsActive { get; set; }

    }
}
