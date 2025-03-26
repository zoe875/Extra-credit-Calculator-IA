
class Period{
  constructor(name){
    this.name = name;
    this.students = [];
    this.assignmentMaster = [];
  }

  addAllStudents(nameArray){
    for(let i = 0; i < nameArray.length; i++){
        this.students.push(new Student(nameArray[i]))
    }
  }

  addAllAssignments(assignmentArray, pointsArray){
    for(let i = 0; i < assignmentArray.length; i++){
        this.assignmentMaster.push(new Assignment(assignmentArray[i],pointsArray[i]))
    }
  }
  
  addAssignmentsToStudents(){
    for(let i = 0; i < this.students.length; i++){
        for(let j = 0; j < this.assignmentMaster.length; j++){
            this.students[i].assignments.push(new Assignment(this.assignmentMaster[j].name,this.assignmentMaster[j].points))
        }
    }
  }

  calculateTotal(student) {
    return student.assignments.reduce((total, assignment) => total + parseInt(assignment.points, 10), 0);
  }
  
}


class Student{
    constructor (name){
        this.name = name;
        this.assignments = [];
    }
}

class Assignment{
    constructor(name,points){
        this.name = name;
        this.points = points;
    }

}
   


let periodOne = [" Ait Djebara Tasnim ", " Austin Emerson ", " Barot Jaymul ", " Benazar Ramos Jesus "," Braun Julius ","Clemens Taisei "," Fitzsimmons Lukas "," Forsman Arvid "," Garibay Zachary "," Givens Boone "," Hammel Maya "," Heyman Vivian ",
" Kelterborn Amalia "," Khayatei Houssaini Hani "," Ligon Berkeley "," Lynch Penn "," McClure Oscar "," Naftalin-Kelman Nevo "," Newman Ella "," Nishioka Sophia "," Payne Isaiah "," Perkovic Daria "," Rappaport Crowther Chloe ", " Swift-Rawal Joshua ",
" Taylor Shira "," Thomas Eloise "," Vix Cade ","Whitman Zoe "]; 

let periodTwo = [ "Amornpan Nowie","Ballard Willa","Bhandari Aarushi","Buffington Liam","Cassidy-Soto Carmen","Curran Brady","Dang Maya","Diagana Jeremie","Distefano Juliet","Ettehadieh Sepehr","Goldblum Kash", "Harmon Tuolu","Hernandez Calderon Sofia",
"Jacobowitz Cole", "Johnson Liv","Kohlmeyer Zoe","Madjidi Mateo","Martin-Fryscak Gabriel","Mascarenhas Ashwin","Needham Sevan","Nishioka Talia","Paz Figueroa Ulises","Ramsdale Nathan","Rodriguez Paz Vanessa","Rodriguez Prado Jazlene","Rosberg Eric",
"Soga Minami","Soto-Vigil-Koon Crescencio","Taylor Benjamin","Taylor Jeremy","Waterman Felix","Watson-Lamprey Singer Clive","Zhang Hairuo"];

let assignments = ["table rewards", "sub", "Mr.smith presentation"];
let points = [2,4,6];
let sum = points.reduce((partialSum, a) => partialSum + a, 0);
let whichPeriod;

let p1 = new Period("Period 1");
let p2 = new Period("Period 2");

if(!localStorage.getItem("p1")){
  p1.addAllStudents(periodOne);
  p1.addAllAssignments(assignments,points)
  p1.addAssignmentsToStudents();
} else {
  p1 = JSON.parse(localStorage.getItem("p1"))
}

if(!localStorage.getItem("p2")){

  p2.addAllStudents(periodTwo);
  p2.addAllAssignments(assignments,points)
  p2.addAssignmentsToStudents();
} else {
  p2 = JSON.parse(localStorage.getItem("p2"))
}



document.getElementById("Print Student List").addEventListener("click",start);

function start(){
  let p = document.getElementById("Periods").value;
  if (p == "period1") {
      whichPeriod = 1;
      buildTable(p1, true);
  } else if (p == "period2") {
      whichPeriod = 2;
      buildTable(p2, true);
  }
}
   
