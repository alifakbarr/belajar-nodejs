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

const loadFile = () =>{
         // baca file 
         const file = fs.readFileSync('data/biodatas.json', 'utf-8')
         // ubah file menjadi file json dan masukkan kedalam var datas
         const datas = JSON.parse(file)
         return datas
}

const simpanData = (nama, email, nohp) =>{
     // tampung hasil dulu
     const data = {nama, email, nohp}
     // lalu push/tambahkan data ke dalam datas
    const datas = loadFile()
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
    if(!validator.isMobilePhone(nohp, 'id-ID')){
        console.log('no hp tidak valid')
        return false
    }

     datas.push(data)
     // lalu tulis ke biodatas.json dan ubah data kembali ke file string biasa
     fs.writeFileSync('data/biodatas.json', JSON.stringify(datas))
     console.log('simpan data berhasil')
}

const listBiodata = () =>{
    // membaca data
    const datas = loadFile()

    console.log('Daftar Biodata :')
    datas.forEach((data, i) => {
        console.log(`${i+1}. ${data.nama} - ${data.nohp}`)
    })
}

// menampilkan biodata berdasarkan nama
const detailBiodata = (nama) =>{
    const datas = loadFile()

    const data = datas.find((data) => data.nama.toLowerCase() === nama.toLowerCase())
    
    if(!data){
        return console.log(`${nama} tidak ditemukan`);
        // return false;   
    }
    console.log(`${data.nama}`)
    console.log(`${data.nohp}`)
    if(data.nama){
        console.log(`${data.email}`)
    }
}

const deleteContact = (nama) =>{
    const datas = loadFile()

    // menggunakan filter agar saat bertemu data yang dicari proses tetap dijalankan
    const newDatas = datas.filter((data) => data.nama.toLowerCase() !== nama.toLowerCase())

    // timpa data lama dengan data baru
    fs.writeFileSync('data/biodatas.json', JSON.stringify(newDatas))
    console.log('data berhasil dihapus')

    // jika jumlah data lama dengan data baru sama maka nama tidak ditemukan
    if(datas.length === newDatas.length){
        return console.log(`${nama} tidak ditemukan`);
    }
}
module.exports = {simpanData, listBiodata, detailBiodata, deleteContact}