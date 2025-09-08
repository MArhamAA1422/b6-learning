## How browser understands & runs JS
- Every browser has a JS engine: chrome(V8), Firefox(SpiderMonkey)

### Steps
#### Parsing (Syntax Analysis), Tokens
- If syntax error → stop execution.
#### Compilation (JIT — Just-in-Time Compilation)
- Early JS engines interpreted directly (line by line) → slow.
- Modern engines use JIT compilation:
  - Code is first interpreted into **bytecode**.
  - **Hot parts** of code (frequently executed) → optimized into machine code.
- Optimizations like inline caching, hidden classes, etc.
#### Execution
- JS runs inside a single-threaded **event loop**.
- Each script runs inside an **Execution Context**.
- Contexts are pushed/popped on the **Call Stack**.
- For async tasks (setTimeout, fetch, promises), the **Web API**s + Task Queue/Microtask Queue + Event Loop handle scheduling.

## How Node.js Understands & Runs JavaScript

### Node.js = V8 Engine + Libuv + C++ bindings.

- V8 Engine → Parses, compiles, executes JS (same as browser).

- Libuv → Provides async I/O (file system, networking, timers).

- Bindings → Bridges C++ APIs with JS (so JS can call OS-level features).

### Node.js Execution Flow:

- Code runs on V8.

- When you use async (e.g., fs.readFile, setTimeout, http request), Node passes it to Libuv.

- Libuv uses Thread Pool + Event Loop to handle async tasks.

- When done, results are queued back into Event Loop → callback executed.

## Key Differences: Browser vs Node.js
Feature	| Browser JS Engine	| Node.js (V8 + Libuv)
| - | - | - |
Runs in |	Web browser tab	| Server / CLI
APIs available	| DOM, BOM, fetch, setTimeout	| fs, http, crypto, net, timers
Event loop	| Managed by browser	| Managed by Libuv
Rendering	| Can manipulate DOM | No DOM, only system APIs

## Hidden Data Structures
- Call Stack → function execution order.
- Heap → memory allocation for objects/functions.
- Event Table & Event Queue → track async callbacks.
- Microtask Queue → for promises, mutation observers (higher priority than normal queue).

## Monitor/Profiler
জাভাস্ক্রিপ্ট কোড ইঞ্জিনের ভেতর প্রথমে একটি ইন্টারপ্রেটারের ভেতর দিয়ে যায়। ইন্টারপ্রেটার যখন লাইন ধরে ধরে কোড এক্সিকিউট করতে থাকে, প্রোফাইলার তখন কোন স্টেটমেন্ট কতবার করে রান হচ্ছে এটা হিসাব করে রাখে। কোডের একই অংশ যদি একাধিকবার এক্সিকিউট হয় প্রোফাইলার তখন এটিকে ‘ওয়ার্ম (Warm)’ হিসেবে শনাক্ত করে। এই সংখ্যাটি আরো বাড়তে থাকলে এক সময় এটিকে ‘হট কোড’ বলা হয়। অর্থাৎ আমাদের প্রোগ্রামের যে অংশগুলো সবচেয়ে বেশি সংখ্যকবার রান করছে মনিটর/প্রোফাইলার সেগুলোকে বের করে আনে।

## Baseline Compiler
এখানে কোডের ওয়ার্ম সেকশনগুলোকে **বাইটকোডে** রুপান্তর করা হয়। এই বাইটকোড পরবর্তীতে একটি ইন্টারপ্রেটার দিয়ে রান করানো হয় যেটা এই ধরনের বাইটকোডের জন্য অপটিমাইজড।

## Optimizing Compiler
মনিটর বা প্রোফাইলার দ্বারা শনাক্ত হওয়া হট পার্টগুলো এই কম্পাইলারের কাছে পাঠানো হয়। এর মূল কাজ হলো হট পার্টগুলোর আরেকটি অপটিমাইজড ভার্সনে সংরক্ষণ করে রাখা যেটি আরো দ্রুত রান করবে। এই কাজটি করার জন্য জাভাস্ক্রিপ্ট ইঞ্জিনে ‘শেইপ’ ধারনাটি ব্যবহৃত হয়। যেমন একই কন্সট্রাক্টর ফাংশন দিয়ে তৈরি করা সব অবজেক্টের একই শেইপ ধরে নেয়া হয় কারণ এদের প্রোপার্টিগুলো একই। ইনলাইন ক্যাশিং করার জন্য এটা গুরুত্বপূর্ন। বেইজলাইন কম্পাইলারে আমরা বাইটকোড নিয়ে কথা বলেছি। বাইটকোড কিন্তু মেশিন কোডের মতো ফাস্ট নয়। অনেক বেশিবার রান হওয়া কোড যদি সরাসরি মেশিন কোডে রূপান্তর করে সেটাকে বার বার ব্যবহার করা যায় তাহলে প্রোগ্রাম অনেক ভালো পারফর্ম করবে। অপটিমাইজিং কম্পাইলার আমাদের জন্য এই কাজটিই করে দেয়। তাহলে ব্যপারটা এমন দাড়ালো যে প্রথমে জাভাস্ক্রিপ্ট এর সোর্স কোড বাইটকোডে রূপান্তরিত হয় যেটা একটি ইন্টারপ্রেটার এক্সিকিউট করতে থাকে। এসময় মনিটর বা প্রোফাইলার কোডের ওয়ার্ম ও হটপার্ট  অপটিমাইজিং কম্পাইলারের কাছে পাঠিয়ে দেয় যেটি পরবর্তীতে অপটিমাইজড মেশিন কোডে রূপান্তরিত হয়। এখানে ইন্টারপ্রেটার ও কম্পাইলার দুইটিই ব্যবহৃত হলো প্রোগ্রামের পার্ফরম্যান্স বাড়ানোর জন্য। এটাকেই আমরা জাস্ট ইন টাইম কম্পাইলেশন এর একটি উদাহরণ হিসেবে ধরতে পারি। তবে একটি কথা মাথায় রাখা প্রয়োজন যে বিভিন্ন ব্রাউজার আলাদাভাবে তাদের নিজস্ব JIT তৈরি করেছে। তবে মূল কাজটি কিন্তু একই।

## JIT কেন দ্রুত?
একটি JIT কম্পাইলার দ্রুততর হতে পারে কারণ মেশিন কোডটি সঠিক মেশিনে তৈরি করা হচ্ছে যা এটি চালাবে।