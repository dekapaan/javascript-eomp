let productUrl = "https://agile-tundra-03577.herokuapp.com/show-products/";
let productContainer = document.querySelector(".productContainer");

function fetchProducts(url) {
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage["jwt-token"],
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      products = data.products;
      productContainer.innerHTML = "";
      products.forEach((product) => {
        productContainer.innerHTML += `<div class="product" id="${product[0]}">
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
            });
        });
      });
    });
}

fetchProducts(productUrl);
