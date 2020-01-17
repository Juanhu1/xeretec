using Microsoft.Extensions.Configuration;
using System;
using textprocess.Core.Models;
using textprocess.Services;
using Xunit;

namespace TextProcessTests
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
            const string TestFile = "test.txt";
            var builder = new ConfigurationBuilder().Build();
            TextService ts = new TextService(builder);
            using (var stream = System.IO.File.OpenRead(TestFile))
            {
                ts.ReadFullStream(stream);
                Text output = ts.Process();
                Assert.Equal(4, output.AvarageWordLength );
                Assert.Equal(38, output.TotalNumberOfChars );
                Assert.Equal(8, output.TotalNumberOfWords );
            }
        }
    }
}
