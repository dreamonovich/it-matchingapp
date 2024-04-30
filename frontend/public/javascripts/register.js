const apiPath = "http://51.250.80.23:8086";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".custom-form");
  const loginInput = form.querySelector("#username");
  const passwordInput = form.querySelector("#password");
  const telegramInput = form.querySelector("#telegram_username");

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const login = loginInput.value;
    const password = passwordInput.value;
    const telegram = telegramInput.value;

    if (!login || !password || !telegram) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    if (!isValidLogin(login)) {
      alert("Логин может содержать только буквы на латинице и цифры");
      return;
    }

    if (!isValidPassword(password)) {
      alert(
        "Пароль должен содержать 6 символов: как минимум одну заглавную букву, одну строчную букву и одну цифру",
      );
      return;
    }

    if (!isValidTelegramUsername(telegram)) {
      alert("Телеграм должен начинаться с @");
      return;
    }

    submit();
  });

  function isValidLogin(login) {
    const pattern = /^[a-zA-Z0-9]+$/;
    return pattern.test(login);
  }

  function isValidPassword(password) {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,20}$/;
    return pattern.test(password);
  }

  function isValidTelegramUsername(telegramUsernam) {
    const pattern = /^@[\w]+$/;
    return pattern.test(telegramUsernam);
  }

  function submit() {
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
  }
});
