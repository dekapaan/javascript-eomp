let date = new Date();

let signInButton = document.querySelector(".signInButton");

function login(username, password) {
  console.log(username);
  console.log(password);
  fetch("https://agile-tundra-03577.herokuapp.com/auth", {
    method: "POST",
    body: JSON.stringify({
      username: `${username}`,
      password: `${password}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["access_token"]) {
        console.log(data);
        myStorage = window.localStorage;
        myStorage.setItem("jwt-token", data["access_token"]);
        myStorage.setItem("username", username);
        myStorage.setItem("password", password);
        window.location.href = "/home.html";
      }
    });
}

// switch between register and sign in
let switchButtons = document.querySelectorAll(".switchButton");
let signInForm = document.querySelector(".signIn");
let registerForm = document.querySelector(".register");

switchButtons.forEach((button) => {
  button.addEventListener("click", () => {
    signInForm.classList.toggle("active");
    registerForm.classList.toggle("active");
  });
});
