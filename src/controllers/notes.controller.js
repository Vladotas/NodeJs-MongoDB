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

notesCtrl.updateNote = (req,res) => {
    res.send('Aca se actualiza breo');
}

//Delete
notesCtrl.deleteNote = async (req,res) => {
   await Note.findByIdAndDelete(req.params.id);
   res.redirect('/notes');
}

module.exports = notesCtrl;
