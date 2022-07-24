document.querySelector("form").addEventListener("submit", addStudent);
function addStudent(event) {
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
  let userEmail1 = document.getElementById("userEmail").value;
  let mobileU = document.getElementById("userMobile").value;
  var flag = data.filter(function (el) {
    return el.email == userEmail1 || el.phone == mobileU;
  });
  if (flag.length != 0) {
    alert("User Already Sign Up");
  } else {
    fetch("http://localhost:3000/studentLoginData", {
      method: "POST",
      body: JSON.stringify({
        password: document.getElementById("userPassword").value,
        email: document.getElementById("userEmail").value,
        phone: document.getElementById("userMobile").value,
        userLoginId: Date.now(),
      }),
      headers: { "Content-Type": "application/json" },
    });

    window.open("./login.html", "_self");
  }
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
