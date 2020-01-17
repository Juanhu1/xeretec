using textprocess.Core.Models;

namespace textprocess.Core.Services.Communication
{
    public class CreateTextResponse : BaseResponse
    {
        public Text _text { get; private set; }

        public CreateTextResponse(bool success, string message, Text text) : base(success, message)
        {
            _text = text ;
        }
    }
}