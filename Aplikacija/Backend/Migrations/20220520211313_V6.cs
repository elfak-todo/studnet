using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class V6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Student_Parlament_ParlamentId",
                table: "Student");

            migrationBuilder.DropForeignKey(
                name: "FK_Student_University_UniversityId",
                table: "Student");

            migrationBuilder.AlterColumn<int>(
                name: "UniversityId",
                table: "Student",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ParlamentId",
                table: "Student",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Student_Parlament_ParlamentId",
                table: "Student",
                column: "ParlamentId",
                principalTable: "Parlament",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Student_University_UniversityId",
                table: "Student",
                column: "UniversityId",
                principalTable: "University",
                principalColumn: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Student_Parlament_ParlamentId",
                table: "Student");

            migrationBuilder.DropForeignKey(
                name: "FK_Student_University_UniversityId",
                table: "Student");

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
    }
}
