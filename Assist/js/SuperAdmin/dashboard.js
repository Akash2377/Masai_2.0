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
      if (flagcheck == "Add New Admin") {
        let url = "https://jesonserverforzee5.herokuapp.com/adminLoginData";
        let res = await fetch(url);
        let data = await res.json();
        check(data);
      } else {
        let url = "https://jesonserverforzee5.herokuapp.com/studentLoginData";
        let res = await fetch(url);
        let data = await res.json();
        check(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
function check(data) {
  let userEmail1 = document.getElementById("StudEmail").value;
  let mobileU = document.getElementById("StudPhone").value;
  if (flagcheck == "Add New Admin") {
    var flag = data.filter(function (el) {
      return el.email == userEmail1 || el.phone == mobileU;
    });
  } else {
    var flag = data.filter(function (el) {
      return el.email == userEmail1 || el.phone == mobileU;
    });
  }
  if (flag.length != 0) {
    if (flagcheck == "Add New Admin") {
      alert("Admin is already in the System");
    } else {
      alert("Student is already in the classroom");
    }
  } else {
    if (flagcheck == "Add New Admin") {
      fetch("https://jesonserverforzee5.herokuapp.com/adminLoginData", {
        method: "POST",
        body: JSON.stringify({
          name: document.getElementById("StudName").value,
          gender: document.getElementById("StudGender").value,
          dateOfBirth: document.getElementById("StudDOB").value,
          password: document.getElementById("StudPassword").value,
          email: document.getElementById("StudEmail").value,
          phone: document.getElementById("StudPhone").value,
          address: document.getElementById("StudAddress").value,
          userLoginId: Date.now(),
        }),
        headers: { "Content-Type": "application/json" },
      });
    } else {
      fetch("https://jesonserverforzee5.herokuapp.com/studentLoginData", {
        method: "POST",
        body: JSON.stringify({
          name: document.getElementById("StudName").value,
          gender: document.getElementById("StudGender").value,
          dateOfBirth: document.getElementById("StudDOB").value,
          password: document.getElementById("StudPassword").value,
          email: document.getElementById("StudEmail").value,
          phone: document.getElementById("StudPhone").value,
          address: document.getElementById("StudAddress").value,
          userLoginId: Date.now(),
        }),
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}

showDataInTable();
async function showDataInTable() {
  try {
    if (flagcheck == "Add New Admin") {
      let url = "https://jesonserverforzee5.herokuapp.com/adminLoginData";
      let res = await fetch(url);
      let data = await res.json();
      displayDataInTable(data);
    } else {
      let url = "https://jesonserverforzee5.herokuapp.com/studentLoginData";
      let res = await fetch(url);
      let data = await res.json();
      displayDataInTable(data);
    }
  } catch (error) {
    console.log(error);
  }
}
function displayDataInTable(data) {
  if (flagcheck == "Add New Admin") {
    document.getElementById("AdminTable").innerHTML = "";
    data.forEach((element, index) => {
      let dataTB = `
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td>${element.phone}</td>
            <td>${element.gender}</td>
            <td>${element.dateOfBirth}</td>
            <td id="DeleteStudentData" onclick="deleteSTD(${element.id})">Delete</td>
            `;
      let tr1 = document.createElement("tr");
      tr1.innerHTML = dataTB;
      document.getElementById("AdminTable").append(tr1);
    });
  } else {
    document.getElementById("StudentTableDAta").innerHTML = "";
    data.forEach((element, index) => {
      let dataTB = `
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td>${element.phone}</td>
            <td>${element.gender}</td>
            <td>${element.dateOfBirth}</td>
            <td id="DeleteStudentData" onclick="deleteSTD(${element.id})">Delete</td>
            `;
      let tr1 = document.createElement("tr");
      tr1.innerHTML = dataTB;
      document.getElementById("StudentTableDAta").append(tr1);
    });
  }
}
function deleteSTD(index) {
  if (flagcheck == "Add New Admin") {
    fetch(`https://jesonserverforzee5.herokuapp.com/adminLoginData/${index}`, {
      method: "DELETE",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    showDataInTable();
  } else {
    fetch(
      `https://jesonserverforzee5.herokuapp.com/studentLoginData/${index}`,
      {
        method: "DELETE",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    showDataInTable();
  }
}
