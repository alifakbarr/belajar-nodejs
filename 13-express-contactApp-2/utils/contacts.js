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

// menambah / menimpa data biodatas.json dengan data yang baru
const saveContact = (contact) =>{ //data yang masuk object
    fs.writeFileSync('data/biodatas.json', JSON.stringify(contact)); //rubah menjadi string
}

//menambahkan data contact baru
const addContact = (contact) => {
    const contacts = loadFile() //panggil semua data
    contacts.push(contact) //tambahkan data lama dengan data baru
    saveContact(contacts) //simpan / timpa data
}

// cek duplikat nama

const cekDuplikat = (nama) => {
    contacts = loadFile()
    return contacts.find((contact) => contact.nama === nama)
}

module.exports = {loadFile, findContact, addContact, cekDuplikat}