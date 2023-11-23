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

        <div class="date"></div>

        <button class="delete-btn"><i class="fa-solid fa-trash-alt"></i></button>

        </div>

        <textarea></textarea>
    </div>`;

    const date = note.querySelector('.date');
    const deleteBtn = note.querySelector('.delete-btn');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    textArea.value = text;

    const currentDate = new Date();
    const diaAtual = currentDate.getDate();
    const mesAtual = currentDate.getMonth() + 1;
    const anoAtual = currentDate.getFullYear();

    date.textContent = `${diaAtual}/${mesAtual}/${anoAtual}`;

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