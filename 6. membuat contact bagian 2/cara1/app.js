const biodatas = require('./biodatas')
const yargs = require('yargs')
const { argv } = require('yargs')
const { demandOption } = require('yargs')

// .command(cmd,desc,[builder],[handler])
// .options(key, [opt])

// console.log(yargs.argv)

yargs.command({
    command: 'add',
    describe: "Menambah biodata",
    builder: {
        nama: {
            describe: "Tambahkan nama",
            demandOption: true, //jika true wajib diisi
            type: 'string',
        },
        email:{
            describe: "masukkan email",
            demandOption: false,
            type : 'string',
        },
        noHP:{
            describe: "masukkan NOHP",
            demandOption: true,
            type: 'string',
        }
    },
    handler(){
        // const biodatas = {
        //     nama: argv.nama,
        //     email: argv.email,
        //     noHP: argv.NOHP,
        // }

        // console.log(biodatas)

        // masukkan ke simpan data
        biodatas.simpanData(argv.nama, argv.email, argv.noHP)
    }
})

yargs.parse()