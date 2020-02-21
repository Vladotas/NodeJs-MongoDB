const notesCtrl = {};
const Note = require('../models/Note');

//Add
notesCtrl.renderNoteForm = (req,res) => {
    res.render('notes/add')
}

notesCtrl.createNewNote = async (req,res) => {
    const {title, description} = req.body;
    const newNote = new Note({title, description});
    await newNote.save();
    req.flash('success_msg','Note Added Successfully');
    res.redirect('/notes');
}

//List
notesCtrl.listNotes = async (req, res) => {
    const notes = await Note.find();
    res.render('notes/list',{ notes });
}

//Edit
notesCtrl.editForm = async (req,res) =>{
   const note = await Note.findById(req.params.id)
    res.render('notes/edit', { note });
}

notesCtrl.updateNote = async (req,res) => {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title , description});
    req.flash('success_msg','Note Updated Seccessfully');
    res.redirect('/notes');
}

//Delete
notesCtrl.deleteNote = async (req,res) => {
   await Note.findByIdAndDelete(req.params.id);
   req.flash('success_msg','Note Deleted Successfully');
   res.redirect('/notes');
}

module.exports = notesCtrl;
