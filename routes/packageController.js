const express = require("express");
const packageController = express.Router();
const Package = require('../models/package');


module.exports = () => {
    packageController.get("/business/:id", (req, res) => {
        Package.find({businessID : req.params.id}, (err, data)=>{
            if (err) {
                res.status = 400;
                res.send(err);
            }
            res.send(data);
        })
    });

    packageController.post('/create', (req, res) => {

        const newPackage = new Package({...req.body})
        newPackage.save((err)=>{
            if (err){
                res.send(err);
            }
            res.send('new package created');
        })
    })

    packageController.post('/update/:id', (req, res) => {
       
        Package.updateOne(
            {_id: req.params.id},
            req.body, (err)=>{
                if (err) {
                    res.send(err);
                }
                res.send("package updated")
            })
        
    })

    packageController.post('/delete/:id', (req, res) => {
        Package.deleteOne({_id: req.params.id}, (err, data)=> {
            if (err)
                res.send(err);

            res.send("deleted package")
        })
    })


    return packageController;
}