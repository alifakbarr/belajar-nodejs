const fs = require('fs')


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

// mengambil semua data
const loadFile = () =>{
         // baca file 
         const file = fs.readFileSync('data/biodatas.json', 'utf-8')
         // ubah file menjadi file json dan masukkan kedalam var datas
         const datas = JSON.parse(file)
         return datas
}

// mencari data berdasarkan nama
const findContact = (nama) => {
    // load semua data
    const contacts = loadFile()
    // cari data yang sama
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())
    return contact
}

module.exports = {loadFile, findContact}