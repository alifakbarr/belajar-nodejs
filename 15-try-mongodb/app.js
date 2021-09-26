const { ObjectID } = require("bson")
const { MongoClient } =require("mongodb")

const uri = "mongodb://127.0.0.1:27017"

const dbName = "kuliah"

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

client.connect((error, client) => {
    if(error){
        return console.log('koneksi gagal')
    }

    console.log('koneksi Berhasil')

    // pilih db
    const db = client.db(dbName)

    // menambahkan 1 data mahasiswa
    // db.collection('mahasiswa').insertOne(
    //     {
    //         nama:"alif",
    //         nohp:"081999999"
    //     },(error,result) => {
    //         if(error){
    //            return console.log('data gagal diinput');
    //         }

    //         console.log(result)
    //     }
    //     )

    // menambahkan banyak data
    // db.collection('mahasiswa').insertMany(
    //     [
    //         {
    //             nama:'jojo',
    //             nohp:'0899767657'
    //         },
    //         {
    //             nama:'sisi',
    //             nohp:'088775768778'
    //         }
    //     ],(error,result) => {
    //         if(error){
    //             return console.log('data gagal ditambahkan')
    //         }

    //         console.log(result);
    //     }
    // )

    // // menampilkan seluruh data
    // console.log(db.collection('mahasiswa').find().toArray((error,result)=>{ //ubah jadi arrayOfObject
    //     if(result){
    //         console.log(result);
    //     }
    // }));

    // menampilkan data berdasarkan kriteria
    // console.log(db.collection('mahasiswa').find({ _id: ObjectID('614fd8c0f1066527ffd18e83')}).toArray((error,result)=>{ //ubah jadi arrayOfObject
    //     if(result){
    //         console.log(result);
    //     }
    // }));

    // // update data berdasarkan id tanpa info
    // db.collection('mahasiswa').updateOne(
    // cari bedasarkan id
    //     {
    //         _id : ObjectID('614fd8c0f1066527ffd18e83')
    //     },
    // apa yang dirubah
    //     {
    //         $set:{
    //             nama:'king'
    //         }
    //     }
    // )

    // update data berdasarkan id tanpa info
    // const updatePromise = db.collection('mahasiswa').updateOne(
    //     // cari id dulu
    //     {
    //         _id : ObjectID('614fd8c0f1066527ffd18e83')
    //     },
    //     // apa yang dirubah
    //     {
    //         $set:{
    //             nama:'queen'
    //         }
    //     }
    // )

    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // update banyak data berdasarkan id tanpa info
    // const updatePromise = db.collection('mahasiswa').updateMany(
    //     // cari id dulu
    //     {
    //         nama : 'queen'
    //     },
    //     // apa yang dirubah
    //     {
    //         $set:{
    //             nama:'queen ku'
    //         }
    //     }
    // )

    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // hapus 1 data
    // db.collection('mahasiswa').deleteOne(
    //     {
    //         nama: 'alif'
    //     }).then((result) => {
    //         console.log(result);
    //     }).catch((error) => {
    //         console.log(error)
    //     }
    // )

    // hapus banyak data
    db.collection('mahasiswa').deleteMany(
        {
            nama: 'queen ku'
        }).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error)
        }
    )
})