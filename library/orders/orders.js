const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoose = require("mongoose");
 require("./Order")
 const Order = mongoose.model("Order");
//const MongoClient = require('mongodb').MongoClient;
mongoose.connect("mongodb://md:md@mmdb-shard-00-00-u9j2v.mongodb.net:27017,mmdb-shard-00-01-u9j2v.mongodb.net:27017,mmdb-shard-00-02-u9j2v.mongodb.net:27017/orders?ssl=true&replicaSet=mmdb-shard-0&authSource=admin&retryWrites=true&w=majority",()=>{
    console.log("database connected");
});
app.get('/',(req,res)=>{
    res.send("this is ordes service.");
});
app.post('/order',(req,res)=>{
    console.log(req.body)
    var newOrder = {
        CustomerId:mongoose.Types.ObjectId(req.body.CustomerId),
        BookId:mongoose.Types.ObjectId(req.body.BookId),
        issueDate:req.body.issueDate,
        deliveryDate:req.body.deliveryDate
    }
    var order = new Order(newOrder);
    order.save().then(()=>{
        console.log("order created.");
        res.send("order created.");
    }).catch((err)=>{
        if(err){
            res.send(err);
        } 
        
    });
})
app.get("/orders",(req,res)=>{
    Order.find().then((orders)=>{
        console.log(orders);
        //res.send(books);
        res.json(orders);
    }).catch((err)=>{
        iff(err)
        throw err
    })
})
app.get("/order/:id",(req,res)=>{
    Order.findById(req.params.id).then((order)=>{
        console.log(order)
        if(order){
           //axios.get("http://localhost:8082/customer/"+order.CustomerId).then((response)=>{
            axios.get("localhost:9082/customer/5db46cc9fc62981e58e8ee4a").then((response)=>{

            
      var orderObject ={
          customerName:response.data.name,
          bookTitle:''
      }
      console.log(orderObject)
   
    //   axios.get("http://localhost:8081/book/"+order.BookId).then((response)=>{
    //     orderObject.bookTitle = response.data.title;
    //     res.json(orderObject);
    //        })
        }).catch(err=>{
            if(err)
            res.send(err);
        })
          
        } else{
           res.send("invalid order"); 
        }
       
    })
   
});

app.listen('7083',()=>{
    console.log("up and running --- This is orde service.")
})
