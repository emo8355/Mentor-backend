const express = require("express");
const workshopController = express.Router();
const Workshop = require('../models/workshop');

module.exports = () => {
	workshopController.get("/", (req, res) => {});


    workshopController.get('/all',  (req,res)=>{
       const dbWorkshops = Workshop.find();
       res.json({
           msg: "All workshops",
           data: dbWorkshops,
       })
    })

    workshopController.get('/:id',  (req,res)=>{
        const dbWorkshop = Workshop.find({id : req.params.id});
        res.json({
            msg: "One workshop",
            data: dbWorkshop,
        })
    })

    workshopController.get('/business/:id',  (req,res)=>{
        const dbWorkshops = Workshop.find({businessID : req.params.id});
        res.json({
            msg: "Get workshops by business id",
            data: dbWorkshops,
        })
    })

    workshopController.post('/create',  (req,res)=>{
       const newWorkshop = new Workshop(req.body);
       newWorkshop.save((err)=> {
           if (err) {
                res.status(400);
                res.json({
                   message: "An error occured",
                   error: err
               })
           }else{
                res.status(200);
                res.json({
                   message: "new workshop created"
               })
           }
       })
    })

    workshopController.post('/update-info/:id',  (req,res)=>{
        Workshop.updateOne(
            {id: req.params.id},
            {$set:{
                name: req.body.name,
                
            }},
            )
            .then((data)=>{
                console.log('attendance updated' + data);
            })
            .catch(err=>{
                console.log(err)
            })
    })

    workshopController.post('/update-attendance/:id/guest/:name',  (req,res)=>{
       Workshop.updateOne(
        {id: req.params.id},
        {$push:{curr_attendance: req.params.name}},
        )
        .then((data)=>{
            console.log('attendance updated' + data);
        })
        .catch(err=>{
            console.log(err)
        })
    })

    workshopController.post('/delete/:id',  (req,res)=>{
       Workshop.deleteOne({id: req.params.id}, (err)=>{
           if (err) {
               res.status = 400;
               res.json({
                   message: "Workshop could not be deleted",
                   err : err
               })
           }

           res.json({
               message: "Workshop has been deleted"
           })
       });
    })

    return workshopController; 
}

