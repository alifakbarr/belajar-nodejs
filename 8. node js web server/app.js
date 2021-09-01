const http = require('http')
const fs = require('fs')

const port = 3000
const renderHtml = (path,res) =>{
    // menampilkan dari file lain
    fs.readFile(path,(err, data) =>{
        if(err){
            res.writeHead(404)
            res.write('File not found')
        }else{
            // menampilkan hasilnya
            res.write(data)
        }
        res.end()
    })
}

// http.createServer([options][requestListener])
// requestListener menerima request(yang dikirim ke server) dan response(mengembalikan setealh dikirim)

http
    .createServer((req,res) => {
        // merubah menjadi type html
        res.writeHead(200,{
            'Content-Type': 'text/html'
        })

        // membuat routing pindah halaman
        // mengambil url apapun yang direquest
        const url = req.url

        // cara 4
        switch(url){
        case '/about':
            renderHtml('./about.html', res)
            break
        case '/contact':
            renderHtml('./contact.html', res)
            break  
        default:
            renderHtml('./index.html', res)
            break
        }

        // // cara 3
        // if(url === '/about'){
        //     renderHtml('./about.html', res)
        // }else if(url === '/contact'){
        //     renderHtml('./contact.html', res)
        // }else{
        //     renderHtml('./index.html', res)
        // }



        // cara 2
        // if(url === '/about'){
        //     // menampilkan dari file lain
        //     fs.readFile('./about.html',(err, data) =>{
        //         if(err){
        //             res.writeHead(404)
        //             res.write('File not found')
        //         }else{
        //             // menampilkan hasilnya
        //             res.write(data)
        //         }
        //         res.end()
        //     })
        // }else if(url === '/contact'){
        //     // menampilkan dari file lain
        //     fs.readFile('./contact.html',(err, data) =>{
        //         if(err){
        //             res.writeHead(404)
        //             res.write('File not found')
        //         }else{
        //             // menampilkan hasilnya
        //             res.write(data)
        //         }
        //         res.end()
        //     })
        // }else{
        //     // menampilkan dari file lain
        //     fs.readFile('./index.html',(err, data) =>{
        //         if(err){
        //             res.writeHead(404)
        //             res.write('File not found')
        //         }else{
        //             // menampilkan hasilnya
        //             res.write(data)
        //         }
        //         res.end()
        //     })
        // }

        // cara 1
        // if(url === '/about'){
        //     res.write('Hello about')
        //     // res.end() menandakan bahwa perintah server sudah selesai
        //     res.end()
        // }else if(url === '/contact'){
        //     res.write('Hello contact')
        //     // res.end() menandakan bahwa perintah server sudah selesai
        //     res.end()
        // }else{
            
            // cara biasa
            // res.write('Hello World')
            // // res.end() menandakan bahwa perintah server sudah selesai
            // res.end()
        // }


        
    })
    // listen untuk menjalankan web server
    .listen(port, () =>{
        console.log(`Server is listeningon port ${port}`)
    })