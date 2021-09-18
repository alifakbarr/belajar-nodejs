const express = require('express')
const app = express()
// menggunakan express-ejs-layouts
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs')

// Third Party Middleware
// gunakan expressLayouts
app.use(expressLayouts)
app.use(morgan('dev'))

// Application Level Middleware
// fungsi next yaitu seletah di kerjakan maka akan mengerjakan selanjutnya
app.use((req,res,next)=>{
    console.log('Time : ', Date.now())
    next()
})

// built-in middleware
// mengakses file static seperti foto,video,css
app.use(express.static('public'))

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
    res.render('contact', {
        title: 'contact',
        layout: 'layouts/main-layout'
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
app.get('/product/:id', (req,res) => {
    res.send(`Product id : ${req.params.id} <br> Category : ${req.query.category}`)
})

app.use((req,res) => {
    res.status(404)
    res.send('Halaman tisak ditemukan')
})

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`)
})



