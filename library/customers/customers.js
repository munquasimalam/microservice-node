const express =require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoose = require("mongoose");
mongoose.connect("mongodb://alam:alam@mmdb-shard-00-00-u9j2v.mongodb.net:27017,mmdb-shard-00-01-u9j2v.mongodb.net:27017,mmdb-shard-00-02-u9j2v.mongodb.net:27017/customers?ssl=true&replicaSet=mmdb-shard-0&authSource=admin&retryWrites=true&w=majority",()=>{
    console.log("connected with customer db.")
})
// load our model
require("./customer")
const Customer = mongoose.model("Customer");
app.get('/',(req,res)=>{
    res.send("this is customer service.");
});
app.post('/customer',(req,res)=>{
    console.log(req.body)
    var newCustomer = {
        name:req.body.name,
        age:req.body.age,
        address:req.body.address
    }
    var customer = new Customer(newCustomer);
    customer.save().then(()=>{
        console.log("customer created.");
        res.send("customer created.");
    }).catch((err)=>{
        if(err){
            res.send(err);
        } 
    });
})
app.get("/customers",(req,res)=>{
    Customer.find().then((customers)=>{
     //res.json(customers);
     console.log(customers);
     res.send(customers);
    }).catch(err=>{
        if(err)
        throw err
    })
})

app.get("/customer/:id",(req,res)=>{
    Customer.findById(req.params.id).then((customer)=>{
        if(customer){
            res.json(customer);
        } else{
           res.sendStatus(404); 
        }
       
    }).catch((err)=>{
        if(err)
       res.send(err)
    });
    //res.send(req.params.id+"-"+req.params.name);
});

app.delete("/customer/:id",(req,res)=>{
    Customer.findOneAndRemove(req.params.id).then(()=>{
     res.send("customer deleted with id:");   
    }).catch(err=>{
    if(err)
    res.send(err);
    });
})



app.listen("9082",()=>{
    console.log("up and running customers service.");
})