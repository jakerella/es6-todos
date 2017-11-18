
class App {
    constructor() {
        document.querySelector('.create-todo')
            .addEventListener('submit', (eventObj) => {
                eventObj.preventDefault();
                App.createTodo();
            });

        document.querySelector('ul')
            .addEventListener('click', eventObj => console.log(eventObj.target));

        Resource.get(null, 'Todo');


        {
            // console.log(i);
            let i = 7;
            console.log(i);
        }
        console.log(i);

        for (let i = 0; i < 10; i++) {
            console.log(i);
        }
        console.log('outside the for', i);
    }

    static createTodo(eventObj) {
        const item = new Todo(document.querySelector('.new-todo').value);

        item.save();
        document.querySelector('.items')
            .innerHTML += item.render();
    }
}


class Resource {
    constructor() {
        this.id = null;
    }

    save() {
        this.validate();

        console.log(this.constructor.name, ' item saved!');
    }

    validate() {
        if (this.id !== null && typeof(this.id) !== 'number') {
            throw new Error('Invalid ID present on resource');
        }
    }

    static get(id, resourceType) {
        if (!id) {
            console.log('retrieving all', resourceType);
        } else {
            console.log('retrieving resource with ID=', id);
        }
    }
}


class Todo extends Resource {

    constructor(text = 'stuff', dueDate = Date.now() + 86400000) {
        super();

        this.text = text;
        this.isComplete = false;
        this._dueDate = dueDate;
    }

    get dueDate() {
        return (new Date(this._dueDate)).toLocaleString();
    }
    set dueDate(value) {
        this._dueDate = (new Date(value)).getTime();
    }

    render() {
        const { id, text, dueDate, isComplete } = this;

        return `
        <li data-id="${id}">
            <p>${text}</p>
            <time>${dueDate}</time>
            <span>${(isComplete) ? 'done' : 'todo'}</span>
        </li>`;
    }

    validate() {
        super.validate();

        if (!this.text || !this._dueDate || typeof(this.isComplete) !== 'boolean') {
            throw new Error('Invalid Todo data');
        }
    }

}

new App();
