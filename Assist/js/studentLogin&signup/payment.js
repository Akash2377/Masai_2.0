checkLoginStatus();
function checkLoginStatus() {
  let keyU = localStorage.getItem("KeyOfLogin");
  if (keyU == undefined || keyU == "") {
    window.open("./login.html", "_self");
  }
}
let courseID = localStorage.getItem("MyCorseIndex");
document.getElementById("form1").addEventListener("submit", EnterOTPSection);
function EnterOTPSection(event) {
  event.preventDefault();
  alert("OTP - 3568");
  document.getElementById("EnterOTP").style.display = "block";
  document.getElementById("GetOTPI").style.display = "none";
  document.getElementById("makePayment").style.display = "block";
}
document.getElementById("form2").addEventListener("submit", PaymentProcess);
function PaymentProcess(event) {
  event.preventDefault();
  let OTPkey = document.getElementById("EnterOTP").value;
  if (OTPkey == "3568") {
    buyTheCourse(courseID);
  } else {
    alert("Enter Valid OTP");
  }
}

function buyTheCourse(index) {
  fetch(`http://localhost:3000/courses/${index}`, {
    method: "PATCH",
    body: JSON.stringify({
      myCourse: true,
      cart: false,
    }),
    headers: { "Content-Type": "application/json" },
  });

  window.open("./paymentSuccessfully.html", "_self");
}
