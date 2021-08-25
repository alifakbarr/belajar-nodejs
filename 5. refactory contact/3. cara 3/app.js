const biodatas = require('./biodatas')

const main = async () =>{
    nama = await biodatas.tulisPertanyaan('siapa namamu : ');
    umur = await biodatas.tulisPertanyaan('berapa umurmu : ');

    biodatas.simpanData(nama,umur);

}

main()

