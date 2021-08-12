let date = new Date();

let signInButton = document.querySelector(".signInButton");

function login(username, password) {
  console.log(username);
  console.log(password);
  fetch("https://agile-tundra-03577.herokuapp.com/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
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

function register(firstName, lastName, email, username, password) {
  console.log(firstName, lastName, email, username, password);
  fetch("https://agile-tundra-03577.herokuapp.com/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email: email,
      username: username,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
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
