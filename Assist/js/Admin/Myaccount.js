checkLoginStatus();
function checkLoginStatus() {
  let keyU = localStorage.getItem("KeyOfLogin");
  if (keyU == undefined || keyU == "") {
    window.open("./AdminLogin.html", "_self");
  }
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
fetchAllCoursesData();
async function fetchAllCoursesData() {
  try {
    let res = await fetch("http://localhost:3000/courses");
    let data = await res.json();
    showMyCourses(data);
  } catch (error) {
    console.log(error);
  }
}
function showMyCourses(data) {
  data.map(function (ele) {
    let divData = `
                <div id="contentTop">
                  <p>${ele.courseTime}</p>
                  <p>${ele.name}</p>
                </div>
                <div id="contentMiddle">
                  <p>${ele.about}</p>
                  <p>Total lectures Available : ${ele.lectures.length}</p>

                  <div><p><i class="fa-solid fa-laptop"></i><span>Online</span></p><p><i class="fa-solid fa-calendar-days"></i><span>${ele.courseDuration} Weeks</span></p></div>
                </div>
     
                <div id="contentEnd">
                  <button onclick="WatchLecturesinWindow(${ele.id})">See All Lectures</button>
                </div>`;
    let div = document.createElement("div");
    div.innerHTML = divData;
    document.getElementById("appendMyCourses").append(div);
  });
}

// ===============================show myCourse Data end=============================

async function WatchLecturesinWindow(index) {
  document.getElementById("MyCourses").style.display = "none";
  document.getElementById("WatchLectures").style.display = "block";
  try {
    let res = await fetch(`http://localhost:3000/courses/${index}`);
    let data = await res.json();
    showAllLectures(data);
  } catch (error) {
    console.log(error);
  }
}

function showAllLectures(data) {
  document.getElementById("appendWatchLectures").innerHTML = "";
  data.lectures.map(function (element) {
    let divData = `
              <h1>${data.name}</h1>
              <h3>Lecture Title : ${element.LectureName}</h3>
              <p>Information : ${element.info}</p>
              <button onclick="WatchLectureOnYoutube(${data.id},${element.id})">Watch Lecture</button>
                `;
    let div = document.createElement("div");
    div.innerHTML = divData;
    document.getElementById("appendWatchLectures").append(div);
  });
}
async function WatchLectureOnYoutube(index, urlkey) {
  localStorage.setItem("urlKEy", urlkey);
  try {
    let res = await fetch(`http://localhost:3000/courses/${index}`);
    let data = await res.json();
    showOnScreen(data.lectures);
  } catch (error) {
    console.log(error);
  }
}
function showOnScreen(data) {
  document.getElementById("appendVideo").innerHTML = "";
  document.getElementById("WatchLectures").style.display = "none";
  document.getElementById("youtubeVideo").style.display = "block";
  var url;
  var dataKeyURL = localStorage.getItem("urlKEy");
  for (var i = 0; i < data.length; i++) {
    if (data[i].id == dataKeyURL) {
      url = `https://www.youtube.com/embed/${data[i].urlLecture}`;
    }
  }
  localStorage.setItem("urlKEy", "urlkey");
  console.log(url);
  let videoData = ` <iframe
      src="${url}"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>`;
  let div = document.createElement("div");
  div.innerHTML = videoData;
  document.getElementById("appendVideo").append(div);
}
