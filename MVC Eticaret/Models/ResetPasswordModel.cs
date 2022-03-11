using System.ComponentModel.DataAnnotations;
namespace MVC_Eticaret.Models
{
    public class ResetPasswordModel
        {
            [Required(ErrorMessage = "Yeni Şifre Zorunlu", AllowEmptyStrings = false)]
            [DataType(DataType.Password)]
            public string NewPassword { get; set; }

            [DataType(DataType.Password)]
            [Compare("NewPassword", ErrorMessage = "Şifreler Eşleşmedi")]
            public string ConfirmPassword { get; set; }
            [Required]
            public string ResetCode { get; set; }
        }
}