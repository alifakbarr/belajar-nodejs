const cetakNama = (nama) => `Hai nama saya ${nama}`

const pi = 3.14

const mahasiswa = {
    nama:'ALif',
    umur:21,
    cetakMhs () {
        return `${this.nama} dan umur ${this.umur}`
    }
}
class Orang{
    constructor(){
        console.log('objek Orang telah dibuat');
    }
}
// cara export module
// cara 1
// mengeksport function cetak nama agak dapat diakses file js manapun
// module.exports = cetakNama;

// cara 2
// module.exports.cetakNama = cetakNama
// module.exports.pi = pi

// cara 3 
// module.exports.coba = {
//     cetakNama:cetakNama,
//     pi:pi,
//     mahasiswa:mahasiswa,
//     Orang:Orang,
// }

// cara 3 + ES6
module.exports = {
        cetakNama,
        pi,
        mahasiswa,
        Orang,
}