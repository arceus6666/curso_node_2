const argv = require('yargs')
  .options({
    ciudad1: {
      alias: 'c1',
      desc: 'Ciudad para obtener el clima.',
      demand: true
    }
  })
  .options({
    ciudad2:{
      alias:'c2',
      desc:'Ciudad 2',
      demand: true
    }
  })
  .help()
  .argv;

module.exports = {
  argv
}