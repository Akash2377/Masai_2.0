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
// student Management Section
document
  .getElementById("StudentManForm")
  .addEventListener("submit", AddStudentInClass);
var flagcheck = document.getElementById("StudentorAdmin").innerText;
function AddStudentInClass(event) {
  event.preventDefault();
  getDataFromServer();
  async function getDataFromServer() {
    try {
      let url = "https://jesonserver.onrender.com/courses";
      let res = await fetch(url);
      let data = await res.json();
      check(data);
    } catch (error) {
      console.log(error);
    }
  }
}
function check(data) {
  let courseName = document.getElementById("CRCName").value;

  var flag = data.filter(function (el) {
    return el.name == courseName;
  });

  if (flag.length != 0) {
    alert("Course is already Available");
  } else {
    fetch("https://jesonserver.onrender.com/courses", {
      method: "POST",
      body: JSON.stringify({
        name: document.getElementById("CRCName").value,
        fees: document.getElementById("CourseFees").value,
        about: document.getElementById("CRCabout").value,
        courseTime: document.getElementById("CourseTime").value,
        courseDuration: document.getElementById("CRCduration").value,
        fav: false,
        cart: false,
        myCourse: false,
        lectures: [],
      }),
      headers: { "Content-Type": "application/json" },
    });
  }
}

showDataInTable();
async function showDataInTable() {
  try {
    let url = "https://jesonserver.onrender.com/courses";
    let res = await fetch(url);
    let data = await res.json();
    displayDataInTable(data);
  } catch (error) {
    console.log(error);
  }
}
function displayDataInTable(data) {
  document.getElementById("courseNameTable").innerHTML = "";
  data.forEach((element, index) => {
    let dataTB = `
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.fees}</td>
            <td>${element.about}</td>
            <td>${element.courseTime}</td>
            <td>${element.courseDuration}</td>
            <td>${element.lectures.length}</td>
            <td id="DeleteStudentData" onclick="deleteSTD(${element.id})">Delete</td>
            `;
    let tr1 = document.createElement("tr");
    tr1.innerHTML = dataTB;
    document.getElementById("courseNameTable").append(tr1);
  });
}
function deleteSTD(index) {
  fetch(`https://jesonserver.onrender.com/courses/${index}`, {
    method: "DELETE",
    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
    },
  });
  showDataInTable();
}
// student Management Section end
