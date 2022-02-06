import fs from 'fs'
import readline from 'readline'

var rd = readline.createInterface({
    input: fs.createReadStream('./tmp'),
    output: process.stdout,
    console: false
});

let metros = []
rd.on('line', function (line) {
    metros.push(line)
    console.log(JSON.stringify(metros))
})

const s = JSON.stringify(metros)
console.log('rrretertert')