'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
    function App() {
        _classCallCheck(this, App);

        document.querySelector('.create-todo').addEventListener('submit', function (eventObj) {
            eventObj.preventDefault();
            App.createTodo();
        });

        document.querySelector('ul').addEventListener('click', function (eventObj) {
            return console.log(eventObj.target);
        });

        Resource.get(null, 'Todo');

        {
            // console.log(i);
            var _i = 7;
            console.log(_i);
        }
        console.log(i);

        for (var _i2 = 0; _i2 < 10; _i2++) {
            console.log(_i2);
        }
        console.log('outside the for', i);
    }

    _createClass(App, null, [{
        key: 'createTodo',
        value: function createTodo(eventObj) {
            var item = new Todo(document.querySelector('.new-todo').value);

            item.save();
            document.querySelector('.items').innerHTML += item.render();
        }
    }]);

    return App;
}();

var Resource = function () {
    function Resource() {
        _classCallCheck(this, Resource);

        this.id = null;
    }

    _createClass(Resource, [{
        key: 'save',
        value: function save() {
            this.validate();

            console.log(this.constructor.name, ' item saved!');
        }
    }, {
        key: 'validate',
        value: function validate() {
            if (this.id !== null && typeof this.id !== 'number') {
                throw new Error('Invalid ID present on resource');
            }
        }
    }], [{
        key: 'get',
        value: function get(id, resourceType) {
            if (!id) {
                console.log('retrieving all', resourceType);
            } else {
                console.log('retrieving resource with ID=', id);
            }
        }
    }]);

    return Resource;
}();

var Todo = function (_Resource) {
    _inherits(Todo, _Resource);

    function Todo() {
        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'stuff';
        var dueDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Date.now() + 86400000;

        _classCallCheck(this, Todo);

        var _this = _possibleConstructorReturn(this, (Todo.__proto__ || Object.getPrototypeOf(Todo)).call(this));

        _this.text = text;
        _this.isComplete = false;
        _this._dueDate = dueDate;
        return _this;
    }

    _createClass(Todo, [{
        key: 'render',
        value: function render() {
            var id = this.id,
                text = this.text,
                dueDate = this.dueDate,
                isComplete = this.isComplete;


            return '\n        <li data-id="' + id + '">\n            <p>' + text + '</p>\n            <time>' + dueDate + '</time>\n            <span>' + (isComplete ? 'done' : 'todo') + '</span>\n        </li>';
        }
    }, {
        key: 'validate',
        value: function validate() {
            _get(Todo.prototype.__proto__ || Object.getPrototypeOf(Todo.prototype), 'validate', this).call(this);

            if (!this.text || !this._dueDate || typeof this.isComplete !== 'boolean') {
                throw new Error('Invalid Todo data');
            }
        }
    }, {
        key: 'dueDate',
        get: function get() {
            return new Date(this._dueDate).toLocaleString();
        },
        set: function set(value) {
            this._dueDate = new Date(value).getTime();
        }
    }]);

    return Todo;
}(Resource);

new App();