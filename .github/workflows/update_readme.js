const fs = require('fs')

module.exports = async ({github, context, core}) => {
  const target_file = core.getInput("file", { required: true })

  fs.readFile(target_file, 'utf8', function(err, data) {
    if (err) throw err

    const extra_content = 'Here it is some new content!'
    const pos = data.indexOf('### auto-update section')
    if(pos == -1) throw 'Boundary line not found'

    const new_data = `${data.substring(0, pos)}### auto-update section\n\n${extra_content}`
    console.log(new_data)

    fs.writeFile(target_file, new_data, function (err) {
      if (err) throw err

      console.log(`${target_file} updated`)
    })
  })
}
