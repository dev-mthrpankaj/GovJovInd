(function () {
  "use strict";

  const virama = "\u094d";
  const zwj = "\u200d";
  const nukta = "\u093c";

  const fullConsonants = {
    ";": "य",
    "<": "ढ़",
    ">": "झ",
    "B": "ठ",
    "G": "ळ",
    "M": "ड",
    "N": "छ",
    "Q": "फ",
    "V": "ट",
    "c": "ब",
    "d": "क",
    "e": "म",
    "g": "ह",
    "i": "प",
    "j": "र",
    "l": "स",
    "n": "द",
    "o": "व",
    "p": "च",
    "r": "त",
    "t": "ज",
    "u": "न",
    "x": "ग",
    "y": "ल",
    "\u00a5": "ञ",
    "\u00b3": "ङ",
    "\u00c4": "घ",
    "\u00d2": "भ"
  };

  const halfConsonants = {
    "\"": "ष",
    "'": "श",
    ".": "ण",
    "/": "ध",
    "?": "घ",
    "F": "थ",
    "[": "ख",
    "C": "ब",
    "D": "क",
    "E": "म",
    "H": "भ",
    "I": "प",
    "L": "स",
    "O": "व",
    "P": "च",
    "R": "त",
    "T": "ज",
    "U": "न",
    "X": "ग",
    "Y": "ल"
  };

  const vowelsAndMarks = {
    "v": "अ",
    "b": "इ",
    "\u00c3": "ई",
    "m": "उ",
    "\u00c5": "ऊ",
    "_": "ऋ",
    ",": "ए",
    "f": "ि",
    "h": "ी",
    "q": "ु",
    "w": "ू",
    "`": "ृ",
    "s": "े",
    "S": "ै",
    "\u00a8": "ो",
    "\u00a9": "ौ",
    "\u00b7": "ऽ",
    "W": "ॅ",
    "a": "ं",
    "\u00a1": "ँ",
    "k": "ा"
  };

  const punctuation = {
    "!": "!",
    "$": "+",
    "&": "-",
    "(": ";",
    "-": ".",
    "\\": "?",
    "]": ",",
    "^": "\u2018",
    "@": "/",
    "\u00bb": "\u00f7",
    "\u00bc": "(",
    "\u00bd": ")",
    "*": "\u2019",
    "\u00be": "=",
    "\u00bf": "{",
    "\u00c0": "}",
    "A": "\u0964",
    "\u00de": "\u201d",
    "\u00df": "\u201c",
    "\u00e5": "\u0970",
    "\u00db": "\u2022",
    "%": "ः",
    "+": nukta,
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9"
  };

  const sequenceMap = [
    ["AA", "॥"],
    [",s", "ऐ"],
    ["#k", "रू"],
    [":", "रू"],
    ["vkS", "औ"],
    ["vks", "ओ"],
    ["vk", "आ"],
    ["Z", "र्"],
    ["{k", "क्ष"],
    ["{", `क${virama}ष${virama}${zwj}`],
    ["|", `द${virama}य`],
    ["}", `द${virama}व`],
    [")", `द${virama}ध`],
    ["=", `त${virama}र`],
    ["J", `श${virama}र`],
    ["K", `ज${virama}ञ`],
    ["z", `${virama}र`],
    ["\u00c1", `प${virama}र`],
    ["\u00d8", `क${virama}र`],
    ["\u00d9", `र${virama}${zwj}`],
    ["\u00dc", `श${virama}`],
    ["\u00dd", `फ${virama}र`],
    ["\u00e0", `ह${virama}न`],
    ["\u00e1", `ह${virama}य`],
    ["\u00e3", `ह${virama}म`],
    ["\u00e4", `क${virama}त`],
    ["\u00e6", `द${virama}र`],
    ["\u00e9", `न${virama}न`],
    ["\u00f0", `ठ${virama}ठ`],
    ["\u00f3", `स${virama}${zwj}त${virama}र`],
    ["\u00f4", `क${virama}क`],
    ["\u0098", `द${virama}भ`]
  ];

  Object.entries(halfConsonants).forEach(([key, consonant]) => {
    sequenceMap.push([`${key}k`, consonant]);
  });

  function krutidevToUnicode(input) {
    let output = String(input || "");
    sequenceMap
      .slice()
      .sort((a, b) => b[0].length - a[0].length)
      .forEach(([legacy, unicode]) => {
        output = output.split(legacy).join(unicode);
      });

    output = Array.from(output, (char) => {
      if (fullConsonants[char]) return fullConsonants[char];
      if (halfConsonants[char]) return `${halfConsonants[char]}${virama}${zwj}`;
      if (vowelsAndMarks[char]) return vowelsAndMarks[char];
      if (punctuation[char]) return punctuation[char];
      return char;
    }).join("");

    output = output.replace(/ि([\u0915-\u0939\u0958-\u095f]\u093c?)/g, "$1ि");
    output = output.replace(new RegExp(`${zwj}`, "g"), "");
    return output.normalize("NFC");
  }

  window.GJUHindiFontModes = {
    krutidevToUnicode
  };
})();
