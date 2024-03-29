const express = require("express");
const app = express();
const mongoose = require("mongoose");
const CrimeModel = require('./models/crimes');

const cors = require("cors");
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://user1:uh5iv4-*BUxF$rN@cluster0.m0nko.mongodb.net/CrimeApp?retryWrites=true&w=majority");

app.get("/Map0", (req, res) => {
    let id = req.query["_id"];
    CrimeModel.find({_id: id}, (err, result) => {
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    })
})

app.get("/Map", (req, res) => {
    let locality = req.query["Locality"];
    CrimeModel.find({Locality: locality}, (err, result) => {
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    })
})

app.post("/create", async (req, res) => {
    const crime = req.body;
    const newCrime = new CrimeModel(crime);
    await newCrime.save();

    res.json(crime);
})

app.listen(3001, () => {
    console.log("Server runs");
})