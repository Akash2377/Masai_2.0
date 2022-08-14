checkLoginStatus();
function checkLoginStatus() {
  let keyU = localStorage.getItem("KeyOfLogin");
  if (keyU == undefined || keyU == "") {
    window.open("./AdminLogin.html", "_self");
  }
}

document.querySelector("form").addEventListener("submit", submitData);

function submitData(event) {
  event.preventDefault();
  getDataFromServer();
  async function getDataFromServer() {
    try {
      let url = "https://jesonserverforzee5.herokuapp.com/superAdminLoginData";
      let res = await fetch(url);
      let data = await res.json();
      check(data);
    } catch (error) {
      console.log(error);
    }
  }
}
function check(data) {
  var oldPassSA = document.getElementById("OldPass").value;
  var newPassSA = document.getElementById("NewPass").value;
  var CnewPassSA = document.getElementById("CNewPass").value;
  var flag = data.filter(function (el) {
    return el.password === oldPassSA;
  });
  if (flag.length != 0) {
    if (newPassSA == CnewPassSA) {
      upadtePassInServer();
    } else {
      alert("New password not matched");
    }
  } else {
    alert("Please check your old password");
  }
}

function myFunction() {
  var x = document.getElementById("CNewPass");
  var y = document.getElementById("eye");
  if (x.type === "password") {
    x.type = "text";
    y.src = "../Assist/images/eye-solid.svg";
  } else {
    x.type = "password";
    y.src = "../Assist/images/eye-slash-solid.svg";
  }
}

function upadtePassInServer() {
  fetch(" https://jesonserverforzee5.herokuapp.com/superAdminLoginData/1", {
    method: "PATCH",
    body: JSON.stringify({
      password: document.getElementById("CNewPass").value,
    }),
    headers: { "Content-Type": "application/json" },
  });
  alert("Password updated successfully");
}
function Changepage() {
  var sitname = document.getElementById("profileSelect").value;
  if (sitname == "Profile") {
    window.open("./SuperAdminProfile.html", "_self");
  } else if (sitname == "My Account") {
    window.open("./SuperAdminDashBoard.html", "_self");
  } else if (sitname == "Change Password") {
    window.open("./changePassword.html", "_self");
  } else {
    localStorage.setItem("KeyOfLogin", "");
    window.open("./SuperAdminLogin.html", "_self");
  }
}
