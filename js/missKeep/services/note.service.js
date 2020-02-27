import { storageService } from '../../mainApp/services/storage.service.js';
import { utilService } from '../../mainApp/services/util.service.js';

const NOTES_KEY = 'notes';
var notesDB = [];

export const noteService = {
    query,
    getNotebyid,
    getNotes,
    removeNote,
    addNote,
    changePinnedStatus
}

function query() {
    var notes = storageService.load(NOTES_KEY);

    if (!notes || notes.length === 0) {
        notes = _createNotes();
        storageService.store(NOTES_KEY, notes);
    }
    notesDB = notes;

    // let sortedNotes = filterNotes(NoteType);
    // return Promise.resolve(sortedEmails);

    return Promise.resolve(notesDB);
}

function addNote(note) {
    const newNote = _createNote(note);

    notesDB.unshift(newNote);
    storageService.store(NOTES_KEY, notes);

    return Promise.resolve();
}

function removeNote(noteId) {
    const noteIdx = notesDB.findIndex(note => note.id === noteId);

    notesDB.splice(noteIdx, 1);

    storageService.store(NOTES_KEY, notesDB);

    return Promise.resolve();
}

function getNotebyid(noteId) {
    const note = notesDB.find(note => note.id === noteId);

    return Promise.resolve(note);
}

function getNotes() {
    return Promise.resolve(notesDB);
}

function changePinnedStatus(noteId) {
    let note = _findNote(noteId);

    note.isPinned = !note.isPinned;

    return Promise.resolve();
}

function _findNote(noteId) {
    return notesDB.find(note => note.id === noteId);
}

function _createNotes() {
    let notes = [{
            type: 'noteText',
            info: {
                text: 'Fullstack Me Baby!'
            },
            style: {
                backgroundColor: '#a2b9bc'
            }
        },
        {
            type: 'noteImg',
            info: {
                url: 'https://specials-images.forbesimg.com/imageserve/5db4c7b464b49a0007e9dfac/960x0.jpg?fit=scale',
                title: "Me playing Mi"
            },
            style: {
                backgroundColor: '#a2b9bc'
            }
        },
        {
            type: 'noteTodos',
            info: {
                label: 'How was it:',
                todos: [{ text: 'Do that', doneAt: null }, { text: 'Do this', doneAt: 187111111 }]
            },
            style: {
                backgroundColor: '#a2b9bc'
            }
        },
        {
            type: 'noteVideo',
            info: {
                urlYouTubeId: 'tgbNymZ7vqY',
                title: 'My video'
            },
            style: {
                backgroundColor: '#a2b9bc'
            }
        }
    ].map(_createNote);

    return notes;
}

function _createNote(noteDetailes) {
    return {
        id: utilService.makeId(),
        type: noteDetailes.type,
        isPinned: false,
        info: noteDetailes.info,
        style: noteDetailes.style
    }
}