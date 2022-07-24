document.querySelector("form").addEventListener("submit", submitData);
function submitData(event) {
  event.preventDefault();
  getDataFromServer();
  async function getDataFromServer() {
    try {
      let url = "http://localhost:3000/studentLoginData";
      let res = await fetch(url);
      let data = await res.json();
      check(data);
    } catch (error) {
      console.log(error);
    }
  }
}
function check(data) {
  var userEmail1 = document.getElementById("userEmail").value;
  var userPassword1 = document.getElementById("userPassword").value;
  var flag = data.filter(function (el) {
    return el.email === userEmail1 && el.password === userPassword1;
  });
  if (flag.length != 0) {
    for (var i = 0; i < data.length; i++) {
      if (userEmail1 == data[i].email) {
        localStorage.setItem("KeyOfLogin", data[i].userLoginId);
      }
    }
    alert("Login Successfully");
    window.open("./dashboard.html", "_self");
  } else {
    alert("wrong credentials");
  }
  userEmail.value = "";
  userPassword.value = "";
}
function myFunction() {
  var x = document.getElementById("userPassword");
  var y = document.getElementById("eye");
  if (x.type === "password") {
    x.type = "text";
    y.src = "../Assist/images/eye-solid.svg";
  } else {
    x.type = "password";
    y.src = "../Assist/images/eye-slash-solid.svg";
  }
}
