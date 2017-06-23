
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
window.Resource = class Resource {
    // TOPIC: ES6 Classes (http://2ality.com/2015/02/es6-classes-final.html)

    // TOPIC: ES6 Classes (Constructors) (http://2ality.com/2015/02/es6-classes-final.html)
    constructor() { }

    save() {
        // TOPIC: Promises (https://developers.google.com/web/fundamentals/getting-started/primers/promises)
        // TOPIC: Arrow functions (no context override) (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
        return new Promise((resolve, reject) => {

            // TOPIC: Block-scoped variable declarations (http://wesbos.com/let-vs-const/)
            let resources = Resource.getCollection(this.constructor.name);

            if (!this.id) {
                this.setImmutableProps();

                if (resources[this.id]) {

                    // TOPIC: String templates (http://2ality.com/2015/01/es6-strings.html)
                    return reject(new Error(`Oops, you are creating ${this.constructor.name}s too quickly!`));
                }
            }

            let error = this.validate();
            if (error) {
                return reject(error);
            }

            resources[this.id] = this.serialize();

            localStorage.setItem(this.constructor.name, JSON.stringify(resources));
            resolve(this);
        });
    }

    setImmutableProps(id, createDate = Date.now()) {
        id = (id || (Math.floor(Math.random() * 99999999)));

        Object.defineProperty(this, 'id', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: id
        });
        Object.defineProperty(this, 'createDate', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: createDate
        });
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
            if (!this.id) {
                return reject(new Error(`Unable to destroy a ${this.constructor.name} without an ID!`));
            }

            let resources = Resource.getCollection(this.constructor.name);
            let resource = resources[this.id];
            if (resources[this.id]) {
                delete resources[this.id];
            }
            localStorage.setItem(this.constructor.name, JSON.stringify(resources));
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

        resource.setImmutableProps(data.id, data.createDate);
        return resource;
    }

    serialize() {
        return { id: this.id, createDate: this.createDate };
    }

}