function selectStudent(div) {
    console.log(div.id);

   for(let i = 0; i < students.length; i++){
        if ( div.id == i){
            document.getElementById("Student Selected").innerHTML =  students[i] ;
            let stu = students[i] 
        
        }
    }

}






function saveToStorage(){
  localStorage.setItem("p1",JSON.stringify(p1))
  localStorage.setItem("p2",JSON.stringify(p2))

  console.log(localStorage)
}

function buildTable(period, edit) {
  let html = "<table>";
  html += "<tr><th>Student</th>";


  let totalPointsForPeriod = period.assignmentMaster.reduce((sum, assignment) => sum + parseInt(assignment.points, 10), 0);

  for (let j = 0; j < period.assignmentMaster.length; j++) {
    html += "<th>" + period.assignmentMaster[j].name + "</th>";
  }

  html += "<th>Total Points</th>";
  html += "<th>Extra Credit Percentage</th>";
  html += "</tr>";

  for (let i = 0; i < period.students.length; i++) {
    html += "<tr>";
    html += "<td>" + period.students[i].name + "</td>";
    let totalPoints = 0;

    for (let j = 0; j < period.students[i].assignments.length; j++) {
      let assignment = period.students[i].assignments[j];

      if (edit) {
        html += `<td><input class='${assignment.name}' id='${i}-${j}' value='${assignment.points}'></td>`;
      } else {
        html += `<td>${assignment.points}</td>`;
      }
      totalPoints += parseInt(assignment.points, 10);
    }

    html += `<td>${totalPoints}</td>`;

    
    let extraCreditPercentage = (totalPoints / totalPointsForPeriod) * 100;
    html += `<td>${extraCreditPercentage.toFixed(2)}%</td>`;

    html += "</tr>";
  }

  html += "</table>";
  document.getElementById("dataTable").innerHTML = html;
}

function saveScores(){
  
  let p = (whichPeriod == 1) ? p1 : p2; 

  for (let i = 0; i < p.assignmentMaster.length; i++) { 
      let e = document.getElementsByClassName(p.assignmentMaster[i].name);
      
      for (let j = 0; j < e.length; j++) { 
          p.students[j].assignments[i].points = parseInt(e[j].value, 10); 
      }
  }

  saveToStorage(); 
  buildTable(p, false); 
  
}



function addNewCredit() {
  let assignmentName = prompt("Enter the name of the new extra credit assignment:");
  let points = parseInt(prompt("Enter the points for this assignment:"), 10);
  let newAssignment = new Assignment(assignmentName, points);

  let selectedPeriod = (whichPeriod == 1) ? p1 : p2;

  selectedPeriod.assignmentMaster.push(newAssignment);

  for (let i = 0; i < selectedPeriod.students.length; i++) {
    selectedPeriod.students[i].assignments.push(new Assignment(assignmentName, points));
  }

  
  buildTable(selectedPeriod, true);
  saveToStorage();
}


function removeExtraCredit(){
   let assignmentName = prompt("Enter the name of the extra credit assignment you would like to remove:");
   let selectedPeriod = (whichPeriod == 1) ? p1 : p2;
   let assignmentIndex = selectedPeriod.assignmentMaster.findIndex(assignment => assignment.name == assignmentName);
 
   if (assignmentIndex !== -1) {
    let pointsToRemove = selectedPeriod.assignmentMaster[assignmentIndex].points;
     selectedPeriod.assignmentMaster.splice(assignmentIndex, 1);

     for (let i = 0; i < selectedPeriod.students.length; i++) {
       selectedPeriod.students[i].assignments = selectedPeriod.students[i].assignments.filter(assignment => assignment.name !== assignmentName);
     }
     
     sum -= pointsToRemove;
     buildTable(selectedPeriod, true);
     saveToStorage();
   } else {
     alert("Assignment not found. Please ensure you entered the correct name.");
   }
  }

