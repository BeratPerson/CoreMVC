using Microsoft.EntityFrameworkCore.Migrations;

namespace MVC_Eticaret.Migrations
{
    public partial class urunProp2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Urun_Renk_1",
                table: "Urunler",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Urun_Renk_2",
                table: "Urunler",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Urun_Renk_3",
                table: "Urunler",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Urun_Renk_4",
                table: "Urunler",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Urun_Renk_5",
                table: "Urunler",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Urun_Renk_6",
                table: "Urunler",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Urun_Renk_7",
                table: "Urunler",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Urun_Resim_4",
                table: "Urunler",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Urun_Resim_5",
                table: "Urunler",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Urun_Resim_6",
                table: "Urunler",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Urun_Resim_7",
                table: "Urunler",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Urun_Renk_1",
                table: "Urunler");

            migrationBuilder.DropColumn(
                name: "Urun_Renk_2",
                table: "Urunler");

            migrationBuilder.DropColumn(
                name: "Urun_Renk_3",
                table: "Urunler");

            migrationBuilder.DropColumn(
                name: "Urun_Renk_4",
                table: "Urunler");

            migrationBuilder.DropColumn(
                name: "Urun_Renk_5",
                table: "Urunler");

            migrationBuilder.DropColumn(
                name: "Urun_Renk_6",
                table: "Urunler");

            migrationBuilder.DropColumn(
                name: "Urun_Renk_7",
                table: "Urunler");

            migrationBuilder.DropColumn(
                name: "Urun_Resim_4",
                table: "Urunler");

            migrationBuilder.DropColumn(
                name: "Urun_Resim_5",
                table: "Urunler");

            migrationBuilder.DropColumn(
                name: "Urun_Resim_6",
                table: "Urunler");

            migrationBuilder.DropColumn(
                name: "Urun_Resim_7",
                table: "Urunler");
        }
    }
}
