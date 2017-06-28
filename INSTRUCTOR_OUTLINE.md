
* Introduction
    * Brief history of JS/ES
        * JS (Eich) written for Navigator 1.0; Mocha -> LiveScript -> JS (1995)
        * "JavaScript" is trademarked by Oracle (formerly Sun); lead to JScript (IE3)
        * ES formed later to define language to allow for cross browser parity
        * ES3 (1999) -> ES4 (abandoned 2008) -> ES5 (2009) -> ES6 (2015)
        * Who? Ecma International (no longer an acronym) and TC39 committee (Eich included)
    * Overview of what ES6/ES2015 is
        * Mention future spec names (ES2016->) and philosophy
        * So why are we still discussing ES2015? Few new things in 2016
        * A spec does not mean the browser MUST implement feature, or even the same way, necessarily

* Make `Todo` class
    * Constructor
        * accept text (default string) & dueDate args
        * set id to `Date.now()` (will change later)
        * set isComplete boolean
        * make due date into timestamp and set on `_dueDateTs`
        * **discuss `let` and `const`!**
    * Due date getter/setter
        * getter: use `new Intl.DateTimeFormat('en-US')` and then `.format(new Date(this._dueDateTs))`
        * setter: check for number or create new Date()
            * discuss block scoping for `let`/`const` (use the "else" for arg check maybe?)
    * Validate method
        * only return Error (allows UI to decide what to do and not crash)
    * Render method
        * deconstruct `this` into { id, isComplete, text, dueDate }
        * use template string

* Make `App` class
    * create constructor, but discuss this as a "static" class (only static methods)
    * Add events method (submit on form)
    * create todo method
        * grab data from form inputs, `new Todo()`, innerHTML on items with `todo.render()`
    * initialize `new App()` at the bottom

> **This takes us to the `step-1` branch**

* What if we wanted to persist these todo items?
    * Might want to abstract that logic to a `Resource` class
    * allows for reuse of common logic for other objects

* Make `Resource` class
    * Empty constructor
        * Go ahead and `extend` Todo and use `super()`
    * save method
        * create promise
            * discuss fat arrow functions: no `this`, thus we can use the "old" `this` from class!
        * create `getCollection` helper (static) using `this.constructor.name`
        * set immutable props if no id
            * create method for this
            * use `Date.now()` in default fn args to show they are not simply static values
            * **don't forget to remove `id` from Todo constructor**
        * call validation
        * serialize data for resource
            * MUST WRITE Todo version AND Resource version (`super.serialize()`)
            * discuss `super` as the parent constructor, relate to prototype chain
            * discuss `Object.assign()` for merging object properties or shallow cloning
        * put items in localStorage
    * call `save()` from app.js
        * discuss Promise handlers (then and catch)
        * possibly discuss curly brace versus not fat arrow (multi-line and implicit return versus not)

> **This takes us to the `step-2` branch**

* Allow retrieval of existing data
    * implement get for collection on `Resource` (static)
        * take in resource name, but we will then override this in `Todo`
        * must write "deserialize" method to move data into actual class objects...
            * must place `Todo` class on the `window` explicitly to dynamically access on `window`!
            * create them with `new window[resourceName]()` then use `Object.assign()` to fill with data
            * finally, add the immutable props
        * map over data from localStorage with deserialize method
    * override `get` in `Todo` class to pass in resourceName
        * discuss `super.get()` (again)
    * Call `Todo.get()` from app.js and render items

> **This takes us to the `step-3` branch**

* Allow deletion of a Todo/Resource
    * implement `destroy` on `Resource`
    * implement button event handler on `.items`
        * discuss delegation for those not familiar
        * must change `get()` on `Resource` to accept ID, which means passing through ID in `Todo.get()`
        * discuss Promise chaining (`get()->destroy()->remove from DOM`)

> **This takes us to the `step-4` branch**

* Allow "checking off" of an item
    * implement entirely in app.js with existing functionality
        * change element query matcher to just `button`
        * capture type of button in string var
        * either `destroy()` or update `isComplete` and then `save()` based on button type
        * then either remove the element or update class (`classList.contains()` and `add()`/`remove()`)

> **This takes us to the `step-5` branch**

* Discuss using these features in browsers today
    * Create a package.json file (simple: name and version only)
    * install Babel: `npm i --save-dev babel-cli`
    * and the ES2015 presets: `npm i --save-dev babel-preset-env`
    * and the babel config file (`.babelrc`): `{ "presets": ["env"] }`
    * add a `build` script to package.json: `"build": "babel src/ -d build/"`
    * Run it! `npm run build`
* Take a look at the resulting ES5 code in `/build`
    * Note that we would probably want other config and build steps!!
* Add clean and copy steps:
    * `"build": "rm -rf build/ && babel src/ -d build/ && cp src/*.css build/ && cp src/*.html build/"`

> **If time...**

* Create a `destroyMultiple` method on the `Todo` class
    * accept one or more IDs into the method (use rest parameter)
    * use `map()` and `Promise.all()` to take array of IDs and get Todo items
    * use the same strategy (chained) to destroy the items
    * wrap entire method in a single promise to return the destroyed item data
