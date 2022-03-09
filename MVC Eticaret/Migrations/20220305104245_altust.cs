using Microsoft.EntityFrameworkCore.Migrations;

namespace MVC_Eticaret.Migrations
{
    public partial class altust : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AltKatagoriler",
                columns: table => new
                {
                    AltKatagoriId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AltKatagori = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    katagoriId = table.Column<int>(type: "int", nullable: false),
                    AltKatagori_Link = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AltKatagoriler", x => x.AltKatagoriId);
                });

            migrationBuilder.CreateTable(
                name: "katagoriler",
                columns: table => new
                {
                    katagoriId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Katagori = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_katagoriler", x => x.katagoriId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AltKatagoriler");

            migrationBuilder.DropTable(
                name: "katagoriler");
        }
    }
}
