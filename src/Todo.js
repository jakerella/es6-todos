
/**
 * While looking through this file, you will see a number of single-line comments
 * that begin with "TOPIC". These are to help you identify some of the places the
 * new ES6 features are coming into play. Thesae comments will always include a
 * link to a useful blog post or piece of documentation on the topic.
 */

/**
 * This is the primary resource for this system. It allows users to create
 * simple TODO items and store them using the base functionality created in
 * the Resource class. Refer to that super class for most functions.
 *
 * @type {Todo}
 */

// TOPIC: ES6 Classes (Subclasses) (http://2ality.com/2015/02/es6-classes-final.html)
window.Todo = class Todo extends Resource {

    constructor(text = '', dueDate) {
        // TOPIC: ES6 Classes (Calling super constructor) (http://2ality.com/2015/02/es6-classes-final.html)
        super();

        this.text = text;
        this.isComplete = false;

        const tzOffset = (new Date()).getTimezoneOffset() * 60 * 1000;
        const dueDateTs = (new Date(dueDate)).getTime() + tzOffset;

        // TOPIC: Number type checking (http://es6-features.org/#NumberTypeChecking)
        if (Number.isNaN(dueDateTs)) {
            this._dueDate = Date.now() + 86400000; // default to tomorrow
        } else {
            this._dueDate = dueDateTs;
        }
    }

    get dueDate() {
        // TOPIC: Internationalization (dates) (http://es6-features.org/#DateTimeFormatting)
        const dateFormatter = new Intl.DateTimeFormat('en-US');
        return dateFormatter.format(new Date(this._dueDate));
    }
    set dueDate(value) {
        if (typeof(value) === 'number') {
            this._dueDate = value;
        } else {
            const dueDate = new Date(value);
            if (Number.isNaN(dueDate.getTime())) {
                throw new Error('Due date must be a valid date or timestamp.');
            }
            const tzOffset = (new Date()).getTimezoneOffset() * 60 * 1000;
            this._dueDate = dueDate.getTime() + tzOffset;
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
        //TOPIC: Object destructuring (https://ponyfoo.com/articles/es6-destructuring-in-depth)
        const { id, isComplete, text, dueDate } = this;

        // TOPIC: String templates (http://2ality.com/2015/01/es6-strings.html)
        return `<li class='${ (isComplete) ? "completed" : "" }' data-id='${id}'>
            <button class='check'></button>
            <button class='delete'>✗</button>
            <p>${text}</p>
            <time>${dueDate}</time>
        </li>`;
    }

    serialize() {
        // TOPIC: ES6 Classes (Calling super methods) (http://2ality.com/2015/02/es6-classes-final.html)
        const data = super.serialize();

        //TOPIC: Object destructuring (https://ponyfoo.com/articles/es6-destructuring-in-depth)
        const { text, isComplete, dueDate } = this;

        // TOPIC: Object literal shorthands (http://www.benmvp.com/learning-es6-enhanced-object-literals/)
        Object.assign( data, { text, isComplete, dueDate } );

        return data;
    }

    static get(id = null) {
        // TOPIC: ES6 Classes (Super calls to static parent methods) (http://2ality.com/2015/02/es6-classes-final.html)
        return super.get(id, 'Todo');
    }

    // TOPIC: rest parameter (http://es6-features.org/#RestParameter)
    static destroyMultiple(...ids) {
        return new Promise((resolve, reject) => {
            // TOPIC: Promises (all method, chaining) (https://developers.google.com/web/fundamentals/getting-started/primers/promises)
            Promise.all(ids.map((id) => Todo.get(id)))
                .then((items) => {
                    return items.map((item) => item.destroy());
                })
                .then((promises) => {
                    return Promise.all(promises);
                })
                .then((items) => resolve(items[0]))
                .catch(reject);
        });
    }

};
