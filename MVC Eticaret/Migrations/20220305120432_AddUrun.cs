using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MVC_Eticaret.Migrations
{
    public partial class AddUrun : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Urunler",
                columns: table => new
                {
                    Urun_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Urun_WEB_Kimlik = table.Column<int>(type: "int", nullable: false),
                    Urun_Adi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Urun_Fiyat = table.Column<int>(type: "int", nullable: false),
                    Urun_Detay = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Urun_Resim_1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Urun_Resim_2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Urun_Resim_3 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Urun_Talep_Firma = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Urun_Puan = table.Column<int>(type: "int", nullable: false),
                    Urun_Durum = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Urun_Marka = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Urun_StokDurum = table.Column<bool>(type: "bit", nullable: false),
                    urun_OlusturmaTarihi = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Urunler", x => x.Urun_Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Urunler");
        }
    }
}
