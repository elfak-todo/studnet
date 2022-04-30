using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "University",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    City = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_University", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Parlament",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    FacultyName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    UniversityID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parlament", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Parlament_University_UniversityID",
                        column: x => x.UniversityID,
                        principalTable: "University",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    ImagePath = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    IsExchange = table.Column<bool>(type: "bit", nullable: false),
                    UniversityID = table.Column<int>(type: "int", nullable: true),
                    ParlamentID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.ID);
                    table.ForeignKey(
                        name: "FK_User_Parlament_ParlamentID",
                        column: x => x.ParlamentID,
                        principalTable: "Parlament",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_User_University_UniversityID",
                        column: x => x.UniversityID,
                        principalTable: "University",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Location",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Latitude = table.Column<float>(type: "real", nullable: false),
                    Longitude = table.Column<float>(type: "real", nullable: false),
                    PublicationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ImagePath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AuthorID = table.Column<int>(type: "int", nullable: true),
                    StudentID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Location", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Location_User_AuthorID",
                        column: x => x.AuthorID,
                        principalTable: "User",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Location_User_StudentID",
                        column: x => x.StudentID,
                        principalTable: "User",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Post",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Verified = table.Column<bool>(type: "bit", nullable: false),
                    Pinned = table.Column<bool>(type: "bit", nullable: false),
                    PublicationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: false),
                    AuthorID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Post", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Post_User_AuthorID",
                        column: x => x.AuthorID,
                        principalTable: "User",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Event",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Verified = table.Column<bool>(type: "bit", nullable: false),
                    Pinned = table.Column<bool>(type: "bit", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: true),
                    PublicationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TimeOfEvent = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LocationID = table.Column<int>(type: "int", nullable: true),
                    LocationName = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                    ImagePath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PaidEvent = table.Column<bool>(type: "bit", nullable: false),
                    NumberOfTickets = table.Column<int>(type: "int", nullable: false),
                    TicketPrice = table.Column<float>(type: "real", nullable: false),
                    OrganiserID = table.Column<int>(type: "int", nullable: true),
                    OrganisingParlamentID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Event", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Event_Location_LocationID",
                        column: x => x.LocationID,
                        principalTable: "Location",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Event_Parlament_OrganisingParlamentID",
                        column: x => x.OrganisingParlamentID,
                        principalTable: "Parlament",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Event_User_OrganiserID",
                        column: x => x.OrganiserID,
                        principalTable: "User",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Grade",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<int>(type: "int", nullable: false),
                    CommentText = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: true),
                    PublicationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    GradedByID = table.Column<int>(type: "int", nullable: true),
                    GradedLocationID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grade", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Grade_Location_GradedLocationID",
                        column: x => x.GradedLocationID,
                        principalTable: "Location",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Grade_User_GradedByID",
                        column: x => x.GradedByID,
                        principalTable: "User",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "PostStudent",
                columns: table => new
                {
                    LikedByID = table.Column<int>(type: "int", nullable: false),
                    LikedPostsID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostStudent", x => new { x.LikedByID, x.LikedPostsID });
                    table.ForeignKey(
                        name: "FK_PostStudent_Post_LikedPostsID",
                        column: x => x.LikedPostsID,
                        principalTable: "Post",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PostStudent_User_LikedByID",
                        column: x => x.LikedByID,
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Comment",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Text = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: false),
                    Verified = table.Column<bool>(type: "bit", nullable: false),
                    Pinned = table.Column<bool>(type: "bit", nullable: false),
                    PublicationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AuthorID = table.Column<int>(type: "int", nullable: true),
                    CommentedPostID = table.Column<int>(type: "int", nullable: true),
                    CommentedEventID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comment", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Comment_Event_CommentedEventID",
                        column: x => x.CommentedEventID,
                        principalTable: "Event",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Comment_Post_CommentedPostID",
                        column: x => x.CommentedPostID,
                        principalTable: "Post",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Comment_User_AuthorID",
                        column: x => x.AuthorID,
                        principalTable: "User",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "EventStudent",
                columns: table => new
                {
                    LikedByID = table.Column<int>(type: "int", nullable: false),
                    LikedEventsID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventStudent", x => new { x.LikedByID, x.LikedEventsID });
                    table.ForeignKey(
                        name: "FK_EventStudent_Event_LikedEventsID",
                        column: x => x.LikedEventsID,
                        principalTable: "Event",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventStudent_User_LikedByID",
                        column: x => x.LikedByID,
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reservation",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NumberOfTickets = table.Column<int>(type: "int", nullable: false),
                    ReservedByID = table.Column<int>(type: "int", nullable: true),
                    EventID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservation", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Reservation_Event_EventID",
                        column: x => x.EventID,
                        principalTable: "Event",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Reservation_User_ReservedByID",
                        column: x => x.ReservedByID,
                        principalTable: "User",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "CommentStudent",
                columns: table => new
                {
                    LikedByID = table.Column<int>(type: "int", nullable: false),
                    LikedCommentsID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommentStudent", x => new { x.LikedByID, x.LikedCommentsID });
                    table.ForeignKey(
                        name: "FK_CommentStudent_Comment_LikedCommentsID",
                        column: x => x.LikedCommentsID,
                        principalTable: "Comment",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CommentStudent_User_LikedByID",
                        column: x => x.LikedByID,
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Comment_AuthorID",
                table: "Comment",
                column: "AuthorID");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_CommentedEventID",
                table: "Comment",
                column: "CommentedEventID");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_CommentedPostID",
                table: "Comment",
                column: "CommentedPostID");

            migrationBuilder.CreateIndex(
                name: "IX_CommentStudent_LikedCommentsID",
                table: "CommentStudent",
                column: "LikedCommentsID");

            migrationBuilder.CreateIndex(
                name: "IX_Event_LocationID",
                table: "Event",
                column: "LocationID");

            migrationBuilder.CreateIndex(
                name: "IX_Event_OrganiserID",
                table: "Event",
                column: "OrganiserID");

            migrationBuilder.CreateIndex(
                name: "IX_Event_OrganisingParlamentID",
                table: "Event",
                column: "OrganisingParlamentID");

            migrationBuilder.CreateIndex(
                name: "IX_EventStudent_LikedEventsID",
                table: "EventStudent",
                column: "LikedEventsID");

            migrationBuilder.CreateIndex(
                name: "IX_Grade_GradedByID",
                table: "Grade",
                column: "GradedByID");

            migrationBuilder.CreateIndex(
                name: "IX_Grade_GradedLocationID",
                table: "Grade",
                column: "GradedLocationID");

            migrationBuilder.CreateIndex(
                name: "IX_Location_AuthorID",
                table: "Location",
                column: "AuthorID");

            migrationBuilder.CreateIndex(
                name: "IX_Location_StudentID",
                table: "Location",
                column: "StudentID");

            migrationBuilder.CreateIndex(
                name: "IX_Parlament_UniversityID",
                table: "Parlament",
                column: "UniversityID");

            migrationBuilder.CreateIndex(
                name: "IX_Post_AuthorID",
                table: "Post",
                column: "AuthorID");

            migrationBuilder.CreateIndex(
                name: "IX_PostStudent_LikedPostsID",
                table: "PostStudent",
                column: "LikedPostsID");

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_EventID",
                table: "Reservation",
                column: "EventID");

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_ReservedByID",
                table: "Reservation",
                column: "ReservedByID");

            migrationBuilder.CreateIndex(
                name: "IX_User_ParlamentID",
                table: "User",
                column: "ParlamentID");

            migrationBuilder.CreateIndex(
                name: "IX_User_UniversityID",
                table: "User",
                column: "UniversityID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CommentStudent");

            migrationBuilder.DropTable(
                name: "EventStudent");

            migrationBuilder.DropTable(
                name: "Grade");

            migrationBuilder.DropTable(
                name: "PostStudent");

            migrationBuilder.DropTable(
                name: "Reservation");

            migrationBuilder.DropTable(
                name: "Comment");

            migrationBuilder.DropTable(
                name: "Event");

            migrationBuilder.DropTable(
                name: "Post");

            migrationBuilder.DropTable(
                name: "Location");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Parlament");

            migrationBuilder.DropTable(
                name: "University");
        }
    }
}
