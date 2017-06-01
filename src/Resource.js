
/**
 * While looking through this file, you will see a number of single-line comments
 * that begin with "TOPIC". These are to help you identify some of the places the
 * new ES6 features are coming into play. Thesae comments will always include a
 * link to a useful blog post or piece of documentation on the topic.
 */

/**
 * The base class for doing CRUD actions on any API resource in this system.
 * Note that you probably shouldn't be creating these resources directly, but
 * rather their various subclasses.
 *
 * @type {Resource}
 */


// TOPIC: ES6 Classes (http://2ality.com/2015/02/es6-classes-final.html)
window.Resource = class Resource {

    // TOPIC: ES6 Classes (Constructors) (http://2ality.com/2015/02/es6-classes-final.html)
    constructor() {
        this._resourceName = 'Resource';
        this._id = null;
    }

    // TOPIC: ES6 Classes (Getters and Setters) (http://2ality.com/2015/02/es6-classes-final.html)
    get id() {
        return this._id;
    }
    set id(noop) {} // this is a no-op function, it prevents people from setting the ID property directly

    get createDate() {
        return new Date(this._createDate);
    }
    set createDate(noop) {} // this is a no-op function, it prevents people from setting the createDate property directly

    save() {
        // TOPIC: Promises (https://developers.google.com/web/fundamentals/getting-started/primers/promises)
        // TOPIC: Arrow functions (no context override) (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
        return new Promise((resolve, reject) => {

            // TOPIC: Block-scoped variable declarations (http://wesbos.com/let-vs-const/)
            let resources = Resource.getCollection(this._resourceName);

            if (!this._id) {
                this._id = Math.floor(Math.random() * 99999999);
                this._createDate = Date.now();
                if (resources[this._id]) {

                    // TOPIC: String templates (http://2ality.com/2015/01/es6-strings.html)
                    return reject(new Error(`Oops, you are creating ${this._resourceName}s too quickly!`));
                }
            }

            let error = this.validate();
            if (error) {
                return reject(error);
            }

            resources[this._id] = this.serialize();

            localStorage.setItem(this._resourceName, JSON.stringify(resources));
            resolve(this);
        });
    }

    validate() {
        if (!this._id) {
            return new Error('Unable to save without ID');
        }
        if (!this._createDate) {
            return new Error('Unable to save without createDate');
        }
    }

    // TOPIC: Default function parameters (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
    static get(id = null, resourceName = 'Resource') {
        return new Promise((resolve, reject) => {
            let resources = Resource.getCollection(resourceName);
            if (id) {
                resolve(Resource.deserialize(resources[id], resourceName));
            }

            // TOPIC: Arrow functions (implicit return) (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
            resolve( Object.keys(resources).map(id => Resource.deserialize(resources[id], resourceName)) );
        });
    }

    destroy() {
        return new Promise((resolve, reject) => {
            if (!this._id) {
                return reject(new Error(`Unable to destroy a ${this._resourceName} without an ID!`));
            }

            let resources = Resource.getCollection(this._resourceName);
            let resource = resources[this._id];
            if (resources[this._id]) {
                resources[this._id] = null;
            }
            localStorage.setItem(this._resourceName, JSON.stringify(resources));
            resolve(resource);
        });
    }

    static getCollection(resourceName = 'Resource') {
        let resources = JSON.parse(localStorage.getItem(resourceName));
        if (!resources) {
            resources = {};
        }
        return resources;
    }

    static deserialize(data = null, resourceName = 'Resource') {
        if (!data) {
            return null;
        }
        let resource = new window[resourceName]();

        // TOPIC: Object property assignment (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
        Object.assign(resource, data);

        resource._id = data.id;
        resource._createDate = resource.createDate;
        return resource;
    }

    serialize() {
        return { id: this._id, createDate: this._createDate };
    }

}
