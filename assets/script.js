const addBtn = document.getElementById('add');
const notes = JSON.parse(localStorage.getItem('notes')) || [];

if (notes.length > 0) {
    notes.forEach(note => {
        addNewNote(note.title, note.content);
    });
} else {
    addNewNote();
}

addBtn.addEventListener('click', () => {
    addNewNote(); 
});

function addNewNote(title = '', text = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
    <div class="notes">
        <div class="tools">
            <input class="title" placeholder="Adicione um título à nota" value="${title}">

            <div class="date"></div>

            <button class="delete-btn"><i class="fa-solid fa-trash-alt"></i></button>
        </div>

        <textarea>${text}</textarea>
    </div>`;

    const date = note.querySelector('.date');
    const deleteBtn = note.querySelector('.delete-btn');
    const textArea = note.querySelector('textarea');
    const titleInput = note.querySelector('.title');

    const currentDate = new Date();
    const diaAtual = currentDate.getDate();
    const mesAtual = currentDate.getMonth() + 1;
    const anoAtual = currentDate.getFullYear();

    date.textContent = `${diaAtual}/${mesAtual}/${anoAtual}`;

    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLS();
    });

    textArea.addEventListener('input', () => {
        updateLS();
    });

    titleInput.addEventListener('input', () => {
        updateLS();
    });

    document.body.appendChild(note);
}

function updateLS() {
    const notesDivs = document.querySelectorAll('.note');

    const notes = [];

    notesDivs.forEach(noteDiv => {
        const title = noteDiv.querySelector('.title').value;
        const content = noteDiv.querySelector('textarea').value;

        notes.push({
            title,
            content
        });
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}