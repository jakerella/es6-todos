
/**
 * While looking through this file, you will see a number of single-line comments
 * that begin with "TOPIC". These are to help you identify some of the places the
 * new ES6 features are coming into play. Thesae comments will always include a
 * link to a useful blog post or piece of documentation on the topic.
 */

/**
 * The base Application for our TODOs. This would be your primary router or
 * initializer, depending on how you want to look at it. Everything in here
 * is `static` - an indication that it should only be used as a Singleton.
 * You would "initialize" your application simply by creating a `new App()`
 * You can see this at the bottom of this file (classes are NOT hoisted).
 *
 * @type {App}
 */
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
            .catch(error => console.error(error));
    }

    static addTodoEvents() {
        // Set up creation of new todos on form submit
        $('.create-todo')[0].on('submit', App.createNewTodo);
        $('.items')[0].on('click', App.handleItemButton);
    }

    static createNewTodo(evt) {
        evt.preventDefault();
        let text = this.find('[name="text"]')[0].value;
        let due = this.find('[name="due"]')[0].value;
        let todo = new Todo(text, due);
        todo.save()
            .then(item => $('.items')[0].innerHTML += item.render() )
            .catch(error => console.error(error));
    }

    static handleItemButton(evt) {
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
