
window.Todo = class Todo extends Resource {

    constructor(text = '', dueDate) {
        super();
        this._resourceName = 'Todo';

        this.text = text;

        let dueDateTs = (new Date(dueDate)).getTime();
        if (Number.isNaN(dueDateTs)) {
            this.dueDate = Date.now() + 86400000; // default to tomorrow
        } else {
            this.dueDate = dueDateTs;
        }
    }

    validate() {
        let error = super.validate();
        if (error) {
            return error;
        }
        if (!this.text) {
            return new Error('Unable to save Todo without text');
        }
        if (!this.dueDate) {
            return new Error('Unable to save Todo without due date');
        }
    }

    serialize() {
        let data = super.serialize();
        data.text = this.text;
        data.dueDate = this.dueDate;
        return data;
    }

    static get(id = null) {
        return super.get(id, 'Todo');
    }

};
