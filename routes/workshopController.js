const express = require("express");
const workshopController = express.Router();
const Workshop = require("../models/workshop");
const ticket = require("../models/ticket");
const Mongoose = require("mongoose");

module.exports = () => {
	workshopController.get("/", (req, res) => {});

	workshopController.get("/all", (req, res) => {
		const dbWorkshops = Workshop.find();
		res.json({
			msg: "All workshops",
			data: dbWorkshops,
		});
	});

	workshopController.get("/:id", (req, res) => {
		const dbWorkshop = Workshop.find({ _id: req.params.id });
		res.json({
			msg: "One workshop",
			data: dbWorkshop,
		});
	});

	workshopController.get("/business/:id", (req, res) => {
		const dbWorkshops = Workshop.find({ businessID: req.params.id });
		res.json({
			msg: "Get workshops by business id",
			data: dbWorkshops,
		});
	});

	workshopController.post("/create", (req, res) => {
		const newWorkshop = new Workshop(req.body);
		newWorkshop.save((err) => {
			if (err) {
				res.status(400);
				res.json({
					message: "An error occured",
					error: err,
				});
			} else {
				res.status(200);
				res.json({
					message: "new workshop created",
				});
			}
		});
	});

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
