document.querySelector(".fa-user").addEventListener("click", (e) => {
  document.querySelector(".profileMenu").classList.toggle("active");
});

cart = JSON.parse(window.localStorage["cart"]);

function showCart(cart) {
  console.log(cart);
  var total = 0;
  document.querySelector(".cartContainer").innerHTML = "";
  cart.forEach((item) => {
    document.querySelector(".cartContainer").innerHTML += `<div class="item">
    <img src="${item.img}" alt="" />
    <div class="infoContainer">
      <div class="namePriceContainer">
        <h3>${item.name}</h3>
        <p>R${item.price}</p>
      </div>
      <div class="qtyRemoveContainer">
        <p>Qty: ${item.qty}</p>
        <button class="removeButton" id="${item.name}">Remove</button>
      </div>
    </div>
  </div>`;

    let removeButtons = document.querySelectorAll(".removeButton");

    removeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        console.log(e.currentTarget.id);
        removeFromCart(e.currentTarget.id);
      });
    });
    total += parseInt(item.price) * item.qty;
  });
  document.querySelector(
    ".cartContainer"
  ).innerHTML += ` <div class="totalContainer">
                                                    <p class="totalHeading">Total: </p><p class="total">R${total}</p>    
                                                </div>`;
}

showCart(cart);

function removeFromCart(itemName) {
  console.log(itemName);
  for (let x in cart) {
    if (itemName == cart[x].name) {
      cart.splice(x, 1);
      console.log(cart);
      window.localStorage["cart"] = JSON.stringify(cart);
    }
  }

  showCart(cart);
}

function clearCart() {
  window.localStorage["cart"] = "";
  showCart([]);
}

document.querySelector(".clearCart").addEventListener("click", () => {
  clearCart();
});
