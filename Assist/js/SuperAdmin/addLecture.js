checkLoginStatus();
function checkLoginStatus() {
  let keyU = localStorage.getItem("KeyOfLogin");
  if (keyU == undefined || keyU == "") {
    window.open("./SuperAdminLogin.html", "_self");
  }
}
selectTagoption();
async function selectTagoption() {
  try {
    let url = "http://localhost:3000/courses";
    let res = await fetch(url);
    let data = await res.json();
    addSelectTagOption(data);
  } catch (error) {
    console.log(error);
  }
}
function addSelectTagOption(data) {
  console.log(data);
  data.forEach((ele) => {
    let Optag = document.createElement("option");
    Optag.textContent = ele.name;
    Optag.setAttribute("value", ele.id);
    document.getElementById("CRCName").append(Optag);
  });
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

document
  .getElementById("StudentManForm")
  .addEventListener("submit", AddStudentInClass);

function AddStudentInClass(event) {
  event.preventDefault();
  getDataFromServer();
}
async function getDataFromServer() {
  try {
    let idO = document.getElementById("CRCName").value;
    let url = `http://localhost:3000/courses/${idO}`;
    let res = await fetch(url);
    let data = await res.json();

    check(data.lectures);
  } catch (error) {
    console.log(error);
  }
}
function check(data) {
  let idO = document.getElementById("CRCName").value;
  let obj = {
    LectureName: document.getElementById("lectureTpic").value,
    info: document.getElementById("lectureAbout").value,
    urlLecture: document.getElementById("lectureUrl").value,
    id: Date.now(),
  };
  data.push(obj);
  fetch(`http://localhost:3000/courses/${idO}`, {
    method: "PATCH",
    body: JSON.stringify({
      lectures: data,
    }),
    headers: { "Content-Type": "application/json" },
  });
}

showDataInTable();
async function showDataInTable() {
  try {
    let url = "http://localhost:3000/courses";
    let res = await fetch(url);
    let data = await res.json();
    displayDataInTable(data);
  } catch (error) {
    console.log(error);
  }
}
function displayDataInTable(data) {
  document.getElementById("courseNameTable").innerHTML = "";
  data.map(function (element) {
    element.lectures.map(function (ele, ind2) {
      let dataTB = `
            <td>${ele.id}</td>
            <td>${element.name}</td>
            <td>${ele.LectureName}</td>
            <td>${ele.info}</td>
            <td id="DeleteStudentData" onclick="deleteSTD(${element.id}, ${ind2})">Delete</td>
            `;
      let tr1 = document.createElement("tr");
      tr1.innerHTML = dataTB;
      document.getElementById("courseNameTable").append(tr1);
    });
  });
}
async function deleteSTD(index, ind2) {
  try {
    let res = await fetch(`http://localhost:3000/courses/${index}`);
    let data = await res.json();
    let arr = data.lectures;
    arr.splice(ind2, 1);
    fetch(`http://localhost:3000/courses/${index}`, {
      method: "PATCH",
      body: JSON.stringify({
        lectures: arr,
      }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
}
