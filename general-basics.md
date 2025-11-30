## ES6 এবং টুলিং
ES6 হল ECMA Script 6 এর ছোট ফর্ম। আর ECMA Script এর ফুল ফর্ম হচ্ছে **European Computer Manufacturer’s Association**. একমা স্ক্রিপ্ট একটি কোম্পানি যারা জাভাস্ক্রিপ্ট এর স্ট্যান্ডার্ড মেইনটেইন করে এবং rules সেট করে। Brendan Eich ১৯৯৫ সালে জাভাস্ক্রিপ্ট প্রথম তৈরী করেন। প্রথমে এটার নাম ছিল Mocha, পরে হয় LiveScript, এবং শেষে এটা JavaScript নাম এ রূপ নেয়। এরপর ১৯৯৭ সালে Netscape এটাকে Ecma International এর কাছে উপস্থাপন করে, এবং ECMAScript(ECMA-262) স্ট্যান্ডার্ড তৈরী হয়। JavaScript, ActionScript, JScript, TypeScript সবাই ই ECMAScript এর সাবসেট।

### টুলিং
যেহেতু জাভাস্ক্রিপ্টে একটা বিশাল বিপ্লব হয়েছে, এবং ফ্রন্টএন্ড, ব্যাকএন্ড, ইভেন নেটিভ মোবাইল এপ্স তৈরী  করতে জাভাস্ক্রিপ্টকে ব্যবহার  করা হচ্ছে, কোড লেখা থেকে শুরু করে ডিবাগিং ,টেস্টিং , ডিপ্লোয়িং সব জায়গায় অনেক রকমের টেকনোলজির দরকার হয়। শুধু একটি টেকনোলজি সব উদ্দেশ্য সাধন করে না। তাই প্রত্যেক স্টেপ এ বিভিন্ন রকমের প্রোগ্রাম এন্ড টেকনোলজির প্রয়োজন হয়। এইগুলাকেই  জাভাস্ক্রিপ্ট  টুলিং বলা হয়।

- Static Type Checking এর জন্য: TypeScript, Flow

- Code Linting এর জন্য: ESLint, JSLint (Linting হচ্ছে সেই প্রসেস যেখানে কোড এর কোয়ালিটি এবং ফরমেটিং চেক করা হয় এবং সে অনুযায়ী ওয়ার্নিং দেয়া হয়)

- Code Formatters: Prettier 

- Package Managers: NPM, Yarn, Bower

- Task Runners: Gulp, Grunt

- Module Bundlers: Webpack, Rollup

- Build Tools: Webpack, Parcel

- Transpiler: Babel (সোর্স টু সোর্স যেমন TypeScript টু Pure JS করাকে কে **ট্রান্সপাইল**  বলে)

- Debuggers: Chrome Dev Tools, Code Editors like VS Code, Jetbrains WebStorm, etc.

## Why JavaScript is Single-Threaded

- JavaScript was designed in 1995 to make web pages interactive.

- Browsers needed a scripting language that:

    - Was simple.

    - Didn’t break the page by running too many things at once.

    - Could safely manipulate the DOM.

The DOM (Document Object Model) is not thread-safe. If multiple threads updated the DOM at the same time → inconsistent UI, race conditions, crashes.

Instead of true multi-threading, JavaScript uses:

- Event Loop + Callback Queue → handles async tasks without blocking.

- Web APIs (like setTimeout, fetch) → push async work outside JS thread.

- Web Workers → background threads that run JS but cannot directly touch DOM.

## Summary

- JS is single-threaded by design → to keep DOM manipulation safe and predictable.

- Multi-threading would cause race conditions and complexity.

- Instead, JS achieves concurrency via:

    - Event Loop (async tasks)

    - Web Workers (background threads without DOM access)

    - Async I/O (Node.js with libuv)

So yes, multi-threading can make things faster, but safety and simplicity were prioritized in JS.

## open a webpage (under the hood)
- html parsing: DOM Tree
    - Browser reads HTML line by line.
    - It creates a Document Object Model (DOM) → a tree-like structure of all elements (`<div>, <p>, <button>` etc.).
- css parsing: CSSOM Tree
    - tells styles for each element
- DOM + CSSOM = Render Tree
- Layout (Reflow)
    - Browser calculates where each element should be placed on the page.
- Painting
    - Browser fills in pixels (text, colors, borders, images).

- Compositing
    - Browser layers everything correctly and shows the final page to you.

- HTML & CSS
    - They don’t have loops, if-else, or memory control = so not Turing complete.

## In short
- HTML = structure becomes DOM

- CSS = style becomes CSSOM

- HTML/CSS is rendered by an engine

- Browser merges them into Render Tree, does layout → paint → composite

