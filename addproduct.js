function previewFile() {
  const preview = document.querySelector("img");
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
  let name = document.querySelector(".productName").value;
  let image = document.querySelector("img").src;
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
