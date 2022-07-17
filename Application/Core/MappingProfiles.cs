using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
  public class MappingProfiles : Profile
  {
    public MappingProfiles()
    {
      CreateMap<Activity, Activity>();
      CreateMap<Activity, ActivityDto>()
        .ForMember((adto) => adto.HostUserName,
        (opt) => opt.MapFrom(
          (a) => a.Attendees.FirstOrDefault(
          (aa) => aa.IsHost)
          .AppUser
          .UserName
          )
        );
      CreateMap<ActivityAttendee, Profiles.Profile>()
        .ForMember((d) => d.DisplayName,
        (opt) => opt.MapFrom(
          (s) => s.AppUser.DisplayName
          )
        )
        .ForMember((d) => d.UserName,
        (opt) => opt.MapFrom(
          (s) => s.AppUser.UserName
          )
        )
        .ForMember((d) => d.Bio,
          (opt) => opt.MapFrom(
            (s) => s.AppUser.Bio
          )
        );
    }
  }
}