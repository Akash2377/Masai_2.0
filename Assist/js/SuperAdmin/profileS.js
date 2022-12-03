checkLoginStatus();
function checkLoginStatus() {
  let keyU = localStorage.getItem("KeyOfLogin");
  if (keyU == undefined || keyU == "") {
    window.open("./SuperAdminLogin.html", "_self");
  }
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
getDataFromServer();
async function getDataFromServer() {
  try {
    let url = "https://jesonserver.onrender.com/superAdminLoginData";
    let res = await fetch(url);
    let data = await res.json();
    ShowDataOnProfile(data);
  } catch (error) {
    console.log(error);
  }
}

function ShowDataOnProfile(data) {
  var LoginKey = JSON.parse(localStorage.getItem("KeyOfLogin"));
  for (var i = 0; i < data.length; i++) {
    if (LoginKey == data[i].userLoginId) {
      document.getElementById("profileName").innerText = data[i].name;
      document.getElementById("profileMo").innerText = data[i].phone;
      document.getElementById("profileEmail").innerText = data[i].email;
      document.getElementById("dob").innerText = data[i].dateOfBirth;
      document.getElementById("gender").innerText = data[i].gender;
      document.getElementById("address").innerText = data[i].address;
    }
  }
}
document.getElementById("UpdateSAform").addEventListener("submit", UpdateSA);
function UpdateSA(event) {
  event.preventDefault();
  fetch(" https://jesonserver.onrender.com/superAdminLoginData/1", {
    method: "PATCH",
    body: JSON.stringify({
      name: document.getElementById("nameSA").value,
      email: document.getElementById("emailSA").value,
      phone: document.getElementById("phoneSA").value,
      gender: document.getElementById("genderSA").value,
      address: document.getElementById("addressSA").value,
      dateOfBirth: document.getElementById("dateSA").value,
    }),
    headers: { "Content-Type": "application/json" },
  });
  document.getElementById("UpdateInformation").style.display = "none";
}
function DisplayUpdateSA() {
  document.getElementById("UpdateInformation").style.display = "block";
}
function HideUpdateSA() {
  document.getElementById("UpdateInformation").style.display = "none";
}
