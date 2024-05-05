const apiPath = "http://158.160.97.151:8086";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("loginBtn").addEventListener("click", function () {
    var login = document.querySelector("#username").value;
    var password = document.querySelector("#password").value;

    var data = {
      login: [login],
      password: password,
    };

    fetch(`${apiPath}/profile/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Registration failed.");
          throw new Error("Registration failed.");
        }
      })
      .then((data) => {
        if (data && data.token) {
          localStorage.setItem("authToken", data.token);
          window.location.href = "/";
        } else {
          console.error("Token not found in the response.");
          throw new Error("Token not found in the response.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
