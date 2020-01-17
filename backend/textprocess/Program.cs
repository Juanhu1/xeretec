using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using textprocess.Services;
using System.Threading;

// limitations:
// Unicode not handled properly (using byte array)
// big files (>1 GB) may cause memory overflow because the whole file is read into the memory
// more unit tests and detailed exception handling is missing too
// It would be more beautiful to separate the process functions (counting, word counting and so on) but the speed of process would be (much?) lower / depend on file size
// so this solution is optimized for processing many smaller (<1gb) files. 

namespace textprocess
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = BuildWebHost(args);

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
            }
            host.Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>



            /*
             * The call to ".UseIISIntegration" is necessary to fix issue while running the API from ISS. See the following links for reference:
             * - https://github.com/aspnet/IISIntegration/issues/242
             * - https://stackoverflow.com/questions/50112665/newly-created-net-core-gives-http-400-using-windows-authentication
            */
            WebHost.CreateDefaultBuilder(args)
                   .UseIISIntegration()
                   .UseStartup<Startup>()                   
                   .Build();
    }
}