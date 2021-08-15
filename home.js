let productUrl = "https://agile-tundra-03577.herokuapp.com/show-products/";
let productContainer = document.querySelector(".productContainer");

function userData(username) {
  fetch(`https://agile-tundra-03577.herokuapp.com/get-user/'${username}'/`, {
    method: "GET",
    headers: { Authorization: `jwt ${window.localStorage["jwt-token"]}` },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.localStorage.setItem("user-id", data.user[0]);
    });
}

userData(window.localStorage.getItem("username"));

function fetchProducts(url) {
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      products = data.products;
      productContainer.innerHTML = "";
      products.forEach((product) => {
        productContainer.innerHTML += `<div class="product" onclick="toggleModal()" id="${product[0]}">
                                      <img src="${product[3]}" alt="">
                                      <h6 class="productName">${product[2]}</h6>
                                      <p class="price">R${product[6]}</p>
                                    </div>`;
      });
      let productElements = document.querySelectorAll(".product");

      productElements.forEach((product) => {
        product.addEventListener("click", (e) => {
          fetch(
            `https://agile-tundra-03577.herokuapp.com/view-product/${e.currentTarget.id}`
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              product = data.product;
              console.log(product[2]);
              document.querySelector(".modal").id = "${product[0]}";
              document.querySelector(".modal").innerHTML = `
              <button class="closeModal" onclick="toggleModal()">X</button>
              <img class="modalImg" src="${product[3]}" alt="">
              <div class="modalContent">
                <div class="productInfo">
                  <p class="modalProductCategory">${product[4]}</p>
                  <h3 class="modalProductName">${product[2]}</h3>
                  <p class="productDescription">${product[5]}</p>
                </div>
                <div class="addCart">
                  <div class="priceQuantity">
                    <p class="modalProductPrice">R${product[6]}</p>
                    <input class="quantity" type="number" value="1"/>
                  </div>
                  <button class="addToCart">Add to Cart</button>
                </div>
              </div>
              `;
              document
                .querySelector(".addToCart")
                .addEventListener("click", () => {
                  addToCart(
                    product[2],
                    product[6],
                    document.querySelector(".quantity").value,
                    product[3]
                  );
                });
            });
        });
      });
    });
}

fetchProducts(productUrl);

function toggleModal() {
  document.querySelector(".modalContainer").classList.toggle("active");
}

document.querySelector(".fa-user").addEventListener("click", (e) => {
  document.querySelector(".profileMenu").classList.toggle("active");
});

var cart = [];

if (window.localStorage["cart"]) {
  cart = JSON.parse(window.localStorage["cart"]);
}

function addToCart(name, price, qty, img) {
  let item = { name: name, price: price, qty: parseInt(qty), img: img };
  for (let x in cart) {
    if (item.name == cart[x].name) {
      cart[x].qty += item.qty;
      window.localStorage["cart"] = JSON.stringify(cart);
      console.log(JSON.parse(window.localStorage["cart"]));
      return;
    }
  }
  cart.push(item);
  window.localStorage["cart"] = JSON.stringify(cart);
  console.log(JSON.parse(window.localStorage["cart"]));
}
