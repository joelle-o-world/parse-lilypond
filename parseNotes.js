const parseNote = require("./parseNote.js")
const skipWhitespace = require("./skipWhitespace.js")

function parseNotes(str, i0=0) {
  var notes = []

  var i1 = i0
  while(i1 < str.length) {
    var note = parseNote(str, i1)
    if(!note)
      break
    notes.push(note)
    i1 = skipWhitespace(str, note.iEnd)
  }

  if(notes.length)
    return {
      type: "noteSequence",
      notes: notes,
      i0: i0,
      iEnd: i1,
    }
  else
    return null
}
module.exports = parseNotes
