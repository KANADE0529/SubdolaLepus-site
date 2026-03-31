if (!localStorage.getItem("restrictedAccess")) {
  window.location.href = "dashboard.html";
}

if (!localStorage.getItem("loggedIn")) {
  window.location.href = "index.html";
}