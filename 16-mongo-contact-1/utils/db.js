const mongoose = require('mongoose')

// connect db
mongoose.connect('mongodb://127.0.0.1:27017/kuliah',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    // useCreateIndex: true
})

// // membuat schema
// const contact1 = mongoose.model('Contact',{
//     nama:{
//         type:String,
//         required:true
//     },
//     nohp:{
//         type:String,
//         required:true,
//     },
//     email:{
//         type:String,
//         required:true,
//     }
// })

// // menambah 1 data
// const contact = new contact1({
//     nama:'jojo',
//     nohp:'0877711111',
//     email:'jojo@gmail.com'
// })

// // simpan data
// contact.save().then((result)=>console.log(result))