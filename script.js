
class Period{
  constructor(name){
    this.name = name;
    this.students = [];
    this.assignmentMaster = [];
  }

  addStudent(studentToAdd){
    this.array.push(studentToAdd);
  }

  removeStudent(studentsToRemove){
    let n = this.array.indexOf(studentToRemove);
    thisarray.slice(n, n);
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

  clearAllStudents(){
    this.students = [];
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
        this.ponts = points;
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

let p1 = new Period("Period 1", periodOne);
let p2 = new Period("Period 2", periodTwo);

p1.addAllStudents(periodOne);
p1.addAllAssignments(assignments,points)
p1.addAssignmentsToStudents();

console.log(p1)

document.getElementById("Print Student List").addEventListener("click",start);

function start(){
    p = document.getElementById("Periods").value;
    if (p == "period1") {
        whichPeriod = 1;
        students = periodOne;
    } else if (p == "period2") {
        whichPeriod = 2;
        students = periodTwo;
    }
      
    let html= "";

    for(let i = 0; i < students.length; i++){
        html += "<div id=" + i + " onclick='selectStudent(this)'>" + students[i] + "</div>" 
    }      

    document.getElementById("Student Selected").innerHTML = html;
}
   
function selectStudent(div) {
    console.log(div.id);

   for(let i = 0; i < students.length; i++){
        if ( div.id == i){
            document.getElementById("Student Selected").innerHTML =  students[i] ;
            let stu = students[i] 
        
        }
    }

    


        //change the student selected div value from the list to the individual student

        // div.innerHTML = students[div.id]
}