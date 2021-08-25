// menjalankan program di terminal
// node index
// node index.js
// node . jika nama file index

// apa itu modules?
// sekumpulan code yang dapat digunakan kembali, dengan antar muka yang terdefinisi

// apa itu node modules
// fungsionalitas yang simpel ataupun  kompleks yang tersimpan didalam sebuah file javascript,
// yang dapat kita gunakan kembali pada aplikasi node js

// perilaku node modules
// setiap modul didalam node js memiliki perilaku masing masing tidak bisa saling tercampur dengan
// module lain pada lingkup global

// jenis node js module dan urutan eksekusi
// 1. core module
// 2. local module
// 3. third party module


// memanggil function cetakNama dari file coba.js
// const fs = require('fs') //core module
// const cetakNama = require('./coba') //local module
// const moment = require('moment') //third party module / npm module / node_modules

// require
const coba = require('./coba')

console.log(coba.cetakNama('Irdho'), coba.pi, coba.mahasiswa.cetakMhs(), new coba.Orang())