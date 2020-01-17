using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using textprocess.Core.Models;
using textprocess.Core.Services;

namespace textprocess.Services
{
    public class TextService : ITextService
    {
        private byte[] buffer;
        private bool WhiteSpaceIncluded;
        private int LeastCharNum, MostWordNum;
        private IConfiguration config { get; }
        public TextService(IConfiguration configuration)
        {
            config = configuration;
            WhiteSpaceIncluded = false;
            LeastCharNum = 10;
            MostWordNum = 10;
            try
            {
                WhiteSpaceIncluded = Convert.ToBoolean(config["ProcessOptions:WhiteSpaceIncluded"]);
                LeastCharNum = Convert.ToInt32(config["ProcessOptions:LeastFrequentCharsNum"]);
                MostWordNum = Convert.ToInt32(config["ProcessOptions:MostFrequentWordsNum"]);
            } catch (FormatException ex)
            {
                Console.WriteLine("Format exception in TextService. Probably invalid entry in 'appsettings.json'");
            } catch (OverflowException ex)
            {
                Console.WriteLine("Overflow exception in TextService. Probably invalid number in 'appsettings.json'");
            }
        }
        public void ReadFullStream(FileStream stream)
        {
            buffer = new byte[stream.Length];
            int numBytesToRead = (int)stream.Length;
            int numBytesRead = 0;
            while (numBytesToRead > 0)
            {
                int n = stream.Read(buffer, numBytesRead, numBytesToRead);
                if (n == 0)
                    break;
                numBytesRead += n;
                numBytesToRead -= n;
            }

        }
        public Text Process()
        {
            Dictionary<char, int>   charsMap = new Dictionary<char,int>();
            Dictionary<string, int> wordsMap = new Dictionary<string, int>();
            Text output = new Text();
            int TotalWordLength = 0;
            output.TotalNumberOfChars = 0;
            if (buffer != null)
            {
                StringBuilder current = new StringBuilder("");
                foreach (byte b in buffer)
                {
                    char c = Convert.ToChar(b);
                    if (String.IsNullOrWhiteSpace(c.ToString())) {
                        if (WhiteSpaceIncluded)
                        {
                            output.TotalNumberOfChars++;
                        }
                        if (current.Length > 0)
                        {
                            output.TotalNumberOfWords++;
                            TotalWordLength += current.Length;
                            int WordCount = 0;
                            wordsMap.TryGetValue(current.ToString(), out WordCount);
                            wordsMap[current.ToString()] = ++WordCount;
                            current.Clear(); 
                        }

                    } else
                    {
                        output.TotalNumberOfChars++;
                        current.Append(c);
                    }
                    int charCount = 0;
                    charsMap.TryGetValue(c, out charCount);
                    charsMap[c] = ++charCount;
                }
                if (current.Length > 0)
                {
                    output.TotalNumberOfWords++;
                    TotalWordLength += current.Length;
                    int WordCount = 0;
                    wordsMap.TryGetValue(current.ToString(), out WordCount);
                    wordsMap[current.ToString()] = ++WordCount;
                    current.Clear();
                }
            }
            output.LeastFrequentChars = (from entry in charsMap orderby entry.Value ascending select entry).Take(LeastCharNum) ;
            output.MostFrequentWords =  (from entry in wordsMap orderby entry.Value descending select entry).Take(MostWordNum);
            output.AvarageWordLength = output.TotalNumberOfWords > 0 ? TotalWordLength / output.TotalNumberOfWords:0 ;
            return output;
        }

    }
}