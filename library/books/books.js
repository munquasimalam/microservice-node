const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoose = require("mongoose");
 require("./Book")
 const Book = mongoose.model("Book");
//const MongoClient = require('mongodb').MongoClient;
mongoose.connect("mongodb://munna:munna@mmdb-shard-00-00-u9j2v.mongodb.net:27017,mmdb-shard-00-01-u9j2v.mongodb.net:27017,mmdb-shard-00-02-u9j2v.mongodb.net:27017/test?ssl=true&replicaSet=mmdb-shard-0&authSource=admin&retryWrites=true&w=majority",()=>{
    console.log("database connected");
});
app.get('/',(req,res)=>{
    res.send("this is book servicemm123");
});
app.post('/book',(req,res)=>{
    console.log(req.body)
    var newBook = {
        title:req.body.title,
        author:req.body.author,
        numberPages:req.body.numberPages,
        publisher:req.body.publisher
    }
    var book = new Book(newBook);
    book.save().then(()=>{
        console.log("book created.");
        res.send("book created.");
    }).catch((err)=>{
        if(err){
            res.send(err);
        } 
        
    });
})
app.get("/books",(req,res)=>{
    Book.find().then((books)=>{
        console.log(books);
        //res.send(books);
        res.json(books);
    }).catch((err)=>{
        iff(err)
        throw err
    })
})
app.get("/book/:id",(req,res)=>{
    Book.findById(req.params.id).then((book)=>{
        if(book){
            res.json(book);
        } else{
           res.sendStatus(404); 
        }
       
    }).catch((err)=>{
        if(err)
       // throw err
       res.send(err)
    });
    //res.send(req.params.id+"-"+req.params.name);
});

app.delete("/book/:id",(req,res)=>{
    Book.findOneAndRemove(req.params.id).then(()=>{
     res.send("book deleted with id:");   
    }).catch(err=>{
    if(err)
    console.log("err rrrrrrrr:"+err)
    res.send("err rrrrrrrr:"+err);
    });
})

app.listen('8081',()=>{
    console.log("up and running --- This is book service.")
})
