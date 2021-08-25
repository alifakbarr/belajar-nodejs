// berisi proses add data

const fs = require('fs')
const readLine = require('readline')

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
})

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

// membuat promise dulu agar bisa async await untuk pertanyaan
const tulisPertanyaan = (pertanyaan) =>{
    return new Promise((resolve, reject) => {
        rl.question(pertanyaan, (jawab) => {
            resolve(jawab)
        })
    })
}

const simpanData = (nama, umur) =>{
     // tampung hasil dulu
     const data = {nama, umur}
     // baca file 
     const file = fs.readFileSync('data/biodatas.json', 'utf-8')
     // ubah file menjadi file json dan masukkan kedalam var datas
     const datas = JSON.parse(file)
     // lalu push/tambahkan data ke dalam datas
     datas.push(data)
     // lalu tulis ke biodatas.json dan ubah data kembali ke file string biasa
     fs.writeFileSync('data/biodatas.json', JSON.stringify(datas))
     rl.close()
}

module.exports = {tulisPertanyaan, simpanData}