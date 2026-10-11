const path = require("path");
const express = require('express');
const app = express();
const PORT = 3000;

const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/bookstore');
}

main()
.then(() => {console.log('DB Connected')})
.catch((err) => {console.log(err)});

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    category: String,
    image: String
});

const Book = mongoose.model('Book', bookSchema);
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.set(express.static(path.join(__dirname,'public')));

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'adarshgiriag2006@gmail.com',
        pass: 'xucx bqyn nelk qvha'
    }
});

app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/books', async (req, res) => {
    const books = await Book.find();
    res.render('books', { books });
});

app.get('/category',(req,res)=>{
    res.render('categories')
})
app.get('/contact',(req,res)=>{
    res.render('contact')
})
app.post('/contact', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mob;
    const message = req.body.message;

    transport.sendMail({
        to: 'adarshgiriag2006@gmail.com',
        subject: 'New Customer Message',
        text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`
    }, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error not sent');
        }

        return res.redirect('/contact');
    });
});


app.listen(PORT,()=>{
    console.log("Listening on "+PORT)
})




// http://localhost:3000 --- run chrome
// E:\Node\Book Store> ---node index.js




