const express = require('express');
const workshopController = express.Router();
const Workshop = require('../models/workshop');

modules.export = () => {


    workshopController.get('/all',  (req,res)=>{
       
    })

    workshopController.get('/:id',  (req,res)=>{
       
    })

    workshopController.post('/create',  (req,res)=>{
       
    })

    workshopController.post('/update',  (req,res)=>{
       
    })

    workshopController.post('/delete',  (req,res)=>{
       
    })

    return workshopController; 
}