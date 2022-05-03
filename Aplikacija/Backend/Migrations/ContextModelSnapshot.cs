﻿// <auto-generated />
using System;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Backend.Migrations
{
    [DbContext(typeof(Context))]
    partial class ContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Backend.Models.Comment", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<int?>("AuthorID")
                        .HasColumnType("int");

                    b.Property<int?>("CommentedEventID")
                        .HasColumnType("int");

                    b.Property<int?>("CommentedPostID")
                        .HasColumnType("int");

                    b.Property<bool>("Edited")
                        .HasColumnType("bit");

                    b.Property<bool>("Pinned")
                        .HasColumnType("bit");

                    b.Property<DateTime>("PublicationTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(1024)
                        .HasColumnType("nvarchar(1024)");

                    b.Property<bool>("Verified")
                        .HasColumnType("bit");

                    b.HasKey("ID");

                    b.HasIndex("AuthorID");

                    b.HasIndex("CommentedEventID");

                    b.HasIndex("CommentedPostID");

                    b.ToTable("Comment");
                });

            modelBuilder.Entity("Backend.Models.Event", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<string>("Description")
                        .HasMaxLength(2048)
                        .HasColumnType("nvarchar(2048)");

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("ImagePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("LocationID")
                        .HasColumnType("int");

                    b.Property<string>("LocationName")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<int>("NumberOfTickets")
                        .HasColumnType("int");

                    b.Property<int?>("OrganiserID")
                        .HasColumnType("int");

                    b.Property<int?>("OrganisingParlamentID")
                        .HasColumnType("int");

                    b.Property<bool>("PaidEvent")
                        .HasColumnType("bit");

                    b.Property<bool>("Pinned")
                        .HasColumnType("bit");

                    b.Property<DateTime>("PublicationTime")
                        .HasColumnType("datetime2");

                    b.Property<float>("TicketPrice")
                        .HasColumnType("real");

                    b.Property<DateTime>("TimeOfEvent")
                        .HasColumnType("datetime2");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<bool>("Verified")
                        .HasColumnType("bit");

                    b.HasKey("ID");

                    b.HasIndex("LocationID");

                    b.HasIndex("OrganiserID");

                    b.HasIndex("OrganisingParlamentID");

                    b.ToTable("Event");
                });

            modelBuilder.Entity("Backend.Models.Grade", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<string>("CommentText")
                        .HasMaxLength(1024)
                        .HasColumnType("nvarchar(1024)");

                    b.Property<int?>("GradedByID")
                        .HasColumnType("int");

                    b.Property<int?>("GradedLocationID")
                        .HasColumnType("int");

                    b.Property<DateTime>("PublicationTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("Value")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("GradedByID");

                    b.HasIndex("GradedLocationID");

                    b.ToTable("Grade");
                });

            modelBuilder.Entity("Backend.Models.Location", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(1024)
                        .HasColumnType("nvarchar(1024)");

                    b.Property<int?>("AuthorID")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(2048)
                        .HasColumnType("nvarchar(2048)");

                    b.Property<string>("ImagePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Latitude")
                        .HasColumnType("real");

                    b.Property<float>("Longitude")
                        .HasColumnType("real");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("PublicationTime")
                        .HasColumnType("datetime2");

                    b.Property<int?>("StudentID")
                        .HasColumnType("int");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.Property<int?>("UniversityID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("AuthorID");

                    b.HasIndex("StudentID");

                    b.HasIndex("UniversityID");

                    b.ToTable("Location");
                });

            modelBuilder.Entity("Backend.Models.Parlament", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<string>("FacultyName")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("nvarchar(32)");

                    b.Property<int?>("UniversityID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("UniversityID");

                    b.ToTable("Parlament");
                });

            modelBuilder.Entity("Backend.Models.Post", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<int?>("AuthorID")
                        .HasColumnType("int");

                    b.Property<bool>("Edited")
                        .HasColumnType("bit");

                    b.Property<bool>("Pinned")
                        .HasColumnType("bit");

                    b.Property<DateTime>("PublicationTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(2048)
                        .HasColumnType("nvarchar(2048)");

                    b.Property<bool>("Verified")
                        .HasColumnType("bit");

                    b.HasKey("ID");

                    b.HasIndex("AuthorID");

                    b.ToTable("Post");
                });

            modelBuilder.Entity("Backend.Models.Reservation", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<int?>("EventID")
                        .HasColumnType("int");

                    b.Property<int>("NumberOfTickets")
                        .HasColumnType("int");

                    b.Property<int?>("ReservedByID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("EventID");

                    b.HasIndex("ReservedByID");

                    b.ToTable("Reservation");
                });

            modelBuilder.Entity("Backend.Models.Student", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("nvarchar(64)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("nvarchar(32)");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasMaxLength(1)
                        .HasColumnType("nvarchar(1)");

                    b.Property<string>("ImagePath")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<bool>("IsExchange")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("nvarchar(32)");

                    b.Property<int?>("ParlamentID")
                        .HasColumnType("int");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<int?>("UniversityID")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("nvarchar(32)");

                    b.HasKey("ID");

                    b.HasIndex("ParlamentID");

                    b.HasIndex("UniversityID");

                    b.ToTable("Student");
                });

            modelBuilder.Entity("Backend.Models.University", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<string>("City")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("nvarchar(32)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("nvarchar(32)");

                    b.HasKey("ID");

                    b.ToTable("University");
                });

            modelBuilder.Entity("CommentStudent", b =>
                {
                    b.Property<int>("LikedByID")
                        .HasColumnType("int");

                    b.Property<int>("LikedCommentsID")
                        .HasColumnType("int");

                    b.HasKey("LikedByID", "LikedCommentsID");

                    b.HasIndex("LikedCommentsID");

                    b.ToTable("CommentStudent");
                });

            modelBuilder.Entity("EventStudent", b =>
                {
                    b.Property<int>("LikedByID")
                        .HasColumnType("int");

                    b.Property<int>("LikedEventsID")
                        .HasColumnType("int");

                    b.HasKey("LikedByID", "LikedEventsID");

                    b.HasIndex("LikedEventsID");

                    b.ToTable("EventStudent");
                });

            modelBuilder.Entity("PostStudent", b =>
                {
                    b.Property<int>("LikedByID")
                        .HasColumnType("int");

                    b.Property<int>("LikedPostsID")
                        .HasColumnType("int");

                    b.HasKey("LikedByID", "LikedPostsID");

                    b.HasIndex("LikedPostsID");

                    b.ToTable("PostStudent");
                });

            modelBuilder.Entity("Backend.Models.Comment", b =>
                {
                    b.HasOne("Backend.Models.Student", "Author")
                        .WithMany("PublishedComments")
                        .HasForeignKey("AuthorID");

                    b.HasOne("Backend.Models.Event", "CommentedEvent")
                        .WithMany("Comments")
                        .HasForeignKey("CommentedEventID");

                    b.HasOne("Backend.Models.Post", "CommentedPost")
                        .WithMany("Comments")
                        .HasForeignKey("CommentedPostID");

                    b.Navigation("Author");

                    b.Navigation("CommentedEvent");

                    b.Navigation("CommentedPost");
                });

            modelBuilder.Entity("Backend.Models.Event", b =>
                {
                    b.HasOne("Backend.Models.Location", "Location")
                        .WithMany("Events")
                        .HasForeignKey("LocationID");

                    b.HasOne("Backend.Models.Student", "Organiser")
                        .WithMany("PublishedEvents")
                        .HasForeignKey("OrganiserID");

                    b.HasOne("Backend.Models.Parlament", "OrganisingParlament")
                        .WithMany("Events")
                        .HasForeignKey("OrganisingParlamentID");

                    b.Navigation("Location");

                    b.Navigation("Organiser");

                    b.Navigation("OrganisingParlament");
                });

            modelBuilder.Entity("Backend.Models.Grade", b =>
                {
                    b.HasOne("Backend.Models.Student", "GradedBy")
                        .WithMany("Grades")
                        .HasForeignKey("GradedByID");

                    b.HasOne("Backend.Models.Location", "GradedLocation")
                        .WithMany("Grades")
                        .HasForeignKey("GradedLocationID");

                    b.Navigation("GradedBy");

                    b.Navigation("GradedLocation");
                });

            modelBuilder.Entity("Backend.Models.Location", b =>
                {
                    b.HasOne("Backend.Models.Student", "Author")
                        .WithMany("Locations")
                        .HasForeignKey("AuthorID");

                    b.HasOne("Backend.Models.Student", null)
                        .WithMany("LikedLocations")
                        .HasForeignKey("StudentID");

                    b.HasOne("Backend.Models.University", "University")
                        .WithMany("Locations")
                        .HasForeignKey("UniversityID");

                    b.Navigation("Author");

                    b.Navigation("University");
                });

            modelBuilder.Entity("Backend.Models.Parlament", b =>
                {
                    b.HasOne("Backend.Models.University", "University")
                        .WithMany("Parlaments")
                        .HasForeignKey("UniversityID");

                    b.Navigation("University");
                });

            modelBuilder.Entity("Backend.Models.Post", b =>
                {
                    b.HasOne("Backend.Models.Student", "Author")
                        .WithMany("PublishedPosts")
                        .HasForeignKey("AuthorID");

                    b.Navigation("Author");
                });

            modelBuilder.Entity("Backend.Models.Reservation", b =>
                {
                    b.HasOne("Backend.Models.Event", "Event")
                        .WithMany("Reservations")
                        .HasForeignKey("EventID");

                    b.HasOne("Backend.Models.Student", "ReservedBy")
                        .WithMany("Reservations")
                        .HasForeignKey("ReservedByID");

                    b.Navigation("Event");

                    b.Navigation("ReservedBy");
                });

            modelBuilder.Entity("Backend.Models.Student", b =>
                {
                    b.HasOne("Backend.Models.Parlament", "Parlament")
                        .WithMany("Members")
                        .HasForeignKey("ParlamentID");

                    b.HasOne("Backend.Models.University", "University")
                        .WithMany("Users")
                        .HasForeignKey("UniversityID");

                    b.Navigation("Parlament");

                    b.Navigation("University");
                });

            modelBuilder.Entity("CommentStudent", b =>
                {
                    b.HasOne("Backend.Models.Student", null)
                        .WithMany()
                        .HasForeignKey("LikedByID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Models.Comment", null)
                        .WithMany()
                        .HasForeignKey("LikedCommentsID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("EventStudent", b =>
                {
                    b.HasOne("Backend.Models.Student", null)
                        .WithMany()
                        .HasForeignKey("LikedByID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Models.Event", null)
                        .WithMany()
                        .HasForeignKey("LikedEventsID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PostStudent", b =>
                {
                    b.HasOne("Backend.Models.Student", null)
                        .WithMany()
                        .HasForeignKey("LikedByID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Models.Post", null)
                        .WithMany()
                        .HasForeignKey("LikedPostsID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Backend.Models.Event", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("Reservations");
                });

            modelBuilder.Entity("Backend.Models.Location", b =>
                {
                    b.Navigation("Events");

                    b.Navigation("Grades");
                });

            modelBuilder.Entity("Backend.Models.Parlament", b =>
                {
                    b.Navigation("Events");

                    b.Navigation("Members");
                });

            modelBuilder.Entity("Backend.Models.Post", b =>
                {
                    b.Navigation("Comments");
                });

            modelBuilder.Entity("Backend.Models.Student", b =>
                {
                    b.Navigation("Grades");

                    b.Navigation("LikedLocations");

                    b.Navigation("Locations");

                    b.Navigation("PublishedComments");

                    b.Navigation("PublishedEvents");

                    b.Navigation("PublishedPosts");

                    b.Navigation("Reservations");
                });

            modelBuilder.Entity("Backend.Models.University", b =>
                {
                    b.Navigation("Locations");

                    b.Navigation("Parlaments");

                    b.Navigation("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
