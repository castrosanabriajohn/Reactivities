using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
  public class Seed
  {
    public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
    {
      if (!userManager.Users.Any() && !context.Activities.Any())
      {
        var users = new List<AppUser>
        {
            new AppUser{DisplayName = "John", UserName = "jcastro", Email = "jcastro@crnova.com"},
            new AppUser{DisplayName = "Sergio", UserName = "szuniga", Email = "szuniga@crnova.com"},
            new AppUser{DisplayName = "Nicole", UserName = "ngarcia", Email = "ngarcia@crnova.com"},
            new AppUser{DisplayName = "Bob", UserName = "bob", Email = "bob@test.com"},
            new AppUser{DisplayName = "Jane", UserName = "jane", Email = "jane@test.com"},
            new AppUser{DisplayName = "Tom", UserName = "tom", Email = "tom@test.com"},
        };
        foreach (var user in users)
        {
          await userManager.CreateAsync(user, "Pa$$w0rd");
        }
        var activities = new List<Activity>
        {
            new Activity
            {
                Title = "Sesión de Yoga",
                Date = DateTime.Now.AddMonths(-2),
                Description = "El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general. El yoga se desarrolló como una práctica espiritual hace miles de años.",
                Category = "yoga",
                City = "Curridabat",
                Venue = "Casa de Juan",
                Attendees = new List<ActivityAttendee>
                {
                    new ActivityAttendee
                    {
                        AppUser = users[0],
                        IsHost = true
                    }
                }
            },
            new Activity
            {
                Title = "Sesión Informativa de Salud Ocupacional",
                Date = DateTime.Now.AddMonths(-1),
                Description = "Reunión de duración de 1 hora con la expositora Karla Zúñiga, tema: la promoción y mantenimiento del más alto grado posible de bienestar físico, mental y social de los trabajadores.",
                Category = "speech",
                City = "Curridabat",
                Venue = "Oficina ·3",
                Attendees = new List<ActivityAttendee>
                {
                    new ActivityAttendee
                    {
                        AppUser = users[0],
                        IsHost = false
                    }
                }
            },
            new Activity
            {
                Title = "Fiesta del día del Trabajador",
                Date = DateTime.Now.AddMonths(1),
                Description = "Es una fiesta del movimiento obrero mundial en conmemoración de sus luchas sociales y laborales. El Primero de Mayo, como también se lo denomina, es considerado como un día para exigir reivindicaciones laborales o realizar mejoras a las condiciones de los trabajadores.",
                Category = "party",
                City = "San José",
                Venue = "Casa de Gabriel",
                Attendees = new List<ActivityAttendee>
                {
                    new ActivityAttendee
                    {
                        AppUser = users[1],
                        IsHost = true,
                    }
                }
            },
            new Activity
            {
                Title = "Reunión programada entre los encargados de la cadena de suministros",
                Date = DateTime.Now.AddMonths(2),
                Description = "Reunión para determinar el nivel de abastecimiento de suministros.",
                Category = "speech",
                City = "Curridabat",
                Venue = "Oficina 34",
                Attendees = new List<ActivityAttendee>
                {
                    new ActivityAttendee
                    {
                        AppUser = users[1],
                        IsHost = false,
                    }
                }
            },
            new Activity
            {
                Title = "Sesión de Planeación Estratégica",
                Date = DateTime.Now.AddMonths(3),
                Description = "Reunión para determinar aspectos de la planeación interna y externa.",
                Category = "speech",
                City = "San José",
                Venue = "Sabana",
                Attendees = new List<ActivityAttendee>
                {
                    new ActivityAttendee
                    {
                        AppUser = users[2],
                        IsHost = false,
                    }
                }
            },
            new Activity
            {
                Title = "Sesión de Intercambio de Conocimientos",
                Date = DateTime.Now.AddMonths(4),
                Description = "Reunión para compartir entre colaboradores e intercambiar conocimientos",
                Category = "meeting",
                City = "Curridabat",
                Venue = "Casa de Steven",
                Attendees = new List<ActivityAttendee>
                {
                    new ActivityAttendee
                    {
                        AppUser = users[2],
                        IsHost = true,
                    }
                }
            },
            new Activity
            {
                Title = "Reunión Directores de Proyectos",
                Date = DateTime.Now.AddMonths(5),
                Description = "Reunión de planeción y seguimiento de proyectos",
                Category = "meeting",
                City = "Cartago",
                Venue = "Casa de Emilio",
                Attendees = new List<ActivityAttendee>
                {
                    new ActivityAttendee
                    {
                        AppUser = users[3],
                        IsHost = false,
                    }
                }
            },
            new Activity
            {
                Title = "Charla Informativa de Compromiso con los Empleados",
                Date = DateTime.Now.AddMonths(6),
                Description = "Activity 6 months in future",
                Category = "speech",
                City = "Escazu",
                Venue = "Hotel Real Intercontinental",
                Attendees = new List<ActivityAttendee>
                {
                    new ActivityAttendee
                    {
                        AppUser = users[0],
                        IsHost = true
                    }
                }
            },
            new Activity
            {
                Title = "Noche de Comida",
                Date = DateTime.Now.AddMonths(7),
                Description = "Salida a comer entre compañeros",
                Category = "food",
                City = "San Pedro",
                Venue = "Restaurante Applebees",
                Attendees = new List<ActivityAttendee>
                {
                    new ActivityAttendee
                    {
                        AppUser = users[0],
                        IsHost = false
                    }
                }
            },
            new Activity
            {
                Title = "Fiesta de Navidad",
                Date = DateTime.Now.AddMonths(8),
                Description = "Festejo anual de navidad organizado por la empresa",
                Category = "christmas",
                City = "Curridabat",
                Venue = "Oficina Principal",
                Attendees = new List<ActivityAttendee>
                {
                    new ActivityAttendee
                    {
                        AppUser = users[2],
                        IsHost = true
                    }
                }
            }
        };
        // Add the range of activities asynchronously.
        await context.Activities.AddRangeAsync(activities);
        // Save the changes (execute query)
        await context.SaveChangesAsync();
      }
    }
  }
}
