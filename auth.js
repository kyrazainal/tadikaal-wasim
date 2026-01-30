const PASSWORD = "tadika123";

function login() {
  if (password.value === PASSWORD) {
    localStorage.setItem("login","yes");
    location.href = "dashboard.html";
  } else {
    alert("Password salah");
  }
}

if (location.pathname.includes("dashboard")) {
  if (localStorage.getItem("login") !== "yes") {
    location.href = "index.html";
  }
}
