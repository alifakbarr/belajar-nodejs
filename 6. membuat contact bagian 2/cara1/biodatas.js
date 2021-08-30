const fs = require('fs')
const validator = require('validator')


// membuat folder data jika tidak ada
const folderPath = './data'
if(!fs.existsSync(folderPath)){
    fs.mkdirSync(folderPath)
}

// membuat file biodata jika tidak ada
const filePath = './data/biodatas.json'
if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath, '[]', 'utf-8')
}


const simpanData = (nama, email, noHP) =>{
     // tampung hasil dulu
     const data = {nama, email, noHP}
     // baca file 
     const file = fs.readFileSync('data/biodatas.json', 'utf-8')
     // ubah file menjadi file json dan masukkan kedalam var datas
     const datas = JSON.parse(file)
     // lalu push/tambahkan data ke dalam datas

    // cek duplikat nama
    // cari di file apakah ada nama yang sama
    const duplikat = datas.find((data) => data.nama === nama)

    // jika nama ada / duplikat
    if(duplikat){
        console.log('Nama sudah ada!')

        // exit dari program
        return false
    }

    // cek apakah email disi
    if(email){
        if(!validator.isEmail(email)){

            console.log('email salah')
            return false

        }
    }

    // cek no hp apakah benar
    if(!validator.isMobilePhone(noHP, 'id-ID')){
        console.log('no hp tidak valid')
        return false
    }

     datas.push(data)
     // lalu tulis ke biodatas.json dan ubah data kembali ke file string biasa
     fs.writeFileSync('data/biodatas.json', JSON.stringify(datas))
     console.log('simpan data berhasil')
}

module.exports = {simpanData}