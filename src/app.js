
class App {

    constructor() {
        App.addTodoEvents();
        App.getAllTodos();
    }

    static addTodoEvents() {
        document.querySelector('.create-todo').addEventListener('submit', App.createNewTodo);
        document.querySelector('.items').addEventListener('click', App.handleButtonClick);
    }

    static createNewTodo(evt) {
        evt.preventDefault();
        let text = this.querySelector('[name="text"]').value;
        let due = this.querySelector('[name="due"]').value;
        let todo = new Todo(text, due);
        todo.save()
            .then(item => {
                document.querySelector('.items').innerHTML += item.render();
            })
            .catch(error => console.warn(error));
    }

    static getAllTodos() {
        Todo.get()
            .then(items => {
                document.querySelector('.items').innerHTML = items.map(item => item.render()).join('');
            })
            .catch(error => console.warn(error));
    }

    static handleButtonClick(evt) {
        if (!evt.target.matches('button')) { return true; }

        let type;
        if (evt.target.matches('.delete')) { type = 'delete'; }
        if (evt.target.matches('.check')) { type = 'check'; }

        Todo.get(evt.target.parentNode.getAttribute('data-id'))
            .then(item => {
                if (type === 'delete') {
                    return item.destroy();
                } else if (type === 'check') {
                    item.isComplete = !item.isComplete;
                    return item.save();
                }
            })
            .then(item => {
                const elem = document.querySelector(`[data-id="${item.id}"]`);
                if (type === 'delete') {
                    elem.parentNode.removeChild(elem);
                } else if (type === 'check') {
                    if (elem.classList.contains('completed')) {
                        elem.classList.remove('completed');
                    } else {
                        elem.classList.add('completed');
                    }
                }
            })
            .catch(error => console.warn(error));
    }

}

// Initialize the whole application
new App();
