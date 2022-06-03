using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class V13 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Post_Student_AuthorID",
                table: "Post");

            migrationBuilder.RenameColumn(
                name: "AuthorID",
                table: "Post",
                newName: "AuthorId");

            migrationBuilder.RenameIndex(
                name: "IX_Post_AuthorID",
                table: "Post",
                newName: "IX_Post_AuthorId");

            migrationBuilder.AddColumn<int>(
                name: "FacultyId",
                table: "Parlament",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Parlament_FacultyId",
                table: "Parlament",
                column: "FacultyId",
                unique: true,
                filter: "[FacultyId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Parlament_Location_FacultyId",
                table: "Parlament",
                column: "FacultyId",
                principalTable: "Location",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Post_Student_AuthorId",
                table: "Post",
                column: "AuthorId",
                principalTable: "Student",
                principalColumn: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Parlament_Location_FacultyId",
                table: "Parlament");

            migrationBuilder.DropForeignKey(
                name: "FK_Post_Student_AuthorId",
                table: "Post");

            migrationBuilder.DropIndex(
                name: "IX_Parlament_FacultyId",
                table: "Parlament");

            migrationBuilder.DropColumn(
                name: "FacultyId",
                table: "Parlament");

            migrationBuilder.RenameColumn(
                name: "AuthorId",
                table: "Post",
                newName: "AuthorID");

            migrationBuilder.RenameIndex(
                name: "IX_Post_AuthorId",
                table: "Post",
                newName: "IX_Post_AuthorID");

            migrationBuilder.AddForeignKey(
                name: "FK_Post_Student_AuthorID",
                table: "Post",
                column: "AuthorID",
                principalTable: "Student",
                principalColumn: "ID");
        }
    }
}
