using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MVC_Eticaret.Models
{
    public class Context:DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=DESKTOP-L41CNHP\\SQLEXPRESS;database=ECommance3;integrated security=true;MultipleActiveResultSets=true;");
        }
        public DbSet <Katagoriler> katagoriler { get; set; }
        public DbSet <Brands> Brands { get; set; }
        public DbSet <Altkatagoriler> AltKatagoriler { get; set; }
        public DbSet <Urunler> Urunler { get; set; }
        public DbSet <UserProfile> UserProfile { get; set; }

    
    }
}
