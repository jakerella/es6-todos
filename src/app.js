
class App {
    constructor() {
        // Initialize some shortcuts a la jQuery
        App.makeDOMShortcuts();
        // Default date input to tomorrow
        $('[name="due"]')[0].valueAsDate = new Date(Date.now() + 86400000);

        App.addTodoEvents();
        App.getAllTodos();
    }

    static makeDOMShortcuts() {
        // Add some shortcuts (a la jQuery)
        window.$ = window.jQuery || document.querySelectorAll.bind(document);
        HTMLElement.prototype.find = HTMLElement.prototype.querySelectorAll;
        Node.prototype.on = Node.prototype.addEventListener;
    }

    static getAllTodos() {
        Todo.get()
            .then(items => {
                $('.items')[0].innerHTML = items.map(item => item.render()).join('');
            })
            .catch(error => alert(error));
    }

    static addTodoEvents() {
        // Set up creation of new todos on form submit
        $('.create-todo')[0].on('submit', App.createNewTodo);
    }

    static createNewTodo(evt) {
        evt.preventDefault();
        let text = this.find('[name="text"]')[0].value;
        let due = this.find('[name="due"]')[0].value;
        let todo = new Todo(text, due);
        todo.save()
            .then(item => $('.items')[0].innerHTML += item.render() )
            .catch(error => alert(error));
    }

}

// Initialize the whole application
new App();
