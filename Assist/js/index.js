// function person(age, name, gender) {
//   this.name = name;
//   this.gender = gender;
//   this.age = age;
// }
// let person1 = new person(22, "Akash", "male");
// let person2 = new person(22, "Akash2", "male");
// let person3 = new person(22, "Akash3", "male");
// console.log(person1, person2, person3);

// let personw1 = {
//   name: "John",
//   gender: "male",
// };

// let personw2 = {
//   name: "akash",
//   gender: "male",
// };
// function addDetails(name, gender) {
//   console.log(this.name);
// }
// addDetails.call(personw2, "akash", "male");
// addDetails.call(personw1, "akash", "male");
// addDetails.apply(personw2, ["akash", "male"]);
// addDetails.apply(personw1, ["akash", "male"]);
// let data = addDetails.bind(personw2, "akash", "male");
// data();
