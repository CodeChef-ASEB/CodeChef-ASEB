document.onkeydown = (e) => {
  if (e.key == 123) {
      e.preventDefault();
  }
  if (e.ctrlKey && e.shiftKey && e.key == 'I') {
      e.preventDefault();
  }
  if (e.ctrlKey && e.shiftKey && e.key == 'C') {
      e.preventDefault();
  }
  if (e.ctrlKey && e.shiftKey && e.key == 'J') {
      e.preventDefault();
  }
  if (e.ctrlKey && e.key == 'U') {
      e.preventDefault();
  }
};

var previousForm = null; // Store the previously selected form

function initializeForm() {
  document.getElementById("subject-dropdown").value = "subject1";
  showMarksForm(); // Trigger the form display on page load
  // Select Subject 1 option
}

function showMarksForm() {
  // Get the selected subject from the dropdown
  var selectedSubject = document.getElementById("subject-dropdown").value;

  // Hide the previously selected form
  if (previousForm !== null) {
    previousForm.style.display = "none";
  }

  // Show the selected subject form
  if (selectedSubject !== "") {
    var selectedForm = document.getElementById(selectedSubject + "-form");
    if (selectedForm) {
      selectedForm.style.display = "block";
      previousForm = selectedForm; // Update the previously selected form
    }
  }
}

//Validation Function Starts
function validation() {
  var selectedSubject = document.getElementById("subject-dropdown").value;
  var form = document.getElementById(selectedSubject + "-form");
  var inputGroups = form.getElementsByClassName("form-group");

  for (var i = 0; i < inputGroups.length; i++) {
    var inputs = inputGroups[i].getElementsByTagName("input");
    var filledCount = 0;

    for (var j = 0; j < inputs.length; j++) {
      if (inputs[j].value.trim() !== "") {
        filledCount++;
      }
    }

    if (filledCount > 0 && filledCount < inputs.length) {
      for (var j = 0; j < inputs.length; j++) {
        if (inputs[j].value.trim() === "") {
          inputs[j].setAttribute("required", true);
        }
      }
      // document.getElementById("totalmarks").style.display = "none";
      // document.getElementById("highmarks").style.display = "none";
      // document.getElementById("avgmarks").style.display = "none";
      // document.getElementById("grading").style.display = "none";
      // return false; // Stop form submission
    }
  }

  // If all required fields are filled, display the output
  calculateGrade();

  //return false; // or true based on your logic
}

function calculateGrade() {
  // Fetching Values in Variables
  var q1 = parseInt(document.getElementById("q1").value) || 0;
  var hq1 = parseInt(document.getElementById("hq1").value) || 0;
  var aq1 = parseInt(document.getElementById("aq1").value) || 0;
  var q2 = parseInt(document.getElementById("q2").value) || 0;
  var hq2 = parseInt(document.getElementById("hq2").value) || 0;
  var aq2 = parseInt(document.getElementById("aq2").value) || 0;
  var lst1 = parseInt(document.getElementById("lst1").value) || 0;
  var hlst1 = parseInt(document.getElementById("hlst1").value) || 0;
  var alst1 = parseInt(document.getElementById("alst1").value) || 0;
  var lst2 = parseInt(document.getElementById("lst2").value) || 0;
  var hlst2 = parseInt(document.getElementById("hlst2").value) || 0;
  var alst2 = parseInt(document.getElementById("alst2").value) || 0;
  var ms = parseInt(document.getElementById("ms").value) || 0;
  var hms = parseInt(document.getElementById("hms").value) || 0;
  var ams = parseInt(document.getElementById("ams").value) || 0;
  var prj = parseInt(document.getElementById("prj").value) || 0;
  var hprj = parseInt(document.getElementById("hprj").value) || 0;
  var aprj = parseInt(document.getElementById("aprj").value) || 0;
  var es = parseInt(document.getElementById("es").value) || 0;
  var hes = parseInt(document.getElementById("hes").value) || 0;
  var aes = parseInt(document.getElementById("aes").value) || 0;


  if(q1==0 && hq1==0 && aq1==0 && q2==0 && hq2==0 && aq2==0 && lst1==0 && hlst1==0 && alst1==0 && lst2==0 && hlst2==0 && alst2==0 && ms==0 && hms==0 && ams==0 && prj==0 && hprj==0 && aprj==0 && es==0 && hes==0 && aes==0){
    alert("Warning: Enter your Marks first!");
    return false;
  }

  
  // Check if obtained marks exceed maximum marks
  if (q1 > hq1 || q2 > hq2 || lst1 > hlst1 || lst2 > hlst2 || ms > hms || prj > hprj || es > hes) {
    alert("Warning: Obtained marks exceed maximum marks in one or more components.");
    return false;
  }

  // Check if average marks exceeds maximum marks
  if (aq1 > hq1 || aq2 > hq2 || alst1 > hlst1 || alst2 > hlst2 || ams > hms || aprj > hprj || aes > hes) {
    alert("Warning: Average marks exceed maximum marks in one or more components.");
    return false;
  }

  var totalobt = q1 + q2 + lst1 + lst2 + ms + prj + es;
  var totalhigh = hq1 + hq2 + hlst1 + hlst2 + hms + hprj + hes;
  var totalavg = aq1 + aq2 + alst1 + alst2 + ams + aprj + aes;
  var maxmarks = 0
  if(hq1!=0) maxmarks+=5;
  if(hq2!=0) maxmarks+=5;
  if(hlst1!=0) maxmarks+=10;
  if(hlst2!=0) maxmarks+=10;
  if(hms!=0) maxmarks+=20;
  if(hprj!=0) maxmarks+=20;
  if(hes!=0) maxmarks+=30;

  {
    document.getElementById("totalmarks").innerHTML =
    "Total Marks: " + totalobt;
  }
  {
    document.getElementById("highmarks").innerHTML = "High Marks: " + totalhigh;
  }
  {
    document.getElementById("avgmarks").innerHTML =
      "Average Marks: " + totalavg;
  }

  if (totalobt == totalhigh) {
    if(totalobt >= (maxmarks)*94/100){
      document.getElementById("grading").innerHTML = "Grade: O";
    }
    else{
      document.getElementById("grading").innerHTML = "Grade: A+";
    }
  } else if (
    totalobt <= (totalhigh * 99.99) / 100 &&
    totalobt >= (totalhigh * 95) / 100
  ) {
    document.getElementById("grading").innerHTML = "Grade: A+";
    return false;
  } else if (
    totalobt <= (totalhigh * 94.99) / 100 &&
    totalobt >= (totalhigh * 90) / 100
  ) {
    document.getElementById("grading").innerHTML = "Grade: A";
    return false;
  } else if (
    totalobt <= (totalhigh * 89.99) / 100 &&
    totalobt >= (totalhigh * 80) / 100
  ) {
    document.getElementById("grading").innerHTML = "Grade: B+";
    return false;
  } else if (
    totalobt <= (totalhigh * 94.99) / 100 &&
    totalobt >= (totalhigh * 70) / 100
  ) {
    document.getElementById("grading").innerHTML = "Grade: B";
    return false;
  } else if (totalobt == totalavg) {
    document.getElementById("grading").innerHTML = "Grade: C";
    return false;
    total;
  } else if (obt <= totalavg && obt >= (high * 45) / 100) {
    document.getElementById("grading").innerHTML = "Grade: P";
    return false;
  } else {
    document.getElementById("grading").innerHTML = "Grade: F";
  }
}
