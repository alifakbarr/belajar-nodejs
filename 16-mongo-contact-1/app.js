const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash =require('connect-flash')


require('./utils/db')
const Contact = require('./model/contact')

const app = express()
const port = 3000

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

// halaman detail contact
app.get('/contact/:nama', async(req,res) => {
    const contact = await Contact.findOne({nama: req.params.nama})
    res.render('detail',{
        layout: 'layouts/main-layout',
        contact
    })
})

app.listen(port, ()=>{
    console.log(`Mongo Contact-App | http://localhost:${port}`);
})