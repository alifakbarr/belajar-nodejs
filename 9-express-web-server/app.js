const express = require('express')
const app = express()
const port = 3000

// cara 2
// membuat route
app.get('/', (req,res) => {
    // menampilkan hasil respon
    // menampilkan file halaman
    // root untuk memberitahu alaman halaman
    res.sendFile('./index.html', ({ root: __dirname} ))
})

// menampilkan data json
app.get('/json', (req,res) => {
    res.json({
        nama: 'irdho',
        email: 'irdho8800@gmail.com',
        noHP: '08935236578',
    })
})

app.get('/about', (req,res) => {
    res.sendFile('./about.html', ({ root: __dirname}))
})

app.get('/contact', (req,res) => {
    res.sendFile('./contact.html', ({ root: __dirname}))
})

// mengambil parameter url
// app.get('/product/:id', (req,res) => {
//     res.send(`Product id : ${req.params.id}`)
// })

// mengambil query url
app.get('/product/:id', (req,res) => {
    res.send(`Product id : ${req.params.id} <br> Category : ${req.query.category}`)
})


// membuat middleware
// ketika route tidak ditemukan
app.use('/', (req,res) => {
    // rubah jadi halaman 404 not found
    res.status(404)
    res.send('Halaman tisak ditemukan')
})






// cara 1
// // membuat route
// app.get('/', (req,res) => {
//     // menampilkan hasil respon
//     res.send('Hello world!')
// })

// // menampilkan data json
// app.get('/json', (req,res) => {
//     res.json({
//         nama: 'irdho',
//         email: 'irdho8800@gmail.com',
//         noHP: '08935236578',
//     })
// })

// app.get('/about', (req,res) => {
//     res.send('halaman About')
// })

// app.get('/contact', (req,res) => {
//     res.send('halaman Contact')
// })

// // membuat middleware
// // ketika route tidak ditemukan
// app.use('/', (req,res) => {
//     // rubah jadi halaman 404 not found
//     res.status(404)
//     res.send('Halaman tisak ditemukan')
// })

// menjalankan server
app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`)
})



