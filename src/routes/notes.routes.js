const { Router } = require('express');
const router = Router();

const { renderNoteForm, 
        createNewNote, 
        listNotes, 
        editForm, 
        updateNote, 
        deleteNote 
     } = require('../controllers/notes.controller');

const {isAuthenticated} = require('../helpers/auth')

// New Note
router.get('/notes/add',isAuthenticated, renderNoteForm);

router.post('/notes/add', isAuthenticated,createNewNote);

// Get All Note
router.get('/notes', isAuthenticated,listNotes);

// Edit Note
router.get('/notes/edit/:id',isAuthenticated, editForm)

router.put('/notes/edit/:id', isAuthenticated,updateNote)

//Delete
router.delete('/notes/delete/:id', isAuthenticated, deleteNote)

module.exports = router;