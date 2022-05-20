using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class V5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Student_Parlament_ParlamentID",
                table: "Student");

            migrationBuilder.DropForeignKey(
                name: "FK_Student_University_UniversityID",
                table: "Student");

            migrationBuilder.RenameColumn(
                name: "UniversityID",
                table: "Student",
                newName: "UniversityId");

            migrationBuilder.RenameColumn(
                name: "ParlamentID",
                table: "Student",
                newName: "ParlamentId");

            migrationBuilder.RenameIndex(
                name: "IX_Student_UniversityID",
                table: "Student",
                newName: "IX_Student_UniversityId");

            migrationBuilder.RenameIndex(
                name: "IX_Student_ParlamentID",
                table: "Student",
                newName: "IX_Student_ParlamentId");

            migrationBuilder.AlterColumn<int>(
                name: "UniversityId",
                table: "Student",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ParlamentId",
                table: "Student",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Student_Email",
                table: "Student",
                column: "Email");

            migrationBuilder.AddForeignKey(
                name: "FK_Student_Parlament_ParlamentId",
                table: "Student",
                column: "ParlamentId",
                principalTable: "Parlament",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Student_University_UniversityId",
                table: "Student",
                column: "UniversityId",
                principalTable: "University",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Student_Parlament_ParlamentId",
                table: "Student");

            migrationBuilder.DropForeignKey(
                name: "FK_Student_University_UniversityId",
                table: "Student");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Student_Email",
                table: "Student");

            migrationBuilder.RenameColumn(
                name: "UniversityId",
                table: "Student",
                newName: "UniversityID");

            migrationBuilder.RenameColumn(
                name: "ParlamentId",
                table: "Student",
                newName: "ParlamentID");

            migrationBuilder.RenameIndex(
                name: "IX_Student_UniversityId",
                table: "Student",
                newName: "IX_Student_UniversityID");

            migrationBuilder.RenameIndex(
                name: "IX_Student_ParlamentId",
                table: "Student",
                newName: "IX_Student_ParlamentID");

            migrationBuilder.AlterColumn<int>(
                name: "UniversityID",
                table: "Student",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ParlamentID",
                table: "Student",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Student_Parlament_ParlamentID",
                table: "Student",
                column: "ParlamentID",
                principalTable: "Parlament",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Student_University_UniversityID",
                table: "Student",
                column: "UniversityID",
                principalTable: "University",
                principalColumn: "ID");
        }
    }
}
