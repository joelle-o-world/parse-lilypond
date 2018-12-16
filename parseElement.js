const parseNote = require("./parseNote.js")

function parseElement(str, i0=0) {
  var note = parseNote(str, i0)
  if(note)
    return note

  return null
}
module.exports = parseElement
