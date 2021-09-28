const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const { body, validationResult, check} = require('express-validator')
const methodOverride = require('method-override')

const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash =require('connect-flash')


require('./utils/db')
const Contact = require('./model/contact')

const app = express()
const port = 3000

// setup method override
app.use(methodOverride('_method'))

// set up ejs layouts
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

// konfigurasi flash
app.use(cookieParser('secret'))
app.use(
    session({
        cookie:{maxAge:6000},
        secret:'secret',
        resave:true,
        saveUninitialized:true,
    })
)

// halaman home
app.get('/', (req,res) => {
    // menjalankan file dan mengirimkan var ke file
    res.render('index',{
        layout: 'layouts/main-layout'
    })
})

// halaman about
app.get('/about', (req,res) => {
    // menjalankan file dan mengirimkan var ke file
    res.render('about',{
        layout: 'layouts/main-layout'
    })
})

// halaman contact
app.get('/contact', async(req,res) => {
    // mengambil data
    const contacts = await Contact.find() //jadikan async karena data awal adalah promise
    res.render('contact', {
        title: 'contact',
        layout: 'layouts/main-layout',
        // mengirimkan data
        contacts,
        // msg:req.flash('msg') //dapat dari app.post(create)
    })
})

// form add input
app.get('/contact/create', (req,res) => {

    res.render('create', {
        title: 'create',
        layout: 'layouts/main-layout',
    })
})

// proses input data
app.post('/contact', 
[
    body('nama').custom(async(value) => {
        const duplikat = await Contact.findOne({nama:value})
        if(duplikat){
            throw new Error('Nama sudah ada')
        }
        return true
    }),
    check('nohp', 'No Hp Tidak Valid').isMobilePhone('id-ID'),
], (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() }); 
        res.render('create',{
            layout: 'layouts/main-layout',
            errors : errors.array()
    })
    
    }else{
        // res.send(req.body)
        Contact.insertMany(req.body, (error, result)=>{
            res.redirect('/contact') //ketika berhasil redirect ke get /contact
        })
        // req.flash('msg','Data berhasil ditambahkan') //mengirim pesan
        
    }
})

// // delete contact cara 1
// app.get('/contact/delete/:nama', async(req,res) => {
//     const contact = await Contact.findOne({nama:req.params.nama})// cari nama
//     if(!contact){
//         res.send('<h1>404</h1>') // jika nama tidak ada
//     }else{
//         // res.send(contact)
//         Contact.deleteOne({ _id:contact._id}).then((result) => {
//             res.redirect('/contact')

//         }) //jika ada hapus
//         // req.flash('msg','data berhasil dihapus') // kirim pesan 
//     }
// })

// edit contact
app.get('/contact/edit/:id', async (req,res) => {
    const contact = await Contact.findOne( {_id : req.params.id} )
    res.render('edit',{
        layout: 'layouts/main-layout',
        contact
    })
})

// proses update
app.put('/contact', 
[
    body('nama').custom( async(value, {req}) => {
        const duplikat = await Contact.findOne({nama:value})
        if(value !== req.body.oldName && duplikat){ 
            throw new Error('Nama sudah ada')
        }
        return true
    }),
    check('nohp', 'No Hp Tidak Valid').isMobilePhone('id-ID'),
], (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() }); 
        res.render('edit',{
            layout: 'layouts/main-layout',
            errors : errors.array(),
            contact : req.body
    })
    
    }else{
        Contact.updateOne(
            { _id : req.body._id},
            {
                $set :{
                    nama : req.body.nama,
                    nohp : req.body.nohp
                }
            }
            ).then((result) =>{
                // updateContacts(req.body)
                // req.flash('msg','Data berhasil diubah') //mengirim pesan
                res.redirect('/contact') //ketika berhasil redirect ke get /contact
            })
    }
})

// delete contact cara 2
app.delete('/contact', (req,res) => {
    // res.send(req.body._id)
    Contact.deleteOne({ _id : req.body._id}).then((result) => {
        res.redirect('/contact')
    })
})


// halaman detail contact
app.get('/contact/:id', async(req,res) => {
    const contact = await Contact.findOne({_id: req.params.id})
    res.render('detail',{
        layout: 'layouts/main-layout',
        contact
    })
})

app.listen(port, ()=>{
    console.log(`Mongo Contact-App | http://localhost:${port}`);
})

