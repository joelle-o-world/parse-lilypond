const parsePitch = require("./parsePitch.js")
const skipWhitespace = require("./skipWhitespace.js")

function parseChord(str, i0=0) {
  if(str[i0] != "<" || str[i0+1] != "<")
    return null

  var hasTies = false
  var pitches = []
  var iN = skipWhitespace(str, i0+2)
  while(iN < str.length) {
    var pitch = parsePitch(str, iN)
    if(!pitch)
      break;
    iN = pitch.iEnd
    if(str[iN] == "~") {
      hasTies = true
      pitch.tied = true
      iN++
    }
    pitches.push(pitch)
    iN = skipWhitespace(str, iN)
  }

  if(!pitches.length)
    return null

  if(str[iN] != ">" || str[iN+1] != ">")
    return null
  iN += 2

  return {
    type: "chord",
    pitches: pitches,
    hasTies: hasTies,
    i0: i0,
    iEnd: iN,
  }
}
module.exports = parseChord