- They are interpreted, not compiled, but browsers optimize heavily.

- They (HTML, CSS) don’t “execute” by themselves — they need a **rendering engine** (like **Chrome’s Blink**, Firefox’s Gecko, Safari’s WebKit).

- There are environments that embed a browser engine or reimplement it:
    - **Electron.js**
    - Mobile Apps (React Native)

- CLI (NodeJS)
    - **jsdom**: parse HTML & emulate DOM.
    - **parse5**: parse HTML.
    - **postcss**: parse & transform CSS.

## CSS Performance Basics

- Repaints/Reflows are expensive → changing layout (width, height, position) is slower than changing colors or opacity.

- CSS selectors are optimized left-to-right → #id is fastest, long chains (div ul li a) are heavier.

- Use fewer DOM elements → deep nesting slows layout.

- Animations → prefer transform & opacity (GPU accelerated).

## Browser
- localstorage, timer, UI, locationAccess, URL, JS Engine (inside there is a callstack)
- Part of Browser (not JS)
    - WEB APIs (window): `setTimeout, DOM APIs, fetch, localStorage, console, location`
    - Browser gives access to JS Engine through WEB APIs
    - `window.fetch() = fetch()`, same for others

## Concurrency Model in JS
For example: `startTimeout` callback will be waiting in callback queue to finish execution of the GEC in call stack.

## Higher order functions
- A function that takes another function or return a function.
- Functional programming
- DRY
- Single Responsibility
```js
const rad = [1, 2, 3];
const area = function (r) {
    return Math.PI * r * r;
}

// every array will get this function, can access it, using prototype
Array.prototype.calculate = function(logic) {  // custom map
    const output = [];
    for (let i = 0; i < this.length; i++) {
        output.push(logic(this[i]));
    }
    return output;
}

console.log(rad.calculate(area));
```

## Zod (library)
- TypeScript-first schema validation with static type inference
- We can have `utils/env.ts` with zod implementation for `.env` processing

```js
const userSchema = z.object({
    name: z.string(),
    age: z.number(),
});

type User = z.infer<typeof userSchema>;

const user: User = {
    name: 'app',
    age: 6,
}
```

## Regex
- Starts with '/' and ends with '/'
- `/text_to_match/flags` : `/the/gi`
- some flags: g (global), i (case insensitive)
- g flag for all matches, with g only the first match
- `/e+/g` : e, ee, eee
- `/ea?/g` : e, ea  (a is optional, one or none)
- `/a./g` : . (dot) matches any char except new line
- `/\./g` : only matches . (dot)
- `/\w{3, 5}/g` : matches any word of length between 3 and 5
- `/[0-9]at/g`
- grouping: `/(t|T|r){3, 4}/g` : word with t or T or r len (3, 4)
- $ for end char
- `/d{1}[ -]?\d{1}[ -]?\d{2}/g` : matches "1-2 34"
- naming: `(?<name>)\d{3}/g`

## System Design Optimization
- Scale-in (vertical scaling), upgrading single node
- Scale-out (horizontal scaling), distributing resources, new nodes are added
- SQL when the system is read driven and NoSQL such as MongoDB when the system is write driven

## IP
- consists of octets, IPv4 has 4, network address + host address
- using **default gateway** device A can know weather device B is in same network or not

#### Subnetting

Logically broken down networks into smaller networks. It is done by changing the default subnet mask by borrowing some of the bits from the host portion. Host = TOT - networks addr - broadcast addr.

Class A/B/C, CIDR (classless inter-domain routing, **slash notation**)

#### Static IP

A IP is where a user assigns an IP manually.

#### Dynamic IP

A IP is where a computer gets an IP from **DHCP** server.

##### DHCP (dynamic host configuration protocol)

Is a **service** that runs on a server, such as a Microsoft server or linux server. It's also a service that runs on routers.

##### DHCP Settings
- **Scope**: range of possible IP
- The DHCP server assigns the IP as a lease (the amount of time an IP is assigned to a computer)
- **Reservation**: ensures that a specific computer or device will always be given the same IP

### Public vs Private IP
- public is unique and registered, ISP provides it
- private can be duplicate in different networks
- device has private IP, sends req to router (who has public IP), router communicates with internet with public IP
- public is insecure, we can use VPN

## MAC (media access control)
- mainly NIC contains MAC, all MACs are unique
- a device can have multiple MAC, for example: Wired NIC, USB, Bluetooth adapter
- a device/router uses **ARP** to get the MAC of other device/router, once it locates the IP
- Two communicate with other device, a device needs both IP and MAC
    - IP locates the device, MAC identifies it
    - kinda like, IP tells about city/area/house location, MAC tells who does live inside

## Proxy
A proxy is someone or something that has the authority to do something for another person or thing. **A proxy is a server.**

