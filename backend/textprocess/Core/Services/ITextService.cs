using System.IO;
using System.Threading.Tasks;
using textprocess.Controllers.Resources;
using textprocess.Core.Models;
using textprocess.Core.Services.Communication;

namespace textprocess.Core.Services
{
    public interface ITextService
    {
        void ReadFullStream(FileStream stream);
        Text Process();
    }
}