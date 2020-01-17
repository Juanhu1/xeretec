using textprocess.Controllers.Resources;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace textprocess.Core.Models
{
    public class Text
    {
        private int _TotalNumberOfWords;
        private int _TotalNumberOfChars;
        private int _AvarageWordLength;
        private IEnumerable<KeyValuePair<string,int>> _MostFrequentWords;
        private IEnumerable<KeyValuePair<char, int>> _LeastFrequentChars;

        public int TotalNumberOfWords { get => _TotalNumberOfWords; set => _TotalNumberOfWords = value; }
        public int TotalNumberOfChars { get => _TotalNumberOfChars; set => _TotalNumberOfChars = value; }
        public int AvarageWordLength { get => _AvarageWordLength; set => _AvarageWordLength = value; }
        public IEnumerable<KeyValuePair<string, int>> MostFrequentWords { get => _MostFrequentWords; set => _MostFrequentWords = value; }
        public IEnumerable<KeyValuePair<char, int>> LeastFrequentChars { get => _LeastFrequentChars; set => _LeastFrequentChars = value; }
    }
}

