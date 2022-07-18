using Domain;
using Persistence;
using Microsoft.AspNetCore.Identity;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authorization;

namespace API.Extensions
{
  public static class IdentityServiceExtensions
  {
    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
    {
      services.AddIdentityCore<AppUser>((opt) =>
      {
        opt.Password.RequireNonAlphanumeric = false;
      })
      .AddEntityFrameworkStores<DataContext>()
      .AddSignInManager<SignInManager<AppUser>>();
      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
      .AddJwtBearer((opt) =>
      {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuerSigningKey = true, // API will validate if the key is valid
          IssuerSigningKey = key,
          ValidateIssuer = false,
          ValidateAudience = false,
        };
      });
      services.AddAuthorization((opt) =>
        {
          opt.AddPolicy("IsHostPolicy", (policy) =>
          policy.Requirements.Add(new IsHostRequirement())
        );
        }
      );
      services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>(); // with this service in place controller attributes may be used on edit endpoint
      services.AddScoped<TokenService>(); // token service is now available when injected into the account controller scoped to the lifetime of the http request
      return services;
    }
  }
}