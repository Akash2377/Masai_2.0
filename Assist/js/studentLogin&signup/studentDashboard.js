checkLoginStatus();
function checkLoginStatus() {
  let keyU = localStorage.getItem("KeyOfLogin");
  if (keyU == undefined || keyU == "") {
    window.open("./login.html", "_self");
  }
}
function OpenDiv() {
  document.getElementById("StudentProfileSec").style.display = "block";
  setTimeout(() => {
    document.getElementById("StudentProfileSec").style.display = "none";
  }, 4000);
}
function SignOutStudent() {
  localStorage.setItem("KeyOfLogin", "");
  checkLoginStatus();
}

function noneAndBlock(val) {
  document.getElementById("StudentProfileSec2").style.display = "none";
  document.getElementById("DemoClasses").style.display = "none";
  document.getElementById("AllCourses").style.display = "none";
  document.getElementById("FavCourses").style.display = "none";
  document.getElementById("MyCourses").style.display = "none";
  document.getElementById("MyCart").style.display = "none";
  document.getElementById("WatchLectures").style.display = "none";
  document.getElementById("youtubeVideo").style.display = "none";
  document.getElementById(val).style.display = "block";
  onProfileClick();
}

// ===========================================================================
// ==============================Student profile =============================
onProfileClick();

function onProfileClick() {
  getDataFromServer();
  async function getDataFromServer() {
    try {
      let url = "http://localhost:3000/studentLoginData";
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
        document.getElementById("StudentProfileUpdate").innerText =
          data[i].name;
        document.getElementById("profileName").innerText = data[i].name;
        document.getElementById("profileMo").innerText = data[i].phone;
        document.getElementById("profileEmail").innerText = data[i].email;
        document.getElementById("dob").innerText = data[i].dateOfBirth;
        document.getElementById("gender").innerText = data[i].gender;
        document.getElementById("address").innerText = data[i].address;
      }
    }
  }
  document
    .getElementById("UpdateSAform")
    .addEventListener("submit", pointOutAdmin);

  async function pointOutAdmin(event) {
    event.preventDefault();
    let keyUser = localStorage.getItem("KeyOfLogin");
    try {
      let res = await fetch("http://localhost:3000/studentLoginData");
      let data = await res.json();
      let index = 1;
      for (var i = 0; i < data.length; i++) {
        if (keyUser == data[i].userLoginId) {
          index = i + 1;
        }
      }
      UpdateSA(index);
    } catch (error) {
      console.log(error);
    }
  }
  function UpdateSA(index) {
    fetch(`http://localhost:3000/studentLoginData/${index}`, {
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
    alert("Profile Update Successfully");
    document.getElementById("UpdateInformation").style.display = "none";
  }
}
function DisplayUpdateSA() {
  document.getElementById("UpdateInformation").style.display = "block";
}
function HideUpdateSA() {
  document.getElementById("UpdateInformation").style.display = "none";
}
// ==================================================================
// ==================================================================
// ====================Show All Courses=================================
fetchAllCoursesData();
async function fetchAllCoursesData() {
  try {
    let res = await fetch("http://localhost:3000/courses");
    let data = await res.json();
    showMyCourses(data);
    showAllCourses(data);
    showFavCourses(data);
    showCartCourses(data);
  } catch (error) {
    console.log(error);
  }
}
function showAllCourses(data) {
  data.map(function (ele) {
    let cartT;
    if (ele.myCourse) {
      cartT = "Already Applied";
    } else if (ele.cart) {
      cartT = "Remove Cart";
    } else {
      cartT = "Add to Cart";
    }
    let favFlag;
    if (ele.fav) {
      favFlag = "Remove Favorite";
    } else {
      favFlag = "Add to Favorite";
    }
    let divData = `
                <div id="contentTop">
                  <p>${ele.courseTime}</p>
                  <p>${ele.name}</p>
                </div>
                <div id="contentMiddle">
                  <p>Become a job-ready software developer in ${
                    ele.courseDuration
                  } weeks at &#8377;${
      ele.fees
    } upfront fees and get a job of INR 5,00,000/- (CTC) or more per year after your course.  </p>
                   <p>${ele.about.slice(0, 50)} ...</p>
                  <p>Pay Only &#8377;${ele.fees} & Earn 5LPA</p>
                  <div><p><i class="fa-solid fa-laptop"></i><span>Online</span></p><p><i class="fa-solid fa-calendar-days"></i><span>${
                    ele.courseDuration
                  } Weeks</span></p></div>
                </div>
                <div id="contentEnd">
                  <button onclick="AddOrRemoveToCart(${ele.id},${ele.cart},${
      ele.myCourse
    })">${cartT}</button>
                  <button onclick="AddOrRemoveToFav(${ele.id},${
      ele.fav
    })">${favFlag}</button>
                </div>`;
    let div = document.createElement("div");
    div.innerHTML = divData;
    document.getElementById("appendAllCourses").append(div);
  });
}
function AddOrRemoveToCart(index, flag, flagPurchase) {
  if (!flagPurchase) {
    if (flag) {
      fetch(`http://localhost:3000/courses/${index}`, {
        method: "PATCH",
        body: JSON.stringify({
          cart: false,
        }),
        headers: { "Content-Type": "application/json" },
      });
      alert("Removed from Cart Successfully");
    } else {
      fetch(`http://localhost:3000/courses/${index}`, {
        method: "PATCH",
        body: JSON.stringify({
          cart: true,
        }),
        headers: { "Content-Type": "application/json" },
      });
      alert("Added to Cart Successfully");
    }
  } else {
    alert("Course Already Purchased");
  }
}

function AddOrRemoveToFav(index, flag) {
  if (flag) {
    fetch(`http://localhost:3000/courses/${index}`, {
      method: "PATCH",
      body: JSON.stringify({
        fav: false,
      }),
      headers: { "Content-Type": "application/json" },
    });
    alert("Removed from Favorites");
  } else {
    fetch(`http://localhost:3000/courses/${index}`, {
      method: "PATCH",
      body: JSON.stringify({
        fav: true,
      }),
      headers: { "Content-Type": "application/json" },
    });
    alert("Added to favorite ");
  }
}
// =============================== End All Courses================================

// ===============================show Favorite Data =============================
function showFavCourses(data) {
  data.map(function (ele) {
    if (ele.fav) {
      let cartT;
      if (ele.myCourse) {
        cartT = "Already Applied";
      } else if (ele.cart) {
        cartT = "Remove Cart";
      } else {
        cartT = "Add to Cart";
      }
      let divData = `
                <div id="contentTop">
                  <p>${ele.courseTime}</p>
                  <p>${ele.name}</p>
                </div>
                <div id="contentMiddle">
                  <p>Become a job-ready software developer in ${
                    ele.courseDuration
                  } weeks at &#8377;${
        ele.fees
      } upfront fees and get a job of INR 5,00,000/- (CTC) or more per year after your course.  </p>
                   <p>${ele.about.slice(0, 50)} ...</p>
                  <p>Pay Only &#8377;${ele.fees} & Earn 5LPA</p>
                  <div><p><i class="fa-solid fa-laptop"></i><span>Online</span></p><p><i class="fa-solid fa-calendar-days"></i><span>${
                    ele.courseDuration
                  } Weeks</span></p></div>
                </div>
                <div id="contentEnd">
                  <button onclick="AddOrRemoveToCart(${ele.id},${ele.cart},${
        ele.myCourse
      })">${cartT}</button>
                  <button onclick="AddOrRemoveToFav(${ele.id},${
        ele.fav
      })">Remove Favorite</button>
                </div>`;
      let div = document.createElement("div");
      div.innerHTML = divData;
      document.getElementById("appendFavCourses").append(div);
    }
  });
}
// ===============================show Favorite Data end =============================
// ===============================show cart Data =============================
function showCartCourses(data) {
  data.map(function (ele) {
    if (ele.cart) {
      let favFlag;
      if (ele.fav) {
        favFlag = "Remove Favorite";
      } else {
        favFlag = "Add to Favorite";
      }
      let divData = `
                <div id="contentTop">
                  <p>${ele.courseTime}</p>
                  <p>${ele.name}</p>
                </div>
                <div id="contentMiddle">
                  <p>Become a job-ready software developer in ${
                    ele.courseDuration
                  } weeks at &#8377;${
        ele.fees
      } upfront fees and get a job of INR 5,00,000/- (CTC) or more per year after your course.  </p>
                   <p>${ele.about.slice(0, 50)} ...</p>
                  <p>Pay Only &#8377;${ele.fees} & Earn 5LPA</p>
                  <div><p><i class="fa-solid fa-laptop"></i><span>Online</span></p><p><i class="fa-solid fa-calendar-days"></i><span>${
                    ele.courseDuration
                  } Weeks</span></p></div>
                </div>
                <div id="contentEnd">
                  <button onclick="BuyCourseFun(${ele.id})">Buy Course</button>
                  <button onclick="AddOrRemoveToCart(${ele.id},${
        ele.cart
      })">Remove Cart</button>
                </div>`;
      let div = document.createElement("div");
      div.innerHTML = divData;
      document.getElementById("appendCartCourses").append(div);
    }
  });
}
// ===============================show cart Data end=============================
// ===============================show myCourse Data =============================

function showMyCourses(data) {
  data.map(function (ele) {
    if (ele.myCourse) {
      let divData = `
                <div id="contentTop">
                  <p>${ele.courseTime}</p>
                  <p>${ele.name}</p>
                </div>
                <div id="contentMiddle">
                  <p>${ele.about.slice(0, 50)} ...</p>
                  <p>Total lectures Available : ${ele.lectures.length}</p>
                  <p>Pay Only &#8377;${ele.fees} & Earn 5LPA</p>
                  <div><p><i class="fa-solid fa-laptop"></i><span>Online</span></p><p><i class="fa-solid fa-calendar-days"></i><span>${
                    ele.courseDuration
                  } Weeks</span></p></div>
                </div>
     
                <div id="contentEnd">
                  <button onclick="WatchLecturesinWindow(${
                    ele.id
                  })">See All Lectures</button>
                </div>`;
      let div = document.createElement("div");
      div.innerHTML = divData;
      document.getElementById("appendMyCourses").append(div);
    }
  });
}

// ===============================show myCourse Data end=============================
function BuyCourseFun(index) {
  localStorage.setItem("MyCorseIndex", index);
  window.open("./payment.html", "_self");
}
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
              <p>Information : ${element.info.slice(1, 50)} ...</p>
              <button onclick="WatchLectureOnYoutube(${data.id},${
      element.id
    })">Watch Lecture</button>
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
