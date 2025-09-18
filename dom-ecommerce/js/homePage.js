import { centConverter, currUser } from "./shared.js";
import { loadLoginPage } from "./shared.js";
import { products } from "../data/product.js";
import { cart } from "../data/cart.js";

const user = currUser();

main();

function main() {
   document.querySelector('.js-cart-icon')
      .addEventListener('click', function() {
         window.location.href = '../pages/cartPage.html';
      });

   if (user) {
      updateCartQuantity(user.id);
      document.querySelector('.js-log-out-button')
      .addEventListener('click', function() {
         localStorage.removeItem('currUser');
         loadLoginPage();
      });
      document.querySelector('.js-log-in-button')
         .classList.add('hidden');
   } else {
      document.querySelector('.js-log-in-button')
      .addEventListener('click', function() {
         loadLoginPage();
      });
      document.querySelector('.js-log-out-button')
         .classList.add('hidden');
   }

   let html = '';
   products.products.forEach(function (product) {
      html += `
         <div class="p-item p-item-${product.id}">
            <div class="p-img-container">
               <img class="p-img" src=${product.image}>
            </div>
            <div class="p-name">
               ${product.name}
            </div>
            <div class="p-price">
               $${centConverter(product.priceCents)}
            </div>
            <div class="added-tooltip js-added-tooltip-${product.id} hidden">
               Added
            </div>
            <button class="add-to-cart-btn js-add-to-cart-${product.id}" data-product-id=${product.id}>
               Add to cart
            </button>
         </div>
      `;
   });

   document.querySelector('.js-container').innerHTML = html;

   const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

   addToCartButtons.forEach(function(button) {
      button.addEventListener('click', function() {
         const productId = button.dataset.productId;
         if (user) {
            const userId = user.id;
            if (cart[userId]) {
               if (cart[userId][productId]) {
                  cart[userId][productId].quantity++;
               } else {
                  cart[userId][productId] = {
                     quantity: 1
                  }
               }
            } else {
               cart[userId] = {
                  [productId]: {
                     quantity: 1
                  }
               };
            }
            localStorage.setItem('cart', JSON.stringify(cart));

            updateCartQuantity(userId);
            showAddedTooltip(productId);
         } else {
            alert('You need to login first.');
         }
      });
   });
}

function updateCartQuantity(userId) {
   let total = 0;
   for (let pid in cart[userId]) {
      total += cart[userId][pid].quantity;
   }
   let itemSting = 'item';
   if (total > 1 || total === 0) itemSting += 's';
   document.querySelector('.js-cart-quantity').innerHTML = `${total} ${itemSting}`;
}

function showAddedTooltip(productId) {
   document.querySelector(`.js-added-tooltip-${productId}`).classList.remove('hidden');
   setTimeout(function() {
      document.querySelector(`.js-added-tooltip-${productId}`).classList.add('hidden');
   }, 1500);
}