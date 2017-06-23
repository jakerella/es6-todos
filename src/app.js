
class App {

    constructor() {
        App.addTodoEvents();
        App.getAllTodos();
    }

    static addTodoEvents() {
        document.querySelector('.create-todo').addEventListener('submit', App.createNewTodo);
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

}

// Initialize the whole application
new App();
