﻿// <auto-generated />
using System;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Backend.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20220603105959_V13")]
    partial class V13
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

                    b.Property<bool>("Anonymous")
                        .HasColumnType("bit");

                    b.Property<int?>("AuthorId")
                        .HasColumnType("int");

                    b.Property<int?>("CommentedEventId")
                        .HasColumnType("int");

                    b.Property<int?>("CommentedPostId")
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

                    b.HasIndex("AuthorId");

                    b.HasIndex("CommentedEventId");

                    b.HasIndex("CommentedPostId");

                    b.ToTable("Comment");
                });

            modelBuilder.Entity("Backend.Models.Event", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(2048)
                        .HasColumnType("nvarchar(2048)");

                    b.Property<DateTime?>("EndTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("ImagePath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("LocationId")
                        .HasColumnType("int");

                    b.Property<string>("LocationName")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<int>("NumberOfTickets")
                        .HasColumnType("int");

                    b.Property<int?>("OrganiserId")
                        .HasColumnType("int");

                    b.Property<int?>("OrganisingParlamentId")
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

                    b.Property<int?>("UniversityId")
                        .HasColumnType("int");

                    b.Property<bool>("Verified")
                        .HasColumnType("bit");

                    b.HasKey("ID");

                    b.HasIndex("LocationId");

                    b.HasIndex("OrganiserId");

                    b.HasIndex("OrganisingParlamentId");

                    b.HasIndex("UniversityId");

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

                    b.Property<int?>("GradedById")
                        .HasColumnType("int");

                    b.Property<int?>("GradedLocationId")
                        .HasColumnType("int");

                    b.Property<DateTime>("PublicationTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("Value")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("GradedById");

                    b.HasIndex("GradedLocationId");

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

                    b.Property<int?>("AuthorId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(2048)
                        .HasColumnType("nvarchar(2048)");

                    b.Property<string>("GalleryString")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

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

                    b.Property<int?>("UniversityId")
                        .HasColumnType("int");

                    b.Property<bool>("Verified")
                        .HasColumnType("bit");

                    b.Property<string>("Webpage")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("AuthorId");

                    b.HasIndex("StudentID");

                    b.HasIndex("UniversityId");

                    b.ToTable("Location");
                });

            modelBuilder.Entity("Backend.Models.Parlament", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<int?>("FacultyId")
                        .HasColumnType("int");

                    b.Property<string>("FacultyName")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("nvarchar(32)");

                    b.Property<int?>("UniversityId")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("FacultyId")
                        .IsUnique()
                        .HasFilter("[FacultyId] IS NOT NULL");

                    b.HasIndex("UniversityId");

                    b.ToTable("Parlament");
                });

            modelBuilder.Entity("Backend.Models.Post", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<bool>("Anonymous")
                        .HasColumnType("bit");

                    b.Property<int?>("AuthorId")
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

                    b.Property<int?>("UniversityId")
                        .HasColumnType("int");

                    b.Property<bool>("Verified")
                        .HasColumnType("bit");

                    b.HasKey("ID");

                    b.HasIndex("AuthorId");

                    b.HasIndex("UniversityId");

                    b.ToTable("Post");
                });

            modelBuilder.Entity("Backend.Models.Reservation", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<int?>("EventId")
                        .HasColumnType("int");

                    b.Property<int>("NumberOfTickets")
                        .HasColumnType("int");

                    b.Property<int?>("ReservedById")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("EventId");

                    b.HasIndex("ReservedById");

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
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<bool>("IsExchange")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("nvarchar(32)");

                    b.Property<int?>("ParlamentId")
                        .HasColumnType("int");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<int?>("UniversityId")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("nvarchar(32)");

                    b.HasKey("ID");

                    b.HasAlternateKey("Email");

                    b.HasIndex("ParlamentId");

                    b.HasIndex("UniversityId");

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

                    b.Property<float>("Latitude")
                        .HasColumnType("real");

                    b.Property<float>("Longitude")
                        .HasColumnType("real");

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
                        .HasForeignKey("AuthorId");

                    b.HasOne("Backend.Models.Event", "CommentedEvent")
                        .WithMany("Comments")
                        .HasForeignKey("CommentedEventId");

                    b.HasOne("Backend.Models.Post", "CommentedPost")
                        .WithMany("Comments")
                        .HasForeignKey("CommentedPostId");

                    b.Navigation("Author");

                    b.Navigation("CommentedEvent");

                    b.Navigation("CommentedPost");
                });

            modelBuilder.Entity("Backend.Models.Event", b =>
                {
                    b.HasOne("Backend.Models.Location", "Location")
                        .WithMany("Events")
                        .HasForeignKey("LocationId");

                    b.HasOne("Backend.Models.Student", "Organiser")
                        .WithMany("PublishedEvents")
                        .HasForeignKey("OrganiserId");

                    b.HasOne("Backend.Models.Parlament", "OrganisingParlament")
                        .WithMany("Events")
                        .HasForeignKey("OrganisingParlamentId");

                    b.HasOne("Backend.Models.University", "University")
                        .WithMany("Events")
                        .HasForeignKey("UniversityId");

                    b.Navigation("Location");

                    b.Navigation("Organiser");

                    b.Navigation("OrganisingParlament");

                    b.Navigation("University");
                });

            modelBuilder.Entity("Backend.Models.Grade", b =>
                {
                    b.HasOne("Backend.Models.Student", "GradedBy")
                        .WithMany("Grades")
                        .HasForeignKey("GradedById");

                    b.HasOne("Backend.Models.Location", "GradedLocation")
                        .WithMany("Grades")
                        .HasForeignKey("GradedLocationId");

                    b.Navigation("GradedBy");

                    b.Navigation("GradedLocation");
                });

            modelBuilder.Entity("Backend.Models.Location", b =>
                {
                    b.HasOne("Backend.Models.Student", "Author")
                        .WithMany("Locations")
                        .HasForeignKey("AuthorId");

                    b.HasOne("Backend.Models.Student", null)
                        .WithMany("LikedLocations")
                        .HasForeignKey("StudentID");

                    b.HasOne("Backend.Models.University", "University")
                        .WithMany("Locations")
                        .HasForeignKey("UniversityId");

                    b.Navigation("Author");

                    b.Navigation("University");
                });

            modelBuilder.Entity("Backend.Models.Parlament", b =>
                {
                    b.HasOne("Backend.Models.Location", "Faculty")
                        .WithOne("Parlament")
                        .HasForeignKey("Backend.Models.Parlament", "FacultyId");

                    b.HasOne("Backend.Models.University", "University")
                        .WithMany("Parlaments")
                        .HasForeignKey("UniversityId");

                    b.Navigation("Faculty");

                    b.Navigation("University");
                });

            modelBuilder.Entity("Backend.Models.Post", b =>
                {
                    b.HasOne("Backend.Models.Student", "Author")
                        .WithMany("PublishedPosts")
                        .HasForeignKey("AuthorId");

                    b.HasOne("Backend.Models.University", "University")
                        .WithMany("Posts")
                        .HasForeignKey("UniversityId");

                    b.Navigation("Author");

                    b.Navigation("University");
                });

            modelBuilder.Entity("Backend.Models.Reservation", b =>
                {
                    b.HasOne("Backend.Models.Event", "Event")
                        .WithMany("Reservations")
                        .HasForeignKey("EventId");

                    b.HasOne("Backend.Models.Student", "ReservedBy")
                        .WithMany("Reservations")
                        .HasForeignKey("ReservedById");

                    b.Navigation("Event");

                    b.Navigation("ReservedBy");
                });

            modelBuilder.Entity("Backend.Models.Student", b =>
                {
                    b.HasOne("Backend.Models.Parlament", "Parlament")
                        .WithMany("Members")
                        .HasForeignKey("ParlamentId");

                    b.HasOne("Backend.Models.University", "University")
                        .WithMany("Users")
                        .HasForeignKey("UniversityId");

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

                    b.Navigation("Parlament");
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
                    b.Navigation("Events");

                    b.Navigation("Locations");

                    b.Navigation("Parlaments");

                    b.Navigation("Posts");

                    b.Navigation("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
