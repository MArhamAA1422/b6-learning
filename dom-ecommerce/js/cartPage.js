import { products } from '../data/product.js';
import { cart } from '../data/cart.js';
import { centConverter, currUser } from './shared.js';
import { getProduct } from './shared.js';

const user = currUser();

main();

function main() {
   document.querySelector('.home-button')
      .addEventListener('click', function() {
         window.location.href = '../pages/homePage.html';
      });
   
   let html = '';
   let totalCost = 0;
   let totalItem = 0;
   for (let productId in cart[user.id]) {
      const quantity = cart[user.id][productId].quantity;
      const product = getProduct(productId);
      console.log(product);
      html += `
         <div class="p-item">
            <div class="p-name">${product.name}</div>
            <div class="p-more">
               <div class="p-img-container">
                  <img class="p-img" src=${product.image}>
               </div>
               <div class="p-info">
                  <div class="p-quantity">${quantity} items</div>
                  <div class="p-price">$${centConverter(product.priceCents*quantity)}</div>
               </div>
            </div>
         </div>
      `;
      totalCost += product.priceCents*quantity;
      totalItem += quantity;
   }
   document.querySelector('.js-p-container').innerHTML = html;
   document.querySelector('.js-price-summary').innerHTML = `Total Item = ${totalItem}, Total Cost = $${centConverter(totalCost)}`;
}