fetchAllCoursesData();
async function fetchAllCoursesData() {
  try {
    let res = await fetch("https://jesonserver.onrender.com/courses");
    let data = await res.json();

    showAllCourses(data);
  } catch (error) {
    console.log(error);
  }
}
function showAllCourses(data) {
  data.map(function (ele) {
    let divData = `
                <div id="contentTop">
                  <p>${ele.courseTime}</p>
                  <p>${ele.name}</p>
                </div>
                <div id="contentMiddle">
                  
                   <p>${ele.about.slice(0, 200)} ...</p>
                  <p>Pay Only &#8377;${ele.fees} & Earn 5LPA</p>
                  <div><p><i class="fa-solid fa-laptop"></i><span>Online</span></p><p><i class="fa-solid fa-calendar-days"></i><span>${
                    ele.courseDuration
                  } Weeks</span></p></div>
                </div>
                <div id="contentEnd">
                  <button onclick="openCourse()"> View Details</button>
                </div>
             `;
    let div = document.createElement("div");
    div.innerHTML = divData;
    document.getElementById("appendAllCourses").append(div);
  });
}
function openCourse() {
  window.open("./createCourse.html", "_self");
}
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
