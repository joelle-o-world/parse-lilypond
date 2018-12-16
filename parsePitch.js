const letterReg = /[a-g]/
const letterPitchClasses = {c: 0, d:2, e:4,f:5,g:7,a:9,b:11}

function parsePitch(str, i0=0) {
  if(letterReg.test(str[i0])) {
    var letter = str[i0]
    var accidental = 0
    var octave = 0

    if(str[i0+2] == 's')
      if(str[i0+1] == 'e')
        accidental = -1
      else if(str[i0+1] == "i")
        accidental = 1

    var pitchClass = (letterPitchClasses[letter] + accidental) % 12
    if(pitchClass < 0)
      pitchClass += 12

    var iN = accidental ? i0 + 3 : i0 + 1
    var c;
    while(c = str[iN++])
      if(c == ",")
        octave--
      else if(c=="'")
        octave++
      else
        break

    return {
      type: "pitch",
      pitchClass: pitchClass,
      octave: octave,
      letter: letter,
      accidental: accidental,
      i0: i0,
      iEnd: iN-1,
    }
  } else return null
}
module.exports = parsePitch
