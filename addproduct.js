function previewFile(preview) {
  const file = document.querySelector(".productImage").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      // convert image file to base64 string
      preview.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

function addProduct() {
  let name = document.querySelector(".inputProductName").value;
  let image = document.querySelector(".addImg").src;
  let category = document.querySelector(".productCategory").value;
  let description = document.querySelector(".productDescription").value;
  let price = document.querySelector(".productPrice").value;

  console.log(name, category, description, price);

  fetch(
    `https://agile-tundra-03577.herokuapp.com/add-product/${parseInt(
      window.localStorage["user-id"]
    )}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `jwt ${window.localStorage["jwt-token"]}`,
      },
      body: JSON.stringify({
        product_name: name,
        product_image: image,
        product_category: category,
        product_description: description,
        product_price: price,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

function editProduct(e) {
  let product_id = parseInt(e.id);
  console.log(product_id);
  let name = document.querySelector(".modalProductName").value;
  let image = document.querySelector(".modalImg").src;
  let category = document.querySelector(".modalProductCategory").value;
  let description = document.querySelector(".modalProductDescription").value;
  let price = document.querySelector(".modalProductPrice").value;

  console.log(name, category, description, price);

  fetch(
    `https://agile-tundra-03577.herokuapp.com/edit-product/${product_id}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `jwt ${window.localStorage["jwt-token"]}`,
      },
      body: JSON.stringify({
        product_name: name,
        product_image: image,
        product_category: category,
        product_description: description,
        product_price: price,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

let productUrl = `https://agile-tundra-03577.herokuapp.com/get-user-products/${parseInt(
  window.localStorage["user-id"]
)}`;
let innerContainer = document.querySelector(".innerContainer");

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
      innerContainer.innerHTML = "";
      products.forEach((product) => {
        innerContainer.innerHTML += `<div class="product" id="${product[0]}">
                                      <img src="${product[3]}" alt="">
                                      <h6 class="productName">${product[2]}</h6>
                                      <p class="price">R${product[6]}</p>
                                      <div class="buttonContainer">
                                        <button class="Edit" onclick="toggleModal()">Edit</button>
                                        <button class="Delete" onclick="deleteProduct(this)">Delete</button>
                                      </div>
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
              document.querySelector(".modal").id = product[0];
              document.querySelector(".modal").innerHTML = `
              <button class="closeModal" onclick="toggleModal()">X</button>
              <img class="modalImg" src="${product[3]}" alt="Image preview...">
              <div class="modalContent">
                <div class="productInfo">
                  <h3>Name</h3>
                  <input class="modalProductName" type="text" placeholder="Name" value="${product[2]}"/>

                  <h3>Category</h3>
                  <input class="modalProductCategory" type="text" placeholder="Category" value="${product[4]}"/>

                  <h3>Description</h3>
                  <input class="modalProductDescription" type="message" placeholder="Description" value="${product[5]}"/>
                  
                  <h3>Price</h3>
                  <input class="modalProductPrice" type="number" placeholder="Price" value="${product[6]}"/>
                  
                  <h3>Image</h3>
                  <input class="modalProductImage" type="file" onchange="previewFile(document.querySelector('.modalImg'))" />
                  <button class="submitEdit" onclick="editProduct(document.querySelector('.modal'))">Save Changes</button>
                </div>
              </div>
              `;
            });
        });
      });
    });
}

fetchProducts(productUrl);

function toggleModal() {
  document.querySelector(".modalContainer").classList.toggle("active");
}

function deleteProduct(e) {
  fetch(
    `https://agile-tundra-03577.herokuapp.com/delete-product/${e.parentElement.parentElement.id}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `jwt ${window.localStorage["jwt-token"]}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
}

document.querySelector(".fa-user").addEventListener("click", (e) => {
  document.querySelector(".profileMenu").classList.toggle("active");
});
