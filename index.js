let date = new Date();

let signInButton = document.querySelector(".signInButton");

function login(username, password) {
  console.log(username);
  console.log(password);

  if (!username || !password) {
    alert("Empty entry fields not allowed");
    return;
  }

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
    .then((response) => {
      if (!response.ok) {
        throw new Error("Username or password entered incorrectly");
      }
      return response.json();
    })
    .then((data) => {
      if (data["access_token"]) {
        console.log(data);
        myStorage = window.localStorage;
        myStorage.setItem("jwt-token", data["access_token"]);
        myStorage.setItem("username", username);
        myStorage.setItem("password", password);
        window.location.href = "/home.html";
      }
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      alert(error);
    });
}

document.querySelector(".signUpButton").addEventListener("click", () => {
  register(
    document.querySelector(".firstName").value,
    document.querySelector(".lastName").value,
    document.querySelector(".email").value,
    document.querySelectorAll(".username")[1].value,
    document.querySelectorAll(".password")[1].value
  );
});

function register(firstName, lastName, email, username, password) {
  console.log(firstName, lastName, email, username, password);
  if (!firstName || !lastName || !email || !username || !password) {
    return alert("Empty entry fields not allowed");
  }
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
      if (data.status_code != 201) {
        throw new Error(data.message);
      }
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
      alert(error);
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
