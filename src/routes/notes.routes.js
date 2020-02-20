const { Router } = require('express');
const router = Router();

const { renderNoteForm, 
        createNewNote, 
        listNotes, 
        editForm, 
        updateNote, 
        deleteNote 
     } = require('../controllers/notes.controller');

// New Note
router.get('/notes/add', renderNoteForm);

router.post('/notes/add', createNewNote);

// Get All Note
router.get('/notes', listNotes);

// Edit Note
router.get('/notes/edit/:id', editForm)

router.put('/notes/edit/:id', updateNote)

//Delete
router.delete('/notes/delete/:id', deleteNote)

module.exports = router;