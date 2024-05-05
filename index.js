const router = require('express').Router();
const { readDB, addNote, removeNote } = require('../../helpers/fetchActions.js')

router.get('/notes/', (req, res) => {
    readDB.then(notesArray => {
        res.json(notesArray);
    })
    .catch((err) => {
        console.error(err)
        res.json('Unable to read stored notes')
    }
    )
});

router.post('/notes/', (req, res) => {
    const { title, text } = req.body;
    const newNote = { title, text };
    readDB
    .then(notesArray => {
        const result = addNote(newNote, notesArray);
        result
        .then(res.json(`New note '${newNote.title}' successfully saved.`))
    })
    .catch((err) => {
        console.error('Unable to save note.');
        res.json('Unable to save note.');
    })
});

router.delete('/notes/:id', (req, res) => {
    const noteID = req.params.id;
    readDB
    .then(notesArray => {
        const result = removeNote(noteID, notesArray);
        result
        .then(res.json(`Note has been deleted.`));
    })
    .catch((err) => {
        console.error('Unable to delete note.');
        res.json('Unable to delete note.');
    })
});

module.exports = router;