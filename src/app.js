
class App {

    constructor() {
        App.addTodoEvents();
    }

    static addTodoEvents() {
        document.querySelector('.create-todo').addEventListener('submit', App.createNewTodo);
    }

    static createNewTodo(evt) {
        evt.preventDefault();
        let text = this.querySelector('[name="text"]').value;
        let due = this.querySelector('[name="due"]').value;
        let todo = new Todo(text, due);
        document.querySelector('.items').innerHTML += todo.render();
    }

}

// Initialize the whole application
new App();
