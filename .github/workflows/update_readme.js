const fs = require('fs')

module.exports = async ({github, context, core}) => {
  const targetFile = process.env.TARGET_FILE // core.getInput("file")
  const boundaryLine = process.env.BOUNDARY_LINE
  const content = process.env.CONTENT // core.getInput("content")

  fs.readFile(targetFile, 'utf8', function(err, data) {
    if (err) throw err

    const pos = data.indexOf(boundaryLine)
    if(pos == -1) throw 'Boundary line not found'

    const new_data = `${data.substring(0, pos)}${boundaryLine}\n\n${content}`
    console.log(new_data)

    fs.writeFile(targetFile, new_data, function (err) {
      if (err) throw err

      console.log(`${targetFile} updated`)
    })
  })
}
