const parseSequence = require("./parseSequence")
const argv = require("minimist")(process.argv.slice(2))

for(var i in argv._)
  console.log( parseSequence(argv._[i]) )
