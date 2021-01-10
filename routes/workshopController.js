const express = require("express");
const workshopController = express.Router();
const Workshop = require('../models/workshop');

module.exports = () => {
	workshopController.get("/", (req, res) => {});


    workshopController.get('/all',  (req,res)=>{
       Workshop.find({},(err, data)=>{
            if (err) {
                res.status = 400;
                res.json({
                    message: "error",
                    err: err
                })
            }
            res.json({
                msg: "All workshops",
                data: data,
            })
       });
       
    })

    workshopController.get('/:id',  (req,res)=>{
        Workshop.find({id : req.params.id}, (err, data)=> {
            if (err) {
                res.status = 400;
                res.json({
                    message: "error",
                    err: err
                })
            }

            res.json({
                msg: "One workshop",
                data: data,
            })
        });
    })

    workshopController.get('/business/:id',  (req,res)=>{
        Workshop.find({businessID : req.params.id}, (err, data)=>{
            if (err) {
                res.status = 400;
                res.json({
                    message: "error",
                    err: err
                })
            }

            res.json({
                msg: "Get workshops by business id",
                data: data,
            })
        });
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
                description: req.body.description,
                mentor_name : req.body.mentor_name,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                location : req.body.location,
                package_required: req.body.package_required,
                price : req.body.price,
                is_active : req.body.is_active,
                categoryID : req.body.categoryID,
                max_attendance : req.body.max_attendance,
                min_attendance : req.body.min_attendance, 
            }},
            )
            .then((data)=>{
                console.log('workshop info updated' + data);
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

