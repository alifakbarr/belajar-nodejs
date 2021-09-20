const express = require('express')
const app = express()

const {loadFile,findContact, addContact} = require('./utils/contacts')


// menggunakan express-ejs-layouts
const expressLayouts = require('express-ejs-layouts')
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs')

// Third Party Middleware
// gunakan expressLayouts
app.use(expressLayouts)


// built-in middleware
// mengakses file static seperti foto,video,css
app.use(express.static('public'))
app.use(express.urlencoded()) //untuk menangkap data

const murid = [
    {
        nama: 'kilua',
        kelas: '1 sd'
    },
    {
        nama: 'bobi',
        kelas: '3 sd'
    },
    {
        nama: 'boba',
        kelas: '6 sd'
    },
]

app.get('/', (req,res) => {
    // menjalankan file dan mengirimkan var ke file
    res.render('index',{
        hobby: 'tidur',
        murid,
        layout: 'layouts/main-layout'
    })
})

app.get('/about', (req,res) => {
    // menjalankan file dengan function render milik ejs
    res.render('about', {
        title: 'About',
        // pemanggilan main-layout dihalaman
        layout: 'layouts/main-layout'
    })
})

app.get('/contact', (req,res) => {
    // mengambil data
    const contacts = loadFile()
    res.render('contact', {
        title: 'contact',
        layout: 'layouts/main-layout',
        // mengirimkan data
        contacts
    })
})

// form add input
app.get('/contact/create', (req,res) => {

    res.render('create', {
        title: 'contact',
        layout: 'layouts/main-layout',
    })
})

// proses input data
app.post('/contact', (req,res) =>{
    addContact(req.body)
    res.redirect('/contact') //ketika berhasil redirect ke get /contact
    // res.send(req.body);
})

app.get('/contact/:nama', (req,res) => {
    // mencari data berdasarkan nama
    const contact = findContact(req.params.nama)
    res.render('detail', {
        title: 'contact',
        layout: 'layouts/main-layout',
        // mengirimkan data
        contact
    })
})

// menampilkan data json
app.get('/json', (req,res) => {
    res.json({
        nama: 'irdho',
        email: 'irdho8800@gmail.com',
        noHP: '08935236578',
    })
})

app.use((req,res) => {
    res.status(404)
    res.send('Halaman tisak ditemukan')
})

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`)
})



