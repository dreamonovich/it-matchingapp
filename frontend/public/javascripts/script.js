const apiPath = "http://158.160.97.151:8086";
const authToken = localStorage.getItem("authToken");

if (!authToken) {
  window.location.href = "/login";
}

document.addEventListener("DOMContentLoaded", function () {
  const likeBtn = document.querySelector(".like");
  const dislikeBtn = document.querySelector(".dislike");
  const profile1 = document.querySelector(".profile.first");

  const profile2 = document.querySelector(".profile.second");

  let profileCurrent = profile1;
  let profileNext = profile2;

  let isDragging = false;
  let startPosX = 0;
  let startPosY = 0;

  let startTimestamp;
  let startX;
  let velocityThreshold = 0.7;

  addEventListenersProfile(profileCurrent);
  removeEventListenersProfile(profileNext);

  dislikeBtn.addEventListener("click", disliked);
  likeBtn.addEventListener("click", liked);

  updateProfile(profile1, 0);
  updateProfile(profile2);

  function swapProfiles() {
    if (parseInt(profileCurrent.style.zIndex) < 3) {
      profileCurrent.style.zIndex = "3";
      profileNext.style.zIndex = "4";
    } else {
      profileCurrent.style.zIndex = (
        parseInt(profileCurrent.style.zIndex) - 2
      ).toString();
    }

    addEventListenersProfile(profileNext);
    removeEventListenersProfile(profileCurrent);
    if (profileCurrent == profile1) {
      profileCurrent = profile2;
      profileNext = profile1;
    } else {
      profileCurrent = profile1;
      profileNext = profile2;
    }
  }

  function addEventListenersProfile(profile) {
    // Mouse events
    profile.addEventListener("mousedown", startDrag);
    profile.addEventListener("mouseup", endDrag);
    profile.addEventListener("mousemove", drag);
    profile.addEventListener("mouseleave", endDrag);

    // Touch events for mobile devices
    profile.addEventListener("touchstart", startDrag);
    profile.addEventListener("touchend", endDrag);
    profile.addEventListener("touchmove", drag);

    // Reset profile position
    profile.addEventListener("transitionend", function () {
      profile.classList.remove("liked", "disliked");
      profile.style.transition = "none";
      profile.style.transform = "none";
    });
  }

  function removeEventListenersProfile(profile) {
    // Mouse events
    profile.removeEventListener("mousedown", startDrag);
    profile.removeEventListener("mouseup", endDrag);
    profile.removeEventListener("mousemove", drag);
    profile.removeEventListener("mouseleave", endDrag);

    // Touch events for mobile devices
    profile.removeEventListener("touchstart", startDrag);
    profile.removeEventListener("touchend", endDrag);
    profile.removeEventListener("touchmove", drag);
  }

  function liked(event) {
    console.log("liked");

    profileCurrent.style.transition = "transform 0.3s ease";
    profileCurrent.style.transform = "translateX(1000px) rotate(15deg)";

    const user_id = profileCurrent.querySelector(".user_id").textContent;
    fetch(`${apiPath}/match/like/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user_id }),
    });

    setTimeout(() => {
      swapProfiles();
      updateProfile(profileNext);
    }, 300);
  }

  function disliked(event) {
    console.log("disliked");
    profileCurrent.style.transition = "transform 0.3s ease";
    profileCurrent.style.transform = "translateX(-1000px) rotate(-15deg)";

    const user_id = profileCurrent.querySelector(".user_id").textContent;
    fetch(`${apiPath}/match/dislike/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user_id }),
    });

    setTimeout(() => {
      swapProfiles();
      updateProfile(profileNext);
    }, 300);
  }

  async function getNextProfile(index) {
    return fetch(`${apiPath}/profile/next/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index: index }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          return data;
        } else {
          console.error("Error: Received undefined data from the server");
        }
      })
      .catch((error) => {
        console.error("Error fetching next profile:", error);
      });
  }

  function updateProfile(profile, index = 1) {
    getNextProfile(index)
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
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        const profileAlert = document.querySelector(".profile_end_alert");
        console.log(profileAlert);
        profileCurrent.style.visibility = "hidden";
        profileAlert.style.visibility = "visible";
      });
  }

  function startDrag(event) {
    isDragging = true;
    startPosX = event.clientX || event.touches[0].clientX;
    startPosY = event.clientY || event.touches[0].clientY;
    startTimestamp = Date.now();
    startX = startPosX;
    startY = startPosY;
    profileCurrent.style.transition = "none";
  }

  function endDrag(event) {
    if (!isDragging) return;
    isDragging = false;
    const endPosX = event.clientX || event.changedTouches[0].clientX;
    const deltaX = endPosX - startX;
    const endTime = Date.now();
    const timeDiff = endTime - startTimestamp;
    const velocity = Math.abs(deltaX / timeDiff);

    if (velocity > velocityThreshold) {
      // Apply inertia effect
      const direction = deltaX > 0 ? 1 : -1;
      const distance =
        direction *
        Math.min(window.innerWidth / 2, Math.abs(deltaX) * velocity);
      profileCurrent.style.transition = "transform 0.3s ease";
      profileCurrent.style.fillOpacity = `1`;
      profileCurrent.style.transform = `translateX(${distance}px) rotate(${direction * 15}deg)`;
      setTimeout(() => {
        if (direction == 1) {
          liked();
        } else {
          disliked();
        }
      }, 0);
    } else {
      // Normal swipe behavior
      const windowWidth = window.innerWidth / 2;
      if ((Math.abs(deltaX) * 100) / windowWidth > 60) {
        if (deltaX > 0) {
          liked();
        } else {
          disliked();
        }
      } else {
        profileCurrent.style.transition = "transform 0.3s ease";
        profileCurrent.style.transform = "none";
      }
    }
  }

  function drag(event) {
    if (!isDragging) return;
    const currentPosX = event.clientX || event.touches[0].clientX;
    const currentPosY = event.clientY || event.touches[0].clientY;

    const deltaX = currentPosX - startPosX;
    const deltaY = currentPosY - startPosY;

    const rotation = deltaX * 0.1;
    profileCurrent.style.transform = `translateX(${deltaX}px) translateY(${deltaY}px) rotate(${rotation}deg)`;
  }
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
