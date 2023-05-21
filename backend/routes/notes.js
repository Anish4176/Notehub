const express = require('express');
const mongoose = require('mongoose')
const route = express.Router();
const Note = require('../model/notes')
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//ROUTE-1 :fetch all notes of a user  at endpoint ( /api/notes/fetchnotes)
route.get('/fetchnotes', fetchuser, async (req, res) => {
   try {
      // fetching all notes of a user
      //while saving his/her notes we have saved a key named user to store his/her id which we are getting in req.user.id
      const notes = await Note.find({ user: req.user.id })
      res.status(200).json(notes)
   }
   catch (err) {
      console.log('there is an error in fetching all notes');
      console.log(err);
   }
});

//ROUTE-2 :Add  notes of a user  at endpoint ( /api/notes/addnotes)
route.post('/addnotes', fetchuser, [
   body('title', "Add at least 3 letters title").trim().isLength({ min: 3 }),
   body('description', "Please at least add 5 letters").trim().isLength({ min: 5 })
], async (req, res) => {
   try {

      const result = validationResult(req);
      if (result.isEmpty()) {
         //adding a note
         const notes = new Note({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
         })
         //saving the notes
         const savenotes = await notes.save();
         return res.status(200).send(savenotes);
      }
      res.json({ errors: 'Please Enter a valid value of title and description' });
   }
   catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error occurred')
   }
});

//ROUTE-3 :Updating the notes of a user at endpoint ( /api/notes/updatenotes/:id)
route.put('/updatenotes/:id', fetchuser, async (req, res) => {
   try {
       const {title, description, tag} = req.body;   //destructuring 
       const updatenotes={};
       if(title){updatenotes.title=title};
       if(description){updatenotes.description=description}
       if(tag){updatenotes.tag=tag}
       
       //finding the note which  is going to be updated
       const note=await Note.findById(req.params.id)
       if(!note){return res.status(404).send('Not Found')};
       
       //authorizing the user
       if(note.user.toString()!==req.user.id){
         return res.status(401).send('Not allowed')
       }
       
       //updating the note
       const updatenote=await Note.findByIdAndUpdate(req.params.id,{$set:updatenotes},{new:true})
       res.json(updatenote);
   }
   catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error occurred')
   }
});
//ROUTE-4 :Deleting the notes of a user at endpoint ( /api/notes/deletenotes/:id)
route.delete('/deletenotes/:id', fetchuser, async (req, res) => {
   try {
           
       //finding the note which  is going to be deleted
       const note=await Note.findById(req.params.id)
       if(!note){return res.status(404).send('Not Found')};
       
       //authorizing the user
       if(note.user.toString()!==req.user.id){
         return res.status(401).send('Not allowed')
       }
       
       //deleting the note
       const deletenote=await Note.findByIdAndDelete(req.params.id,{new:true})
       res.send(deletenote);
   }
   catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error occurred')
   }
});

module.exports = route;