using System.Threading.Tasks;
using AutoMapper;
using textprocess.Controllers.Resources;
using textprocess.Core.Models;
using textprocess.Core.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.IO;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace textprocess.Controllers
{
    [Route("/api/[controller]")]
    public class TextController : Controller
    {
        private readonly IMapper _mapper;
        private readonly ITextService _textService;

        public TextController(ITextService textService, IMapper mapper)
        {
            _textService = textService;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("/api/textprocess")]
        public async Task<IActionResult> OnPostUploadAsync(IFormFile file)
        {
            Text output = new Text();
            string filePath = Path.GetTempFileName();
            using (var stream = System.IO.File.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }        
 
            using (var stream = System.IO.File.OpenRead(filePath))
            {
                _textService.ReadFullStream(stream);
                output = _textService.Process();
            }
            return Ok(output);
        }
    }
}