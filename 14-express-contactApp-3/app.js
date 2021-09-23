const express = require('express')
// menggunakan express-ejs-layouts
const expressLayouts = require('express-ejs-layouts')
const {loadFile,findContact, addContact, cekDuplikat, deleteContact} = require('./utils/contacts')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash =require('connect-flash')


const { body, validationResult, check} = require('express-validator')
const app = express()
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs')

// Third Party Middleware
// gunakan expressLayouts
app.use(expressLayouts)


// built-in middleware
// mengakses file static seperti foto,video,css
app.use(express.static('public'))
app.use(express.urlencoded({extended:true})) //untuk menangkap data

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
app.use(flash())

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
        contacts,
        msg:req.flash('msg') //dapat dari app.post(create)
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
    body('nama').custom((value) => {
        const duplikat = cekDuplikat(value)
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
        addContact(req.body)
        req.flash('msg','Data berhasil ditambahkan') //mengirim pesan
        res.redirect('/contact') //ketika berhasil redirect ke get /contact
    }
})

app.get('/contact/delete/:nama', (req,res) => {
    const contact = findContact(req.params.nama) // cari nama
    if(!contact){
        res.send('<h1>404</h1>') // jika nama tidak ada
    }else{
        deleteContact(req.params.nama) //jika ada hapus
        req.flash('msg','data berhasil dihapus') // kirim pesan 
        res.redirect('/contact')
    }
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