A proxy server is a middleman that sits between a private network and public internet.

### Forward Proxy (from server to client)
- Provides private network safety
- devices communicates with server through proxy server

##### Benefits
    - safety against malicious activities
    - hides identity of the clients by masking their IP
    - logs user activity, a proxy keeps track of what websites that were visited and how long they were on those websites
    - can bypass restricted content
    - increases speed by caching copies of websites in its db

### Reverse Proxy (from client to server)
A reverse proxy is the reverse of a forward proxy. A reverse proxy regulates traffic coming into a network. Protect the server.

##### Benefits
- Increases the security by hiding the IP of the server.
- Blocks malicious traffic such as DDOS attacks.
- Load balancing

## Cloud Computing
Cloud computing refers to data and applications being **`stored and run`** on the cloud rather than on your local computer.

Cloud is just a **big building** filled with computers (servers).

Cloud Providers provide multiple benefits: scalability (pay as you go), reliability, security, backup.

##### CC types
- IAAS
    - you: software portion - app, data, os, runtime, middleware
    - provider: hardware portion - servers, virtualization, storage, networking
- PAAS
    - you: **app, data**, rest for provider
- SAAS
    - most common
    - provider provides everything
    - for example: google docs

### VPC
- isolated, secure cloud network inside a public cloud
- public subnet (for internet), private subnet (for db)
- benefits: scalable, secure

## Virtualization
Virtualization in computing is the **process of simulating hardware and software** in a virtual (software) environment. Multiple applications in one machine.

The one server is running 3 VMs, running 3 different applications, running 3 different OS.

#### Hypervisor

The software that creates and runs the virtualization is called hypervisor. It allocates and controls the sharing of machine's resources: storage, ram, CPUs.

- Type 1 hypervisor: installed on empty, bare metal hardware, no OS
- Type 2 hypervisor: installed on an existing OS

#### Benefits of virtualization
- saves money on hardware and electricity, floor space, maintenance and management
- portability, full computing capability (machine's full potential), recovery

## Containers

A container is an application that's been packaged with all the (files, configurations, dependencies) necessary for it run. A package that can be shared with multiple machines without further configurations.

Instead of hypervisor, container has **container engine**, it unpacks the container files and hands them off to the OS kernel.

### VM vs Containers
- Each VM has an OS, typically larger, because it contains: app + os
- Containers only contain application, shares machine's OS
- containers must be packaged to work with same OS of the server, on the other hand VM doesn't rely on that

## CDN (Content Delivery Network)

The main purpose of a CDN is to make websites faster by **bringing the website content closer to the user**. A CDN works by establishing a **point of presence** (POP). A POP is made up of **Edge Servers** which cache the content of the origin webserver.

## Switching

Switching is the process of **data being transferred** from one device to another.

- Circuit switching: communication happens through a dedicated circuit or channel or path, primary used in telephone systems. **Connection Oriented**.

- Packet switching: **Connectionless**. No session or channel is established prior to data transfer. Used in modern routing. Data is broken down into **individuals packets** that take different routes to the destination. Data reassemble happens.

## What is a port

A port is not a physical connection. It's a **logical connection** that's used by programs and services to **exchange information**. It specifically determines **which program or service** on a computer or server that is going to be used. (0 - 65535), 80, 443 for web pages (http, https), 21 for FTP, 25 for Email (SMTP).

**A port is always associated with an IP.** IP determines the location of the server, a port number determines which service or program on that server it wants to use. We can use **NETSTAT** cmd tool to visualize them.

State: Established => client
State: Listening => server

##### Three type of ports
- system or well known ports, used in server, (0 - 1023)
- user or registered ports, user in server,
- dynamic or private ports, client side ports (49152 - 65535)

## Modem vs Router
- A modem is what **brings the internet into your home or business**, demodulates incoming analog signals into digital signal, also modulates outgoing digital signals into an analog one.
- A router is what **routes or passes your internet connection** to all of your devices. Most routers will have a built-in switch inside of them.

## Hub vs Switch vs Router
- Hub doesn't have intelligence, it accepts packets in one port and broadcasts that to all connections
- Switch is intelligent, has MAC table, so sends data to specific device unlike the hub
- **Hub and Switch are used to exchange data withing LAN**, not outside their own network, **to do that a device needs IP**, hub and switch do not read IP.
- **Router routes data from one network to another based on their IP.** Gateway of network.
- **`Hubs and Switches are used to create networks, Routers are used to connect networks.`**

## Backend Concepts

- authentication vs authorization
- rate limiting (control request from `user, ip, token`)
- db index
- transactions & ACID
- caching
- Message Queue
- load balancing
- CAP
- Reverse Proxy
- distributed systems, CDN