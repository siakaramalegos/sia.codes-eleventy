const fs = require('fs')
fs.writeFileSync('../.env', `WEBMENTION_IO_TOKEN=${process.env.WEBMENTION_IO_TOKEN}\n`)
