using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    }
}