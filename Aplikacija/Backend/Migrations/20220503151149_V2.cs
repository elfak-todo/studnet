using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Edited",
                table: "Post",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "UniversityID",
                table: "Location",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Edited",
                table: "Comment",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Location_UniversityID",
                table: "Location",
                column: "UniversityID");

            migrationBuilder.AddForeignKey(
                name: "FK_Location_University_UniversityID",
                table: "Location",
                column: "UniversityID",
                principalTable: "University",
                principalColumn: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Location_University_UniversityID",
                table: "Location");

            migrationBuilder.DropIndex(
                name: "IX_Location_UniversityID",
                table: "Location");

            migrationBuilder.DropColumn(
                name: "Edited",
                table: "Post");

            migrationBuilder.DropColumn(
                name: "UniversityID",
                table: "Location");

            migrationBuilder.DropColumn(
                name: "Edited",
                table: "Comment");
        }
    }
}
