checkLoginStatus();
function checkLoginStatus() {
  let keyU = localStorage.getItem("KeyOfLogin");
  if (keyU == undefined || keyU == "") {
    window.open("./login.html", "_self");
  }
}
let courseID = localStorage.getItem("MyCorseIndex");

fetchPrice(courseID);
fetchStudent();
async function fetchStudent() {
  try {
    let res = await fetch(
      `https://jesonserverforzee5.herokuapp.com/studentLoginData`
    );
    let data = await res.json();
    findRealStudent(data);
  } catch (error) {
    console.log(error);
  }
}
function findRealStudent(data) {
  let studentKey = localStorage.getItem("KeyOfLogin");

  for (let i = 0; i < data.length; i++) {
    if (studentKey == data[i].userLoginId) {
      document.getElementById("emailStudent").innerText = data[i].email;
      break;
    }
  }
}
async function fetchPrice(index) {
  try {
    let res = await fetch(
      `https://jesonserverforzee5.herokuapp.com/courses/${index}`
    );
    let data = await res.json();
    displayPaymentData(data);
  } catch (error) {
    console.log(error);
  }
}
function displayPaymentData(data) {
  document.getElementById("PriceOfCourse").innerText = data.fees;
}
function redirectToHome() {
  localStorage.setItem("MyCorseIndex", "");
  window.open("./dashboard.html", "_self");
}
