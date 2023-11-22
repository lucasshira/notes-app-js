const addBtn = document.getElementById('add');
const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
    notes.forEach(note => {
        addNewNote(note);
    });
}

addBtn.addEventListener('click', () => {
    addNewNote(); 
});

function addNewNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
    <div class="notes">
    <div class="tools">
    <input class="title" placeholder="Adicione um titulo a nota"></>
    <button class="edit-btn"><i class="fa-solid fa-edit"></i></button>
            <button class="delete-btn"><i class="fa-solid fa-trash-alt"></i></button>
        </div>

            <textarea></textarea>
    </div>`;

    const editBtn = note.querySelector('.edit-btn');
    const deleteBtn = note.querySelector('.delete-btn');

    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    textArea.value = text;

    editBtn.addEventListener('click', () => {
        const selectionStart = textArea.selectionStart;
        const selectionEnd = textArea.selectionEnd;
        const selectedText = textArea.value.substring(selectionStart, selectionEnd);
        const textBefore = textArea.value.substring(0, selectionStart);
        const textAfter = textArea.value.substring(selectionEnd);

        const boldText = `**${selectedText}**`;

        textArea.value = `${textBefore}${boldText}${textAfter}`;
        textArea.focus();
    });

    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLS();
    });

    textArea.addEventListener('input', (e) => {
        updateLS();
    });

    document.body.appendChild(note);
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea');

    const notes = [];

    notesText.forEach(note => {
        notes.push(note.value)
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}