## Project
- folder structure: keep similar stuffs together, can create subfolders
- handle URL path, login URL should redirect to home page if user is logged in
- userId in prefix then put into DB to separate user data

## HTML
- line by line tag (for example script) execution
- for each element first need is **style**, rendering will wait there

## CSS
- position: fixed, relative, absolute
- display: inline, block, inline-block
- use flex over grid
- justfiy-content/align items depend on flex direction, main axis
- use underline, dash in naming
  - **BEN** method
- "id" becomes window property, can be used directly

## JS
- querySelector is bad, it loops through full DOM
- use getElementById
- innerHTML is dangerous, has security vulnerability, can take malicious code
- insted of innerHTML, use: **createElement, appendChild**
  - React internally creates element then appends it
- textContent vs innerText
  - textContent ignores style, innerText takes all literal text inside an element
