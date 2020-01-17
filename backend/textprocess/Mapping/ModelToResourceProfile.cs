using textprocess.Controllers.Resources;
using System.Linq;
using AutoMapper;
using textprocess.Core.Models;

namespace textprocess.Mapping
{
    public class ModelToResourceProfile : Profile
    {
        public ModelToResourceProfile()
        {
            CreateMap<Text, TextResource>();    
        }
    }
}