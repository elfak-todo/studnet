using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class V7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Event_CommentedEventID",
                table: "Comment");

            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Post_CommentedPostID",
                table: "Comment");

            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Student_AuthorID",
                table: "Comment");

            migrationBuilder.DropForeignKey(
                name: "FK_Event_Location_LocationID",
                table: "Event");

            migrationBuilder.DropForeignKey(
                name: "FK_Event_Parlament_OrganisingParlamentID",
                table: "Event");

            migrationBuilder.DropForeignKey(
                name: "FK_Event_Student_OrganiserID",
                table: "Event");

            migrationBuilder.DropForeignKey(
                name: "FK_Grade_Location_GradedLocationID",
                table: "Grade");

            migrationBuilder.DropForeignKey(
                name: "FK_Grade_Student_GradedByID",
                table: "Grade");

            migrationBuilder.DropForeignKey(
                name: "FK_Location_Student_AuthorID",
                table: "Location");

            migrationBuilder.DropForeignKey(
                name: "FK_Location_University_UniversityID",
                table: "Location");

            migrationBuilder.DropForeignKey(
                name: "FK_Parlament_University_UniversityID",
                table: "Parlament");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_Event_EventID",
                table: "Reservation");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_Student_ReservedByID",
                table: "Reservation");

            migrationBuilder.RenameColumn(
                name: "ReservedByID",
                table: "Reservation",
                newName: "ReservedById");

            migrationBuilder.RenameColumn(
                name: "EventID",
                table: "Reservation",
                newName: "EventId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservation_ReservedByID",
                table: "Reservation",
                newName: "IX_Reservation_ReservedById");

            migrationBuilder.RenameIndex(
                name: "IX_Reservation_EventID",
                table: "Reservation",
                newName: "IX_Reservation_EventId");

            migrationBuilder.RenameColumn(
                name: "UniversityID",
                table: "Parlament",
                newName: "UniversityId");

            migrationBuilder.RenameIndex(
                name: "IX_Parlament_UniversityID",
                table: "Parlament",
                newName: "IX_Parlament_UniversityId");

            migrationBuilder.RenameColumn(
                name: "UniversityID",
                table: "Location",
                newName: "UniversityId");

            migrationBuilder.RenameColumn(
                name: "AuthorID",
                table: "Location",
                newName: "AuthorId");

            migrationBuilder.RenameIndex(
                name: "IX_Location_UniversityID",
                table: "Location",
                newName: "IX_Location_UniversityId");

            migrationBuilder.RenameIndex(
                name: "IX_Location_AuthorID",
                table: "Location",
                newName: "IX_Location_AuthorId");

            migrationBuilder.RenameColumn(
                name: "GradedLocationID",
                table: "Grade",
                newName: "GradedLocationId");

            migrationBuilder.RenameColumn(
                name: "GradedByID",
                table: "Grade",
                newName: "GradedById");

            migrationBuilder.RenameIndex(
                name: "IX_Grade_GradedLocationID",
                table: "Grade",
                newName: "IX_Grade_GradedLocationId");

            migrationBuilder.RenameIndex(
                name: "IX_Grade_GradedByID",
                table: "Grade",
                newName: "IX_Grade_GradedById");

            migrationBuilder.RenameColumn(
                name: "OrganisingParlamentID",
                table: "Event",
                newName: "OrganisingParlamentId");

            migrationBuilder.RenameColumn(
                name: "OrganiserID",
                table: "Event",
                newName: "OrganiserId");

            migrationBuilder.RenameColumn(
                name: "LocationID",
                table: "Event",
                newName: "LocationId");

            migrationBuilder.RenameIndex(
                name: "IX_Event_OrganisingParlamentID",
                table: "Event",
                newName: "IX_Event_OrganisingParlamentId");

            migrationBuilder.RenameIndex(
                name: "IX_Event_OrganiserID",
                table: "Event",
                newName: "IX_Event_OrganiserId");

            migrationBuilder.RenameIndex(
                name: "IX_Event_LocationID",
                table: "Event",
                newName: "IX_Event_LocationId");

            migrationBuilder.RenameColumn(
                name: "CommentedPostID",
                table: "Comment",
                newName: "CommentedPostId");

            migrationBuilder.RenameColumn(
                name: "CommentedEventID",
                table: "Comment",
                newName: "CommentedEventId");

            migrationBuilder.RenameColumn(
                name: "AuthorID",
                table: "Comment",
                newName: "AuthorId");

            migrationBuilder.RenameIndex(
                name: "IX_Comment_CommentedPostID",
                table: "Comment",
                newName: "IX_Comment_CommentedPostId");

            migrationBuilder.RenameIndex(
                name: "IX_Comment_CommentedEventID",
                table: "Comment",
                newName: "IX_Comment_CommentedEventId");

            migrationBuilder.RenameIndex(
                name: "IX_Comment_AuthorID",
                table: "Comment",
                newName: "IX_Comment_AuthorId");

            migrationBuilder.AddColumn<int>(
                name: "UniversityId",
                table: "Post",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UniversityId",
                table: "Event",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Post_UniversityId",
                table: "Post",
                column: "UniversityId");

            migrationBuilder.CreateIndex(
                name: "IX_Event_UniversityId",
                table: "Event",
                column: "UniversityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Event_CommentedEventId",
                table: "Comment",
                column: "CommentedEventId",
                principalTable: "Event",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Post_CommentedPostId",
                table: "Comment",
                column: "CommentedPostId",
                principalTable: "Post",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Student_AuthorId",
                table: "Comment",
                column: "AuthorId",
                principalTable: "Student",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Event_Location_LocationId",
                table: "Event",
                column: "LocationId",
                principalTable: "Location",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Event_Parlament_OrganisingParlamentId",
                table: "Event",
                column: "OrganisingParlamentId",
                principalTable: "Parlament",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Event_Student_OrganiserId",
                table: "Event",
                column: "OrganiserId",
                principalTable: "Student",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Event_University_UniversityId",
                table: "Event",
                column: "UniversityId",
                principalTable: "University",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Grade_Location_GradedLocationId",
                table: "Grade",
                column: "GradedLocationId",
                principalTable: "Location",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Grade_Student_GradedById",
                table: "Grade",
                column: "GradedById",
                principalTable: "Student",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Location_Student_AuthorId",
                table: "Location",
                column: "AuthorId",
                principalTable: "Student",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Location_University_UniversityId",
                table: "Location",
                column: "UniversityId",
                principalTable: "University",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Parlament_University_UniversityId",
                table: "Parlament",
                column: "UniversityId",
                principalTable: "University",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Post_University_UniversityId",
                table: "Post",
                column: "UniversityId",
                principalTable: "University",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_Event_EventId",
                table: "Reservation",
                column: "EventId",
                principalTable: "Event",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_Student_ReservedById",
                table: "Reservation",
                column: "ReservedById",
                principalTable: "Student",
                principalColumn: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Event_CommentedEventId",
                table: "Comment");

            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Post_CommentedPostId",
                table: "Comment");

            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Student_AuthorId",
                table: "Comment");

            migrationBuilder.DropForeignKey(
                name: "FK_Event_Location_LocationId",
                table: "Event");

            migrationBuilder.DropForeignKey(
                name: "FK_Event_Parlament_OrganisingParlamentId",
                table: "Event");

            migrationBuilder.DropForeignKey(
                name: "FK_Event_Student_OrganiserId",
                table: "Event");

            migrationBuilder.DropForeignKey(
                name: "FK_Event_University_UniversityId",
                table: "Event");

            migrationBuilder.DropForeignKey(
                name: "FK_Grade_Location_GradedLocationId",
                table: "Grade");

            migrationBuilder.DropForeignKey(
                name: "FK_Grade_Student_GradedById",
                table: "Grade");

            migrationBuilder.DropForeignKey(
                name: "FK_Location_Student_AuthorId",
                table: "Location");

            migrationBuilder.DropForeignKey(
                name: "FK_Location_University_UniversityId",
                table: "Location");

            migrationBuilder.DropForeignKey(
                name: "FK_Parlament_University_UniversityId",
                table: "Parlament");

            migrationBuilder.DropForeignKey(
                name: "FK_Post_University_UniversityId",
                table: "Post");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_Event_EventId",
                table: "Reservation");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_Student_ReservedById",
                table: "Reservation");

            migrationBuilder.DropIndex(
                name: "IX_Post_UniversityId",
                table: "Post");

            migrationBuilder.DropIndex(
                name: "IX_Event_UniversityId",
                table: "Event");

            migrationBuilder.DropColumn(
                name: "UniversityId",
                table: "Post");

            migrationBuilder.DropColumn(
                name: "UniversityId",
                table: "Event");

            migrationBuilder.RenameColumn(
                name: "ReservedById",
                table: "Reservation",
                newName: "ReservedByID");

            migrationBuilder.RenameColumn(
                name: "EventId",
                table: "Reservation",
                newName: "EventID");

            migrationBuilder.RenameIndex(
                name: "IX_Reservation_ReservedById",
                table: "Reservation",
                newName: "IX_Reservation_ReservedByID");

            migrationBuilder.RenameIndex(
                name: "IX_Reservation_EventId",
                table: "Reservation",
                newName: "IX_Reservation_EventID");

            migrationBuilder.RenameColumn(
                name: "UniversityId",
                table: "Parlament",
                newName: "UniversityID");

            migrationBuilder.RenameIndex(
                name: "IX_Parlament_UniversityId",
                table: "Parlament",
                newName: "IX_Parlament_UniversityID");

            migrationBuilder.RenameColumn(
                name: "UniversityId",
                table: "Location",
                newName: "UniversityID");

            migrationBuilder.RenameColumn(
                name: "AuthorId",
                table: "Location",
                newName: "AuthorID");

            migrationBuilder.RenameIndex(
                name: "IX_Location_UniversityId",
                table: "Location",
                newName: "IX_Location_UniversityID");

            migrationBuilder.RenameIndex(
                name: "IX_Location_AuthorId",
                table: "Location",
                newName: "IX_Location_AuthorID");

            migrationBuilder.RenameColumn(
                name: "GradedLocationId",
                table: "Grade",
                newName: "GradedLocationID");

            migrationBuilder.RenameColumn(
                name: "GradedById",
                table: "Grade",
                newName: "GradedByID");

            migrationBuilder.RenameIndex(
                name: "IX_Grade_GradedLocationId",
                table: "Grade",
                newName: "IX_Grade_GradedLocationID");

            migrationBuilder.RenameIndex(
                name: "IX_Grade_GradedById",
                table: "Grade",
                newName: "IX_Grade_GradedByID");

            migrationBuilder.RenameColumn(
                name: "OrganisingParlamentId",
                table: "Event",
                newName: "OrganisingParlamentID");

            migrationBuilder.RenameColumn(
                name: "OrganiserId",
                table: "Event",
                newName: "OrganiserID");

            migrationBuilder.RenameColumn(
                name: "LocationId",
                table: "Event",
                newName: "LocationID");

            migrationBuilder.RenameIndex(
                name: "IX_Event_OrganisingParlamentId",
                table: "Event",
                newName: "IX_Event_OrganisingParlamentID");

            migrationBuilder.RenameIndex(
                name: "IX_Event_OrganiserId",
                table: "Event",
                newName: "IX_Event_OrganiserID");

            migrationBuilder.RenameIndex(
                name: "IX_Event_LocationId",
                table: "Event",
                newName: "IX_Event_LocationID");

            migrationBuilder.RenameColumn(
                name: "CommentedPostId",
                table: "Comment",
                newName: "CommentedPostID");

            migrationBuilder.RenameColumn(
                name: "CommentedEventId",
                table: "Comment",
                newName: "CommentedEventID");

            migrationBuilder.RenameColumn(
                name: "AuthorId",
                table: "Comment",
                newName: "AuthorID");

            migrationBuilder.RenameIndex(
                name: "IX_Comment_CommentedPostId",
                table: "Comment",
                newName: "IX_Comment_CommentedPostID");

            migrationBuilder.RenameIndex(
                name: "IX_Comment_CommentedEventId",
                table: "Comment",
                newName: "IX_Comment_CommentedEventID");

            migrationBuilder.RenameIndex(
                name: "IX_Comment_AuthorId",
                table: "Comment",
                newName: "IX_Comment_AuthorID");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Event_CommentedEventID",
                table: "Comment",
                column: "CommentedEventID",
                principalTable: "Event",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Post_CommentedPostID",
                table: "Comment",
                column: "CommentedPostID",
                principalTable: "Post",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Student_AuthorID",
                table: "Comment",
                column: "AuthorID",
                principalTable: "Student",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Event_Location_LocationID",
                table: "Event",
                column: "LocationID",
                principalTable: "Location",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Event_Parlament_OrganisingParlamentID",
                table: "Event",
                column: "OrganisingParlamentID",
                principalTable: "Parlament",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Event_Student_OrganiserID",
                table: "Event",
                column: "OrganiserID",
                principalTable: "Student",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Grade_Location_GradedLocationID",
                table: "Grade",
                column: "GradedLocationID",
                principalTable: "Location",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Grade_Student_GradedByID",
                table: "Grade",
                column: "GradedByID",
                principalTable: "Student",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Location_Student_AuthorID",
                table: "Location",
                column: "AuthorID",
                principalTable: "Student",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Location_University_UniversityID",
                table: "Location",
                column: "UniversityID",
                principalTable: "University",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Parlament_University_UniversityID",
                table: "Parlament",
                column: "UniversityID",
                principalTable: "University",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_Event_EventID",
                table: "Reservation",
                column: "EventID",
                principalTable: "Event",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_Student_ReservedByID",
                table: "Reservation",
                column: "ReservedByID",
                principalTable: "Student",
                principalColumn: "ID");
        }
    }
}
