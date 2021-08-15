let userContainer = document.querySelector(".detailsContainer");
function userData(username) {
  fetch(`https://agile-tundra-03577.herokuapp.com/get-user/'${username}'/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      user = data.user;
      userContainer.innerHTML = `
      <p class="detailHeading"><span class="detail">First Name: </span>${user[1]}</p>
      <p class="detailHeading"><span class="detail">Last Name: </span>${user[2]}</p>
      <p class="detailHeading"><span class="detail">Email: </span>${user[3]}</p>
      <p class="detailHeading"><span class="detail">Username: </span>${user[4]}</p>`;
      document.querySelector(".firstName").value = `${user[1]}`;
      document.querySelector(".lastName").value = `${user[2]}`;
      document.querySelector(".email").value = user[3];
      document.querySelector(".username").value = `${user[4]}`;
      document.querySelector(".password").value = `${user[5]}`;
    });
}

userData(window.localStorage["username"]);

function editDetails() {
  console.log(document.querySelector(".firstName").value),
    console.log(document.querySelector(".lastName").value),
    console.log(document.querySelector(".email").value),
    console.log(document.querySelector(".username").value),
    console.log(document.querySelector(".password").value),
    fetch(
      `https://agile-tundra-03577.herokuapp.com/edit-profile/${parseInt(
        window.localStorage["user-id"]
      )}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `jwt ${window.localStorage["jwt-token"]}`,
        },
        body: JSON.stringify({
          first_name: document.querySelector(".firstName").value,
          last_name: document.querySelector(".lastName").value,
          email: document.querySelector(".email").value,
          username: document.querySelector(".username").value,
          password: document.querySelector(".password").value,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
}

document.querySelector(".fa-user").addEventListener("click", (e) => {
  document.querySelector(".profileMenu").classList.toggle("active");
});
