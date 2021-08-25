// memanggil core module
const fs = require('fs')
const readLine = require('readline')

// file system
// menulis text kedalam file (Syncronous)
// fs.writeFileSync('data/text.txt', 'Hello world dengan Syncronous')

// menulis text kedalam file (Asyncronous)
// fs.writeFile('data/text.txt', 'Hello world dengan Asyncronous', (err) => {
//     console.log(err)
// })

// membaca text dalam file (Syncronous)
// const data = fs.readFileSync('data/text.txt', 'utf-8')
// console.log(data)

// membaca text dalam file (Asyncronous)
// fs.readFile('data/text.txt', 'utf-8', (err, data) => {
//     if (err) throw err
//     console.log(data)
// })

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
})

// rl.question('Siapa namamu : ', (nama) => {
//     rl.question('umur mu berapa : ', (umur) => {
//         console.log(`Halo ${nama}, pasti umur mu ${umur}`)
//         rl.close()
//     })
// })

// input nama dan di masukkan kedalam file dalam bentuk JSON
rl.question('Siapa namamu : ', (nama) => {
    rl.question('umur mu berapa : ', (umur) => {
        // tampung hasul dulu
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
    })
})
