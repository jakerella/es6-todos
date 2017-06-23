
window.Resource = class Resource {

    constructor() { }

    save() {
        return new Promise((resolve, reject) => {

            let resources = Resource.getCollection(this.constructor.name);

            if (!this.id) {
                this.setImmutableProps();
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

    static getCollection(resourceName = 'Resource') {
        let resources = JSON.parse(localStorage.getItem(resourceName));
        if (!resources) {
            resources = {};
        }
        return resources;
    }

    serialize() {
        return { id: this.id, createDate: this.createDate };
    }

    static get(resourceName = 'Resource', id) {
        return new Promise((resolve, reject) => {
            let resources = Resource.getCollection(resourceName);

            if (id) {
                return resolve(Resource.deserialize(resources[id], resourceName));
            }

            resolve( Object.keys(resources).map(id => Resource.deserialize(resources[id], resourceName)) );
        });
    }

    static deserialize(data = null, resourceName = 'Resource') {
        if (!data) { return null; }

        let resource = new window[resourceName]();
        Object.assign(resource, data);

        resource.setImmutableProps(data.id, data.createDate);
        return resource;
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

}
