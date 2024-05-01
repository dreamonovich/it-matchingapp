const apiPath = "http://178.154.205.204:8086";
const authToken = localStorage.getItem("authToken");

if (!authToken) {
  window.location.href = "/login";
}

function createProfile(profile) {
  return `
        <div class="col profile">
            <img src="${apiPath}${profile.image}" onerror="this.onerror=null; this.src='images/default.webp'" alt="Profile Image">
            <h2 class="name">${profile.login}</h2>
            <p class="role">${profile.role}</p>
            <p class="stack">${profile.stack}</p>
            <p class="telegram">${profile.telegram_username}</p>
            <p class="age">${profile.age} ${getAgeToken(profile.age)}</p>
            <p class="user_id" style="display: none"></p>
        </div>
    `;
}

async function fetchProfiles() {
  try {
    const response = await fetch(`${apiPath}/match/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${authToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return [];
  }
}

// Function to add profiles to the row
async function addProfilesToRow() {
  const row = document.getElementById("profileRow");
  const profiles = await fetchProfiles();
  profiles.forEach((profile) => {
    const profileHTML = createProfile(profile);
    row.innerHTML += profileHTML;
  });
}

// Call the function to add profiles when the page loads
window.onload = addProfilesToRow;

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
