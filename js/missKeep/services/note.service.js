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
    changeBkgColor,
    isPinnedNotes,
    completeTodo
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

function completeTodo(todoIdx, noteId) {
    const note = _findNote(noteId);
    const todos = note.info.todos;

    if(todos[todoIdx].doneAt === null) {
        todos[todoIdx].doneAt = Date.now();
    } else {
        todos[todoIdx].doneAt = null;
    }
    storageService.store(NOTES_KEY, notesDB);
    return Promise.resolve();
}

function updateNote(noteId, info, type) {
    const note = _findNote(noteId);
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

function isPinnedNotes() {
    return Promise.resolve(notesDB.some(note => note.isPinned));
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
    let notes = [
        {
            type: 'noteText',
            info: {
                text: 'Fullstack Me Baby!'
            },
            style: {
                backgroundColor: '#F49097'
            }
        },
        {
            type: 'noteText',
            info: {
                text: 'Real programmers count from 0'
            },
            style: {
                backgroundColor: '#9EE4DA'
            }
        },
        {
            type: 'noteText',
            isPinned: true,
            info: {
                text: '“Life is like riding a bicycle. To keep your balance, you must keep moving.” —Albert Einstein'
            },
            style: {
                backgroundColor: '#DFB2F4'
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
            type: 'noteImg',
            isPinned: true,
            info: {
                url: 'https://scontent-atl3-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/75483267_159949905230316_6047316408741273115_n.jpg?_nc_ht=scontent-atl3-1.cdninstagram.com&_nc_cat=100&_nc_ohc=Bq3vJy5D1pMAX90lcl2&oh=311633b99843425f1c87e9314f340c37&oe=5E94AD75',
                title: 'Girls building empires'
            },
            style: {
                backgroundColor: '#F49097'
            }
        },
        {
            type: 'noteImg',
            info: {
                url: 'https://ceoworld.biz/wp-content/uploads/2019/08/Maldives.jpg',
                title: 'Maldives'
            },
            style: {
                backgroundColor: '#C49E85'
            }
        },
        {
            type: 'noteImg',
            info: {
                url: 'https://d1doqjmisr497k.cloudfront.net/-/media/mccormick-us/recipes/mccormick/u/800/unicorn_cupcakes_800x800.jpg',
                title: 'Cupcake'
            },
            style: {
                backgroundColor: '#BEA7E5'
            }
        },
        {
            type: 'noteTodos',
            info: {
                label: 'How was it:',
                todos: [{ text: 'Do that', doneAt: null }, { text: 'Do this', doneAt: null }]
            },
            style: {
                backgroundColor: '#9EE4DA'
            }
        },
        {
            type: 'noteTodos',
            info: {
                label: '',
                todos: [{ text: 'Eat()', doneAt: null }, { text: 'Sleep()', doneAt: null },{ text: 'Code()', doneAt: null },{ text: 'Repeat()', doneAt: null }]
            },
            style: {
                backgroundColor: '#DFB2F4'
            }
        },
        {
            type: 'noteTodos',
            isPinned: true,
            info: {
                label: 'Shopping list:',
                todos: [{ text: '1 Milk', doneAt: null }, { text: '2 Bread', doneAt: null },{ text: '1 Butter', doneAt: null },{ text: '1 Biscuite', doneAt: null }]
            },
            style: {
                backgroundColor: '#FFB17A'
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
        },
        {
            type: 'noteVideo',
            info: {
                urlYouTubeId: 'zY-ugO6SCBQ',
                title: 'My video'
            },
            style: {
                backgroundColor: '#F5E960'
            }
        }
    ].map(_createNote);

    return notes;
}

function _createNote(noteDetailes) {
    return {
        id: utilService.makeId(),
        type: noteDetailes.type,
        isPinned: noteDetailes.isPinned || false,
        info: noteDetailes.info,
        style: noteDetailes.style || { backgroundColor: '#80ED99' }
    }
}