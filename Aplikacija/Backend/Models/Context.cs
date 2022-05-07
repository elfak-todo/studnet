using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class Context : DbContext
    {
        public DbSet<Comment> Comments => Set<Comment>();
        public DbSet<Event> Events => Set<Event>();
        public DbSet<Grade> Grades => Set<Grade>();
        public DbSet<Location> Locations => Set<Location>();
        public DbSet<Parlament> Parlaments => Set<Parlament>();
        public DbSet<Post> Posts => Set<Post>();
        public DbSet<Reservation> Reservations => Set<Reservation>();
        public DbSet<Student> Students => Set<Student>();
        public DbSet<University> Universities => Set<University>();

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