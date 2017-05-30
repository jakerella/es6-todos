# ES6 TODO App

This is a simple TODO app written in only ES6/2015 for training purposes. You are welcome to use this repo any way you like, but note that it is _for demonstration purposes only_. I would not expect code like this to make it into production necessarily.

## How to use this repo

### Step 1: Fork or Download...

Either [fork this repo](https://github.com/jakerella/es6-todos/fork) into your own GitHub account, or [download all of the files](https://github.com/jakerella/es6-todos/archive/master.zip). All you need to get started are the files here in the `master` branch, and these instructions.

### Step 2: Start Coding!

The idea here is to practice the new ES6/2015 features in JavaScript, so start writing a TODO application using those! And don't use any libraries, just core JS. This means you will probably need to use some older ES5 things that you might not have before as well. I'm talking about things like native DOM methods (instead of jQuery). The HTML and CSS is provided for you, but you are welcome to change any of it!

Here are some tasks if you want more specific things to implement:

* Create a base `Resource` class
  * All resources have a `id` and a `createDate`
  * Resources can be created, retrieved, saved, and deleted
  * Save them to `localStorage` or use an API for data storage (using `fetch()` not XHR!)
* Create a `Todo` class which `extends` the `Resource` class
  * Allow adding of a new Todo item (text, due date, completion switch)
  * Make the due date today if not defined, and incomplete by default
  * Allow toggling of completion status of a Todo item (update the boolean switch in the data)
* List all TODO items on the page
  * Be sure to localize the due date for display

## ES6/2015 Concepts to Use

You very well may have built a TODO app in the past, so what's so different about this one? You should be using those cool, new ES6 features! So then you might be asking, what are those? Here are some of them, and where they might fit into this app.

* [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
* [Classes](http://2ality.com/2015/02/es6-classes-final.html)
* [Constants and block-scoped variable declarations](http://wesbos.com/let-vs-const/)
* [Default function parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
* [Fetch](https://fetch.spec.whatwg.org/) instead of XHR _(Note that this is **not** part of the ES6 specification!)_
* Internationalization ([Currency](http://es6-features.org/#CurrencyFormatting) and [Dates](http://es6-features.org/#DateTimeFormatting), plus more)
* [Object destructuring](https://ponyfoo.com/articles/es6-destructuring-in-depth)
* [Object literal shorthands](http://www.benmvp.com/learning-es6-enhanced-object-literals/)
* [Object property assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) (including merging)
* [Promises](https://developers.google.com/web/fundamentals/getting-started/primers/promises)
* [String functions](http://2ality.com/2015/01/es6-strings.html) (Searching and templates, plus more)

There are more! Check out this nice [ES6 Features Overview](http://es6-features.org) site to see how to use some of them.

### What about ES6 Modules?

While the ES6/2015 specification does include a [section for Modules](https://www.ecma-international.org/ecma-262/6.0/#sec-modules), very [few browsers support them](http://caniuse.com/#feat=es6-module), and the ones that do are currently requiring a flag. As such, they are not a part of this exercise. However, if you would like to learn more about them, and how to use them, I wuld highly recommend this [blog post on ES6 Modules](http://2ality.com/2014/09/es6-modules-final.html) by Axel Rauschmeyer.

### Wait... Can I use this stuff today?

You can! Of course, some browsers are still lagging behind, so if you need to support certain browsers you should check out this [ES6 compatibility table](https://kangax.github.io/compat-table/es6/). If you want to use these features and _still need to support older browsers_, you can use a tool like [Babel](http://babeljs.io) to "transpile" your shiny, new ES6 code down to ES5.


## Author

While I (Jordan Kasper) originally made this repo, the idea is that a developer learning new ES6/2015 features would fork this repo, then write their own solution! That said, I did write these instructions, and the `solution` branch (as an example of how I might do it).

## LICENSE

Please read the [LICENSE](LICENSE) file, but generally this is under the MIT license (quite lenient).
