## Info
- Basic building block of logic: Function
- An array is an ordered collection of values
- null & undefined both are empty values (absence of meaningful values), treat them similarly (recommendation)
- typeof null cannot be fixed due to potential web compatibility issues
- Dangerous: when the reader cannot tell what will happen
- prototype and this are vice versa in terms of understanding them
- bash language has **dynamic scope**, as bash is not compiled (no compile time scope), so it is justified
- abstract operation: ToPrimitive (for example: toNumber, toString, valueOf)
- Class syntax is recommended for creating classes in modern JavaScript
- What is the purpose of the 'constructor' property in JavaScript's prototype system: To create an illusion of a class-like system
- When accessing a property that doesn't exist on an object, where does JavaScript look next: Object's prototype
- What happens when you call .bind() on an already hardbound function: You cannot rebind the function to a different context. The only way to override the binding is by **invoking the function with the new keyword**, which will set the this context to a newly constructed object.
- As of ES6, proto can be used as both a getter and a setter to change the prototype linkage between objects. There's also an alternative method `Object.setPrototypeOf()` that can rewire prototype chains, though this is rarely done in practice.
- Only regular functions have a `.prototype` property. Arrow functions do not have a .prototype, which is why they cannot be used as constructors with the new keyword and will fail if you attempt to do so.
- DunderProto(`__proto__`): one level up to the prototype chain.
- How can you invoke a method one level up the prototype chain using the this keyword: Use `this.__proto__.methodName.call(this)`, which is referred to as 'explicit pseudo polymorphism'

## Type coercion (avoid case)
- == with 0 or "" (or even " ")
- == with non-primitive
- == true or == false

## Closure
Closure is considered **one of the most important and prevalent** concepts in computer science, with nearly every modern programming language now incorporating it. It was revolutionary when introduced in JavaScript in the mid to late 90s and has become ubiquitous across programming paradigms. Closure predates computer science and originated in lambda calculus, a mathematical system that existed before programming languages. It was initially an academic concept before being adopted by programming languages.

## new Function()
Calling a function with "new" will cause these 4 things:
- create a brand new empty object
- link that object to another object
- call function with "this" set to the new object
- if function does not return an object, assume return of "this"

## 4 ways of invoking a function in JS (this)
1. Default binding
2. Explicit binding (call/apply/bind)
3. Implicit binding (with a context object)
4. Constructor binding (with new keyword)

In non-strict mode, when a function with 'this' is called without a context => The global object is used as the default binding, which is generally not the desired behavior.

## Prototype

### Mental Model
Normally, we have a totally wrong mental model for it. So we wanna look at how the prototype system works, and specifically how its used to implement class systems in JavaScript. When you make an instance of a class, the mental model that you're getting is my instance is a copy of all those behaviors.

**An inheritance is also fundamentally a copy operation.**

As a matter of fact, even when you think about many languages, interpreters, compilers, will implement classes, they will actually flatten them for performance reasons. They will **literally copy down into the instance**, cuz it's much faster for the instance to have a reference to the function instead of having to look up some dynamic class hierarchy chain.

They only maintain the **class hierarchy chain when there's relative polymorphism**. It's called a **virtual table**. That's from C++.

When we say a constructor call is making the object based on its prototype, we're saying in our mental model that the constructor is making a copy of the prototype in the instance. Except there's a little tiny detail, which is **JavaScript doesn't do any copying at all**. As a matter of fact, to properly describe what is happening when a constructor call makes an object, it doesn't make it based on the constructor's prototype.

**It makes it linked to the prototype.**

### Copying vs Linking
Mental model and expectations of system behavior.

A class system, which is fundamentally copy, the design pattern's fundamentally copy, and put it on top of a language that doesn't do copies. JS does linking.

And it shouldn't be surprising that we've had so much trouble making JavaScript look and feel and behave like a class-related language. They're just not designed to fit together.

When a constructor call creates an object, what actually happens: **The Object is linked to the prototype.**

### Prototype Chaining
A mechanism for looking up properties on objects by traversing linked prototypes.

### Under The Hood
What's happening before your program has even started to run. It is a function, so I will draw it as approximately a circle and it goes by a pretty familiar name, it goes by the name object. And you all have seen that that's one of our fundamental objects that's built into the language, probably one of the most important of those. It's got object.keys and object.values, and various other utilities.

So **it's not only a function, but it also serves as a namespace** to have other methods on it. So there are a bunch of really important general utilities that we use across JavaScript, that are located directly on that function. But there's another entity that exists and it is a square.

