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
    changePinnedStatus,
    updateNote,
    changeBkgColor
}

function query(filterBy) {
    var notes = storageService.load(NOTES_KEY);

    if (!notes || notes.length === 0) {
        notes = _createNotes();
        storageService.store(NOTES_KEY, notes);
    }

    notesDB = notes;

    if (filterBy) {
        const filter = filterBy.toLowerCase();
        notes = _filterNotes(filter);
    }

    return Promise.resolve(notes);
}

function updateNote(noteId, info, type) {
    var note = _findNote(noteId);
    if (type === 'noteText') {
        note.info.text = info;
    } else if (type === 'noteImg') {
        note.info.url = info;
    } else if (type === 'noteVideo') {
        note.info.urlYouTubeId = info;
    } else if (type === 'noteTodos') {
        note.info.todos = info
    }
    storageService.store(NOTES_KEY, notesDB);
}

function addNote(note) {
    const newNote = _createNote(note);

    notesDB.unshift(newNote);
    storageService.store(NOTES_KEY, notesDB);

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
    storageService.store(NOTES_KEY, notesDB);
    return Promise.resolve();
}

function changeBkgColor(newColor, id) {
    let note = _findNote(id);

    note.style.backgroundColor = newColor;

    storageService.store(NOTES_KEY, notesDB);

    return Promise.resolve(notesDB);
}

function _filterNotes(filterBy) {
    if (filterBy === 'list') {
        return Promise.resolve(_filter('noteTodos'));
    } else if (filterBy === 'text') {
        return Promise.resolve(_filter('noteText'));
    } else if (filterBy === 'image') {
        return Promise.resolve(_filter('noteImg'));
    } else if (filterBy === 'video') {
        return Promise.resolve(_filter('noteVideo'));
    } else if (filterBy === 'all') {
        return Promise.resolve(notesDB);
    } else {
        return Promise.resolve(_filterByText(filterBy));
    }
}

function _filterByText(filterBy) {
    return notesDB.filter(note => {
        if (note.type === 'noteText') {
            const text = note.info.text.toLowerCase();
            return text.includes(filterBy);
        } else if (note.type === 'noteImg') {
            const imgUrl = note.info.url.toLowerCase();
            return imgUrl.includes(filterBy);
        } else if (note.type === 'noteVideo') {
            const videoUrl = note.info.urlYouTubeId.toLowerCase();
            return videoUrl.includes(filterBy) ||
                'https://www.youtube.com/embed/'.includes(filterBy)
        } else {
            return _checkIfFilterIncludsInList(filterBy, note);
        }
    });
}

function _checkIfFilterIncludsInList(filterBy, note) {
    let res = false;

    note.info.todos.forEach(todo => {
        const todoText = todo.text.toLowerCase();
        if (todoText.includes(filterBy)) {
            res = true;
        }
    });

    return res;
}

function _filter(type) {
    return notesDB.filter(note => note.type === type);
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
                backgroundColor: '#F49097'
            }
        },
        {
            type: 'noteImg',
            info: {
                url: 'https://specials-images.forbesimg.com/imageserve/5db4c7b464b49a0007e9dfac/960x0.jpg?fit=scale',
                title: "Me playing Mi"
            },
            style: {
                backgroundColor: '#F5E960'
            }
        },
        {
            type: 'noteTodos',
            info: {
                label: 'How was it:',
                todos: [{ text: 'Do that', doneAt: null }, { text: 'Do this', doneAt: 187111111 }]
            },
            style: {
                backgroundColor: '#9EE4DA'
            }
        },
        {
            type: 'noteVideo',
            info: {
                urlYouTubeId: 'tgbNymZ7vqY',
                title: 'My video'
            },
            style: {
                backgroundColor: '#80ED99'
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