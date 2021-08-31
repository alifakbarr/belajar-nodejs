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
        nohp:{
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
        biodatas.simpanData(argv.nama, argv.email, argv.nohp)
    }
})

// menampilkan list contact
yargs.command({
    command: 'list',
    describe: 'Menampilkan list contact',
    handler() {
        console.log(biodatas.listBiodata())
    }
})

// mencari contact dan menampilkan secara detail
yargs.command({
    command: 'detail',
    describe: 'Melihat detail contact',
    builder:{
        nama:{
            describe: 'masukkan nama',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log(biodatas.detailBiodata(argv.nama))
    }
})

// menghapus contact berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Hapus contact berdasarkan nama',
    builder:{
        nama:{
            describe: 'masukkan nama',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log(biodatas.deleteContact(argv.nama))
    }
})
yargs.parse()