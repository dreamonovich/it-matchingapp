const apiPath = "http://178.154.205.204:8086";
const authToken = localStorage.getItem("authToken");

if (!authToken) {
  window.location.href = "/login";
}

document.addEventListener("DOMContentLoaded", function () {
  const profile = document.querySelector(".profile");

  fetch(`${apiPath}/profile/me/`, {
    method: "GET",
    headers: {
      Authorization: `Token ${authToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      const profileName = profile.querySelector(".name");
      const profileRole = profile.querySelector(".role");
      const profileStack = profile.querySelector(".stack");
      const profileTelegram = profile.querySelector(".telegram");
      const profileAge = profile.querySelector(".age");
      const profileId = profile.querySelector(".user_id");
      const profileImage = profile.querySelector("img");

      profileImage.src = `${apiPath}` + data.image;
      profileName.textContent = data.login;
      profileRole.textContent = `${data.role}`;
      profileStack.textContent = `${data.stack}`;
      profileTelegram.textContent = `${data.telegram_username}`;
      profileAge.textContent = `${data.age} ${getAgeToken(data.age)}`;
      profileId.textContent = `${data.id}`;
      profile.style.visibility = "visible";
    });
});

function getAgeToken(age) {
  if (age >= 5 && age <= 20) {
    return "лет";
  }
  let ageLastDigit = age % 10;
  if (ageLastDigit === 1) {
    return "год";
  }
  if (ageLastDigit >= 2 && ageLastDigit <= 4) {
    return "года";
  }
  return "лет";
}
