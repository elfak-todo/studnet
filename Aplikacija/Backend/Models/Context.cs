using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    internal class Context : DbContext
    {
        public DbSet<Comment>? Comments { get; set; }
        public DbSet<Event>? Events { get; set; }
        public DbSet<Grade>? Grades { get; set; }
        public DbSet<Location>? Locations { get; set; }
        public DbSet<Parlament>? Parlaments { get; set; }
        public DbSet<Post>? Posts { get; set; }
        public DbSet<Reservation>? Reservations { get; set; }
        public DbSet<Student>? Students { get; set; }
        public DbSet<University>? Universities { get; set; }

        public Context(DbContextOptions<Context> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Comment>()
                                .HasMany<Student>(k => k.LikedBy)
                                .WithMany(l => l.LikedComments);

            modelBuilder.Entity<Comment>()
                                .HasOne<Student>(c => c.Author)
                                .WithMany(s => s.PublishedComments);

            modelBuilder.Entity<Event>()
                                .HasOne<Student>(e => e.Organiser)
                                .WithMany(s => s.PublishedEvents);

            modelBuilder.Entity<Event>()
                                .HasMany<Student>(e => e.LikedBy)
                                .WithMany(s => s.LikedEvents);

            modelBuilder.Entity<Post>()
                                .HasOne<Student>(p => p.Author)
                                .WithMany(s => s.PublishedPosts);

            modelBuilder.Entity<Post>()
                                .HasMany<Student>(p => p.LikedBy)
                                .WithMany(s => s.LikedPosts);

            modelBuilder.Entity<Location>()
                                .HasOne<Student>(l => l.Author)
                                .WithMany(s => s.Locations);

        }

    }
}