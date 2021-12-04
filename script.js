let titles = [];
let notes = [];
let deletedTitles = [];
let deletedNotes = [];

load();
loadDeletedNotes();

function render() {


    document.getElementById("list").innerHTML = "";
    for (let i = 0; i < notes.length; i++) {
        const title = titles[i];
        const note = notes[i];

        document.getElementById("list").innerHTML += `
        <div class="listitem">
            <input id="title${i}" class="savedtitlecss" value="${title}">
            <input id="note${i}" class="savednotecss" value="${note}" >
            <div class="buttons"> 
                <div class="savelistdiv" onclick="saveEdit(${i})"> 
                    <img src="./img/save.png" class=" saveimglist ">
                    <button class= "savebutton" >Speichern</button>
                </div>
                <div class="deletedivlist" onclick="deleteNote(${i})">
                    <img src="./img/trash.png" class="deleteimg">
                    <button class="deletebutton" >Löschen</button>
                </div>
            </div>
        </div>
        `
    };
}

function renderDeletedNotes() {

    document.getElementById("listDeletedNotes").innerHTML = "";
    for (let i = 0; i < deletedNotes.length; i++) {
        const deletedTitle = deletedTitles[i];
        const deletedNote = deletedNotes[i];


        document.getElementById("listDeletedNotes").innerHTML += `
        <div class="deletedListitem">
            <input id="deletedTitle${i}" class="savedtitlecss" value="${deletedTitle}">
            <input id="deletedNote${i}" class="savednotecss" value="${deletedNote}" >
            <div class="buttonsdeleted"> 
                <div class="savelistdiv" onclick="restoreNote(${i})"> 
                    <img src="./img/save.png" class="saveimgdeleted">
                    <button class= "savebuttondeleted" >Wiederherstellen</button>
                </div>
                <div class="deletedivlist" onclick="exileNote(${i})">
                    <img src="./img/trash.png" class="deleteimgdeleted">
                    <button class="deletebuttondeleted" >Endgültig Löschen</button>
                </div>
            </div>
        </div>
    `
    };
}

function saveEdit(index) {
    let editTitle = document.getElementById(`title${index}`).value;
    let editNote = document.getElementById(`note${index}`).value;

    notes[index] = editNote;
    titles[index] = editTitle;

    save();
    render();

}

function openNotes() {
    document.getElementById('title').classList.remove('hide');
    document.getElementById('saveButton').classList.remove('hide');
    document.getElementById('saveImg').classList.remove('hide');
}

function addNote(i) {
    let title = document.getElementById('title');
    let note = document.getElementById('note');

    if (!title.value && !note.value) {
        alert("Bitte eine Notiz einfügen!");
    }
    else {
        titles.push(title.value);
        notes.push(note.value);

        title.value = '';
        note.value = '';

        render();
        save();
    }

}

function restoreNote(i) {
    notes.push(deletedNotes[i]);
    titles.push(deletedTitles[i]);
    deletedNotes.splice(i, 1);
    deletedTitles.splice(i, 1);
    save();
    load();
    renderDeletedNotes();
}

function deleteNote(i) {
    deletedNotes.push(notes[i]);
    deletedTitles.push(titles[i]);
    titles.splice(i, 1);
    notes.splice(i, 1);
    render();
    save();
}

function exileNote(i) {
    deletedTitles.splice(i, 1);
    deletedNotes.splice(i, 1);
    renderDeletedNotes();
    save();
}

function exileAllNotes() {
    deletedTitles.splice(0, deletedTitles.length)
    deletedNotes.splice(0, deletedNotes.length)
    if (deletedTitles.length === 0 && deletedNotes.length === 0) {
        alert("Alle Notizen aus dem Papierkorb wurden erfolgreich gelöscht!");
    };
    save();
    renderDeletedNotes();
}

function save() {
    let titlesAsText = JSON.stringify(titles);
    localStorage.setItem('titles', titlesAsText);
    let notesAsText = JSON.stringify(notes);
    localStorage.setItem('notes', notesAsText);
    let deletedTitlesAsText = JSON.stringify(deletedTitles);
    localStorage.setItem('deletedTitles', deletedTitlesAsText);
    let deletedNotesAsText = JSON.stringify(deletedNotes);
    localStorage.setItem('deletedNotes', deletedNotesAsText);
}

function load() {
    let titlesAsText = localStorage.getItem('titles');
    let notesAsText = localStorage.getItem('notes');

    if (titlesAsText && notesAsText) {
        titles = JSON.parse(titlesAsText);
        notes = JSON.parse(notesAsText);
    }
}

function loadDeletedNotes() {
    let deletedTitlesAsText = localStorage.getItem('deletedTitles');
    let deletedNotesAsText = localStorage.getItem('deletedNotes');

    if (deletedTitlesAsText && deletedNotesAsText) {
        deletedNotes = JSON.parse(deletedNotesAsText);
        deletedTitles = JSON.parse(deletedTitlesAsText);
    }
}






