const skipWhitespace = require("./skipWhitespace")
const parseElement = require("./parseElement")

function parseSequence(str, i0=0) {
  var i
  var bracketed = false
  if(str[i0] == "{") {
    bracketed = true
    i = i0+1
  } else
    return null //i = i0 // return null here to forbid unbracketed sequences

  i = skipWhitespace(str, i)

  var elements = []
  while(i < str.length) {
    var element = parseElement(str, i)
    if(!element)
      break
    elements.push(element)
    i = skipWhitespace(str, element.iEnd)
  }

  if(elements.length == 0)
    return null

  if(bracketed)
    if(str[i] == "}")
      i++
    else
      return null

  return {
    type: "sequence",
    elements: elements,
    bracketed: bracketed,
    i0: i0,
    iEnd: i,
  }
}
module.exports = parseSequence
