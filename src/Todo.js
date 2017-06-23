
window.Todo = class Todo {

    constructor(text = 'task', dueDate) {
        this.id = Date.now();
        this.text = text;
        this.isComplete = false;

        let dueDateTs = (new Date(dueDate)).getTime()
        if (Number.isNaN(dueDateTs)) {
            this._dueDate = Date.now() + 86400000; // default to tomorrow
        } else {
            this._dueDate = dueDateTs;
        }
    }

    get dueDate() {
        let dateFormatter = new Intl.DateTimeFormat('en-US');
        return dateFormatter.format(new Date(this._dueDate));
    }
    set dueDate(value) {
        if (typeof(value) === 'number' && value > -1) {
            this._dueDate = value;
        } else {
            let dueDate = new Date(value);
            if (!Number.isNaN(dueDate.getTime())) {
                this._dueDate = dueDate.getTime();
            }
        }
    }

    validate() {
        if (!this.text) {
            return new Error('Unable to save Todo without text');
        }
        if (!this.dueDate) {
            return new Error('Unable to save Todo without due date');
        }
        if (typeof(this.isComplete) !== 'boolean') {
            return new Error('Unable to save Todo without isComplete switch');
        }
    }

    render() {
        let { id, isComplete, text, dueDate } = this;

        return `<li class='${ (isComplete) ? "completed" : "" }' data-id='${id}'>
            <button class='check'></button>
            <button class='delete'>✗</button>
            <p>${text}</p>
            <time>${dueDate}</time>
        </li>`;
    }

};
