# ES6 TODO App

This is a simple TODO app written in only core JavaScript in order to teach some of the new concepts in ES6/2015. You are welcome to use this repo any way you like, but note that it is _for training purposes only_. This code is **not production ready**.

## How to use this repo

### Step 1: Fork or Download...

Either [fork this repo](https://github.com/jakerella/es6-todos/fork) into your own GitHub account, or [download all of the files](https://github.com/jakerella/es6-todos/archive/master.zip). All you need to get started are the files here in the `master` branch, and these instructions.

### Step 2: Start Coding!

The idea here is to practice the new ES6/2015 features in JavaScript, so start writing a TODO application using those! And don't use any libraries, just core JS. This means you will probably need to use some older ES5 things that you might not have used before as well. Things like native DOM methods (instead of jQuery). The HTML and CSS is provided for you in the `/src` directory, but you are welcome to change any of it!

Here are some specific tasks if you need some inspiration:

1. Create a base `Resource` [class](http://2ality.com/2015/02/es6-classes-final.html)
  * All resources should have an `id` and `createDate` property
  * Resources can be created, retrieved, saved, and deleted (different methods)
    * Add a method to "serialize" the data, returning just the core properties in a plan object
    * Save all resources to `localStorage` or use an API for data storage (using `fetch()` not XHR!)
    * Make all persistence methods use native [promises](https://developers.google.com/web/fundamentals/getting-started/primers/promises)
  * Write getters and setters for the `id` and `createDate` properties
  * Use [default function parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters) for methods that need them
  * Use [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) for most of your callbacks.
2. Create a `Todo` class which `extends` the `Resource` class
  * Allow adding of a new Todo item (text, due date, and complete switch)
  * Make the due date today if not defined, and incomplete by default
  * Override the serialization method and use `super` to access the parent
  * Create a rendering function to display the HTML for a Todo using [template strings](http://2ality.com/2015/01/es6-strings.html)
3. List all TODO items on the page
  * Use the `Todo` class you created above
  * Be sure to [localize the due date](http://es6-features.org/#DateTimeFormatting) for display
  * Allow a user to toggle an item as complete or not (add the `completed` class to the `<li>`)
  * Allow a user to delete an item

## ES6/2015 Concept References

You very well may have built a TODO app in the past, so what's so different about this one? You should be using those cool, new ES6 features! So then you might be asking, what are those? Here are some references for many of them:

* [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
* [Classes](http://2ality.com/2015/02/es6-classes-final.html)
* [Constants and block-scoped variable declarations](http://wesbos.com/let-vs-const/)
* [Default function parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
* Internationalization ([Currency](http://es6-features.org/#CurrencyFormatting) and [Dates](http://es6-features.org/#DateTimeFormatting), plus more)
* [Object destructuring](https://ponyfoo.com/articles/es6-destructuring-in-depth)
* [Object literal shorthands](http://www.benmvp.com/learning-es6-enhanced-object-literals/)
* [Object property assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) (including merging)
* [Promises](https://developers.google.com/web/fundamentals/getting-started/primers/promises)
* [String functions](http://2ality.com/2015/01/es6-strings.html) (Searching and templates, plus more)
* [Rest/Spread](http://www.datchley.name/es6-rest-spread-defaults-and-destructuring/)

There are more! Check out this nice [ES6 Features Overview](http://es6-features.org) site to see how to use some of them.

### What about ES6 Modules?

While the ES6/2015 specification does include a [section for Modules](https://www.ecma-international.org/ecma-262/6.0/#sec-modules), very [few browsers support them](http://caniuse.com/#feat=es6-module), and the ones that do are currently requiring a flag. As such, they are not a part of this exercise. However, if you would like to learn more about them, and how to use them, I wuld highly recommend this [blog post on ES6 Modules](http://2ality.com/2014/09/es6-modules-final.html) by Axel Rauschmeyer.

### Wait... Can I use this stuff today?

You can! Of course, some browsers are still lagging behind, so if you need to support certain browsers you should check out this [ES6 compatibility table](https://kangax.github.io/compat-table/es6/). If you want to use these features and _still need to support older browsers_, you can use a tool like [Babel](http://babeljs.io) to "transpile" your shiny, new ES6 code down to ES5.

## Author

While I (Jordan Kasper) originally made this repo, the idea is that a developer learning new ES6/2015 features would fork this repo, then write their own solution! That said, I did write these instructions, and the [`solution` branch](https://github.com/jakerella/es6-todos/tree/solution) (as an example of how I might code this application).

## LICENSE

Please read the [LICENSE](LICENSE) file, but generally this is under the MIT license (quite lenient).
