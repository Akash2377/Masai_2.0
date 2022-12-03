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
      let url = "https://jesonserver.onrender.com/adminLoginData";
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
      pointOutAdmin();
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
async function pointOutAdmin() {
  let keyUser = localStorage.getItem("KeyOfLogin");
  try {
    let res = await fetch("https://jesonserver.onrender.com/adminLoginData");
    let data = await res.json();
    let index = 1;
    for (var i = 0; i < data.length; i++) {
      if (keyUser == data[i].userLoginId) {
        index = i + 1;
      }
    }
    upadtePassInServer(index);
  } catch (error) {
    console.log(error);
  }
}

function upadtePassInServer(index) {
  fetch(`https://jesonserver.onrender.com/adminLoginData/${index}`, {
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
    window.open("./AdminProfile.html", "_self");
  } else if (sitname == "My Account") {
    window.open("./AdminDashBoard.html", "_self");
  } else if (sitname == "Change Password") {
    window.open("./changePassword.html", "_self");
  } else {
    localStorage.setItem("KeyOfLogin", "");
    window.open("./AdminLogin.html", "_self");
  }
}