So I will draw a square here, something like a square. **And it is probably the most important object in all of JavaScript.** It's so important in fact that we don't even have a name for it. We can't come up with a good name for it. So you know how we name it, is we name it referring to what points at it.

**There's a property on the object function that points over at this thing and that property is called prototype.** So if you've ever seen object.prototype, that's the property pointing from the object function over to this thing called object.prototype.

And there's a bunch of really important stuff on object.prototype, like toString, and valueOf, and all these other fundamental utilities that exist in our language. All non-primitives descend directly from this object.prototype, so it's a really important object.

There is one other thing that exists in our line zero environment which is **a property that's pointing back the other direction.**

They choose a specific name because what they were trying to do was essentially lie to you, to pretend as if JavaScript system had classes so they choose to name this **constructor**.

So you have this object.prototype which points at this object, and if you had that object and then said `.constructor`, it'd be pointing back at this object function as if the object function was the constructor of the object that pointed to it.

But that work constructor in the fundamental prototype system has no more meaning than the word fubar. Other than to convince you, that this is a class system because it has constructors in it and we will see a bit later that's what constructor basically comes in and pretends it, it helps the artifice if you will, that we are dealing with a class system.

So that our line zero environment. Now I'm gonna start diagraming again with the same notation but I'm gonna start with line one. On line one, we have a workshop function, do I'm gonna draw a circle and it's called workshop. That's the function that exists on line one.

But also what exists on line one, that is not obvious, is that there is another object that has been created as a result of line one and that object is also pretty important. At the moment it's empty but it's gonna serve a pretty important purpose except it's so important that we don't have a good name for it.

And so we refer to it by the property that points at it. And I bet you can guess what that property's called? That property's called proto, prototype, okay?

So we refer to that object as workshop.prototype, which is what you see on line four, workshop.prototype. But there is one other thing that exist on this line one, which is that there is a linkage from here back to here, there is a property pointing back, and that one is also called constructor. And again, that exist only for the purpose of trying to pretend to you that, that object was created by the workshop function, as if the workshop function is a constructor for classes.

And one final thing that exists, there is a hidden relationship between this object and this object. I'm gonna do it, if I can, with a dotted line. There's a hidden relationship between those two. We'll come back to that relationship later. But all that's a result of line one. Let's move to line four. On line four, we make a property and add it to workshop.prototype.

Now we want to do those four things (because of "new") and I'm gonna diagram each one of them. So number one, the first thing that happens when new is put in front of a function call is that it creates a brand new empty object out of thin air. So here is my brand new empty object out of thin air.

And then it links that object to another object. So here I'm gonna do a linkage, this little hidden linkage with the dotted line. It links that object to another object. Number three. It invokes the function that it was called in front of. It invokes that with the this keyword pointing at the object.

So here we are, now, I'm gonna move to line two, and the this keyword is pointing at this particular object, and what does it do? It adds a property called teacher.

We put teacher directly on that object. That's what line two does. Now the fourth and final that the new keyword does, when it returns it back, if the function does not return an object, which in this case it does not, the new keyword assumes that you meant to return to the this keyword, that brand new created object so that's get returned back and it gets named deepJS.

Okay, so let's look at line 11. On line 11 of that code snippet, we say deepJS.ask. Does the deepJS object, this object right here, does it have an ask method?

It does not. So why is it that we're able to call that method? Because our mental model if we were thinking about these as classes is that the ask method would have been copied to the instance but it isn't there. Instead, what is gonna happen is that **internal linkage, which is called the prototype chain**, in Speck, they use bracket, bracket prototype.

It's called the prototype chain, and so internally there's a linkage from the deep object, this one right here, up to this object. So when we look for a property on an object and it doesn't exist, by default, what we do is do do do do do do do.

We walk up one level to the next object in the chain and we ask if it has that property. Which in this case, it does. It has an ask method.

Which object is the this keyword gonna point at? It's gonna point at this object. Why? Because the call site is line 11. The call site says invoke that function in the context of deepJS. It doesn't matter where we find the function from. In this case, we found it up the prototype chain, but it doesn't matter, we still use the call site to invoke it.

We're able to share **one method with potentially an infinite number of instances and they're all able to share it because of the this binding behavior and that prototype linkage.** It's actually a really awesome system.

Maybe the system is actually much more powerful than the class design pattern.

```js
function Workshop(teacher) {
   this.teacher = teacher;
}
Workshop.prototype.ask = function(q) {
   console.log(this.teacher, q);
};

var deepJS = new Workshop("ezyapp");

deepJS.constructor === Workshop;  // true
deepJS.__proto__ === Workshop.prototype;  // true, dunder prototype
Object.getPrototypeOf(deepJS) === Workshop.prototype;  // true
```