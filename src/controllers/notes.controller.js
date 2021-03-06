const notesCtrl = {};
const Note = require('../models/Note');

//Add
notesCtrl.renderNoteForm = (req,res) => {
    res.render('notes/add')
}

notesCtrl.createNewNote = async (req,res) => {
    const {title, description} = req.body;
    const newNote = new Note({title, description});
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg','Note Added Successfully');
    res.redirect('/notes');
}

//List
notesCtrl.listNotes = async (req, res) => {
    const notes = await Note.find({user: req.user.id}).sort({createdAt: 'desc'});
    res.render('notes/list',{ notes });
}

//Edit
notesCtrl.editForm = async (req,res) =>{
   const note = await Note.findById(req.params.id)
   if(note.user != req.user.id) {
       req.flash('error','Not Authorized');
       return res.redirect('/notes');
   };
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
   const note = await Note.findByIdAndDelete(req.params.id);
    if(note.user != req.user.id) {
        req.flash('error','Not Authorized');
        return res.redirect('/notes');
    }
   req.flash('success_msg','Note Deleted Successfully');
   res.redirect('/notes');
}

module.exports = notesCtrl;
