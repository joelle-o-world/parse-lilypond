const parsePitch = require("./parsePitch.js")
const parseChord = require("./parseChord.js")

const digitReg = /[0-9]/

function parseNote(str, i0=0) {
  var sound = parsePitch(str, i0)

  if(!sound)
    sound = parseChord(str, i0)

  if(!sound)
    return null

  for(var i1=sound.iEnd; i1<str.length && digitReg.test(str[i1]); i1++)
    continue

  var number = null
  if(i1 != sound.iEnd)
    number = parseInt(str.slice(sound.iEnd, i1))

  var tied = false
  if(str[i1] == "~") {
    tied = true
    i1++
  }

  return {
    type: "note",
    sound: sound,
    number: number,
    tied: tied,
    i0: i0,
    iEnd: i1,
  }
}
module.exports = parseNote
