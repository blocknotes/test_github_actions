const fs = require('fs')

module.exports = async ({github, context, core}) => {
  // NOTE: not using the input - core.getInput("target_file") - because of "Unexpected input(s) ..." warnings
  const targetFile = process.env.TARGET_FILE
  const boundaryLine = process.env.BOUNDARY_LINE
  const content = process.env.CONTENT

  fs.readFile(targetFile, 'utf8', function(err, data) {
    if (err) throw err

    const pos = data.indexOf(boundaryLine)
    if(pos == -1) throw 'Boundary line not found'

    const new_data = `${data.substring(0, pos)}${boundaryLine}\n\n${content}`
    console.log(new_data)

    fs.writeFile(targetFile, new_data, 'utf8', function (err) {
      if (err) throw err

      // console.log(`${targetFile} updated`)
    })
  })
}
