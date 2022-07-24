document.querySelector("form").addEventListener("submit", submitData);
function submitData(event) {
  event.preventDefault();
  let LoginType = document.getElementById("SelectLogin").value;
  if (LoginType == "Admin") {
    window.open("./Admin/AdminLogin.html", "_self");
  } else if (LoginType == "Student") {
    window.open("./students/login.html", "_self");
  } else {
    window.open("./superAdmin/SuperAdminLogin.html", "_self");
  }
}
