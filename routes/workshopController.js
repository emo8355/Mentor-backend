const express = require("express");
const workshopController = express.Router();

const Workshop = require("../models/workshop");
const ticket = require("../models/ticket");
const Mongoose = require("mongoose");

const AWS = require("../middleware/imageUpload");


module.exports = () => {
	workshopController.get("/", (req, res) => {});

	workshopController.get("/all", (req, res) => {
		const dbWorkshops = Workshop.find();
		res.json({
			msg: "All workshops",
			data: dbWorkshops,
		});
	});

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
        console.log(req.params.id);
        Workshop.find({_id : req.params.id}, (err, data)=> {
            console.log(data)
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

	workshopController.post("/update-info/:id", (req, res) => {
		Workshop.updateOne(
			{ _id: req.params.id },
			{
				$set: {
					name: req.body.name,
				},
			}
		)
			.then((data) => {
				console.log("attendance updated" + data);
			})
			.catch((err) => {
				console.log(err);
			});
	});

	workshopController.post("/update-attendance/:id/guest/:name", (req, res) => {
		Workshop.updateOne(
			{ _id: req.params.id },
			{ $push: { curr_attendance: req.params.name } }
		)
			.then((data) => {
				console.log("attendance updated" + data);
			})
			.catch((err) => {
				console.log(err);
			});
	});

	workshopController.post("/delete/:id", (req, res) => {
		Workshop.deleteOne({ _id: req.params.id }, (err) => {
			if (err) {
				res.status = 400;
				res.json({
					message: "Workshop could not be deleted",
					err: err,
				});
			}

			res.json({
				message: "Workshop has been deleted",
			});
		});
	});

    workshopController.post('/update-info/:id',  (req,res)=>{
        Workshop.updateOne(
            {_id: req.params.id},
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

   
    workshopController.post(AWS.upload.single("pic"), (req, res) => {
        const infoBody = { ...req.body };
        const file = req.file;
        let img_url = `https://d39wlfkh0mxxlz.cloudfront.net/${file.originalname}`;
        console.log(img_url);
        console.log(infoBody);
        res.send("ojbk");
    });
    

    workshopController.post('/update-attendance/:id/guest/:guestid',  (req,res)=>{
       Workshop.updateOne(
        {_id: req.params.id},
        {$push:{curr_attendance: req.params.guestid}},
        )
        .then((data)=>{
            console.log('attendance updated' + data);
        })
        .catch(err=>{
            console.log(err)
        })
    })

    workshopController.post('/delete/:id',  (req,res)=>{
       Workshop.deleteOne({_id: req.params.id}, (err)=>{
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
  
  
	workshopController.post("/:id/createTicket", (req, res) => {
		const ticketInfo = req.body;
		const workshopId = req.params.id;
		const newTicket = new ticket({
			workshopID: Mongoose.Types.ObjectId(workshopId),
			name: ticketInfo.name,
			email: ticketInfo.email,
			phone_number:
				ticketInfo.phone_number.trim().length > 0
					? ticketInfo.phone_number
					: null,
			numberOfPeople: ticketInfo.people,
		});

		newTicket.save((err, doc) => {
			if (err) {
				return res.send(err);
			}

			Workshop.updateOne(
				{ _id: req.params.id },
				{ $push: { curr_attendance: doc.id } },
				{ $inc: { numberOfPeople: ticketInfo.people } }
			)
				.then((data) => {
					console.log("number of attendance updated" + data);
				})
				.catch((err) => {
					console.log(err);
				});

			return res.send(doc.id);
		});
	});

	return workshopController;
};
