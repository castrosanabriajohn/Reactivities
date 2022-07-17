using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
  // Is going to be used as a service that allows injecting the data context into other classes in the application
  public class DataContext : IdentityDbContext<AppUser>
  {
    public DataContext(DbContextOptions options) : base(options)
    {

    }
    // Reflects the DB table, will have columns of the activity class properties
    public DbSet<Activity> Activities { get; set; }
    public DbSet<ActivityAttendee> ActivityAttendees { get; set; }
    protected override void OnModelCreating(ModelBuilder builder) // model builder class is passed to base.onModelCreating to have access to the entity configuration
    {
      base.OnModelCreating(builder);
      builder.Entity<ActivityAttendee>((x) => x.HasKey((aa) => new { aa.AppUserId, aa.ActivityId })); // builds primary key in the database table
      builder.Entity<ActivityAttendee>()
      .HasOne((u) => u.AppUser)
      .WithMany((a) => a.Activities)
      .HasForeignKey((aa) => aa.AppUserId);
      builder.Entity<ActivityAttendee>()
      .HasOne((u) => u.Activity)
      .WithMany((a) => a.Attendees)
      .HasForeignKey((aa) => aa.ActivityId);
    }
  }
}