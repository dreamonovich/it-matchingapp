const apiPath = "http://51.250.80.23:8086";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("registerBtn").addEventListener("click", function () {
    var login = document.querySelector("#username").value;
    var password = document.querySelector("#password").value;
    var telegram_username = document.querySelector("#telegram_username").value;
    var bio = document.querySelector("#bio").value;
    var role = document.querySelector("#role").value;
    var age = document.querySelector("#age").value;
    var stack = document.querySelector("#stack").value;

    var data = {
      login: login,
      password: password,
      telegram_username: telegram_username,
      bio: bio,
      role: role,
      age: age,
      stack: stack,
    };

    fetch(`${apiPath}/profile/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Registration successful!");
          window.location.href = "/login";
        } else {
          console.error("Registration failed.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
