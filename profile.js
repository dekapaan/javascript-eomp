let userContainer = document.querySelector(".detailsContainer");
function userData(username) {
  fetch(`https://agile-tundra-03577.herokuapp.com/get-user/'${username}'`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      user = data.user;
      userContainer.innerHTML = `
      <p class="detailHeading"><span class="detail">First Name: </span>${user[1]}</p>
      <p class="detailHeading"><span class="detail">Last Name: </span>${user[2]}</p>
      <p class="detailHeading"><span class="detail">Email: </span>${user[3]}</p>
      <p class="detailHeading"><span class="detail">Username: </span>${user[4]}</p>
      <p class="detailHeading"><span class="detail">Password: </span>${user[5]}</p>`;
    });
}

userData(window.localStorage["username"]);
