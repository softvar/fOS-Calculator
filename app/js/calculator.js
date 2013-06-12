(function () {

  var len, scaleFactor, Scale, last_displayKey, ch;
})();

function changeColor(element,colour) {
  
  elmnt.style.color=colour;

}

function displayKey(input, inputKey) {
  
  if(checkOperatorDuplicacy(input, inputKey)) {

  len = input.value.length;
  if (len>40 ){
    alert("Limit exceeds");
    return false;
  }
	
  if(input.value == null || input.value == "0")
    input.value = inputKey;
  else if(inputKey == "-1") {
    if (validateExpr(input.value)) { 
      if (checkOperatorDuplicacy(input,inputKey))
        input.value = (-1)*compute(input); 
      }
  }
  else
    input.value += inputKey;

  len = input.value.length;
  this.update(input,len);
  }
       
}

function checkOperatorDuplicacy(input,inputKey) {
  last_displayKey = input.value.substring(input.value.length - 1,input.length);
        
  if ( last_displayKey == '+' ) {
    if ( inputKey == '+' || inputKey == '*' || inputKey == '/' || inputKey == '-' || inputKey == '='  || inputKey == '-1' )  
      return false;
    }
  if ( last_displayKey == '*' ) {
    if ( inputKey == '+' || inputKey == '*' || inputKey == '/' || inputKey == '-' || inputKey == '='  || inputKey == '-1' )  
      return false;
    }
  if ( last_displayKey == '/' ) {
    if ( inputKey == '+' || inputKey == '*' || inputKey == '/' || inputKey == '-' || inputKey == '='  || inputKey == '-1' )  
      return false;
    }
  if ( last_displayKey == '-' ) {
    if ( inputKey == '+' || inputKey == '*' || inputKey == '/' || inputKey == '-' || inputKey == '='  || inputKey == '-1' )  
      return false;
    }  
  
  return true;
}

function compute(input) {
  
  input.value = eval(input.value);
  update(input,input.value.length);
  
  return input.value;
}

function update(input,displayKeyLength) {

  scaleFactor = document.getElementById("display").offsetWidth/18;
  Scale = scaleFactor*displayKeyLength;

  if(Scale > 280)
    document.getElementById("display").style.fontSize  = "3.38em";
  else
    document.getElementById("display").style.fontSize  = "5.7em";

}


function clearall(input) {
  
  document.getElementById("display").style.fontSize = "5.7em";
  input.value = 0;

}

function deleteKey(input) {

  input.value = input.value.substring(0, input.value.length - 1);
}

function checkSyntax(input, inputKey) {

  if (validateExpr(input.value)) { 
    if (checkOperatorDuplicacy(input,inputKey))
      compute(input);
  }
}

function validateExpr(displayExpr) {

  for (var i = 0; i < displayExpr.length; i++) {
      ch = displayExpr.substring(i, i+1);
      if (ch < "0" || ch > "9") {

	 if (ch != "/" && ch != "*" && ch != "+" && ch != "-" && ch != "." && ch != "(" && ch!= ")") {
	   alert("Syntax Error!!");
	   return false;

         }
      }
  }
  return true;
}




