import { loadHomePage } from "./shared.js";

main();

function checkInfo() {
   const emailElement = document.querySelector('.js-email');
   const email = emailElement.value;
   const passwordElement = document.querySelector('.js-password');
   const password = passwordElement.value;
   const users = loadFromDB();

   for (let user in users) {
      if (users[user].email === email && users[user].password === password) {
         const currUser = {
            id: user,
            name: users[user].name
         };
         console.log(currUser);
         localStorage.setItem('currUser', JSON.stringify(currUser));
         loadHomePage();
         return;
      }
   }

   alert('Invalid email or password, authentication failed.');
   emailElement.value = '';
   passwordElement.value = '';
}

function main() {
   document.querySelector('.js-login-button')
      .addEventListener('click', function() {
         checkInfo();
      });
   document.querySelector('.js-registration-link')
      .addEventListener('click', function() {
         window.location.href = '../pages/registrationPage.html';
      });
}

function loadFromDB() {
   return JSON.parse(localStorage.getItem('users'));
}