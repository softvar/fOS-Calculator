/*

Description: Simple Calculator with Copy-&-Paste functionality
Developed by: Varun Malhotra
Source Code: https://github.com/softvar/firefoxos-calculator

*/

'use strict';

var Calculator = {
  disp : document.getElementById("display"),
  target: '',
  
  displayKey: function displayKey(inputKey) {
  
  if (inputKey=='×') inputKey='*';
  if (inputKey=='÷') inputKey='/';

  if (this.target.dataset.type == 'operator')
   this.checkOperatorDuplicacy(inputKey) ;
  
  var len = this.disp.value.length;
  
 
  if (len>40 ){
    alert("Limit exceeds");
    return false;
  }
  
  if(this.disp.value == null || this.disp.value == "0")
    {if (this.target.dataset.type=='operator') return;
  else this.disp.value = inputKey;
    }
  else 
    this.disp.value += inputKey;
  
  
  len = this.disp.value.length;
  this.update(len);
       
},

	checkOperatorDuplicacy: function checkOperatorDuplicacy(inputKey) {
		var last_displayKey = this.disp.value.substring(this.disp.value.length - 1,this.disp.value.length);

		if ( last_displayKey == '+' || last_displayKey == '-' || last_displayKey == '/' || last_displayKey == '*' || last_displayKey == '%' || last_displayKey == '^')  { 
		  if ( inputKey == '+' || inputKey == '*' || inputKey == '/' || inputKey == '-' || inputKey == '%' || inputKey == '^')  
		    
		  this.disp.value = this.disp.value.substring(0,this.disp.value.length - 1); return true;
		  } 
		else if ( inputKey == '=' )
		  return false;
		else
		  return true;
	},

	update: function update(displayKeyLength) {
		var scaleFactor = document.getElementById("display").offsetWidth/18;
		var Scale = scaleFactor*displayKeyLength;

		if(Scale > 280)
		  document.getElementById("display").style.fontSize  = "3.38em";
		else
		  document.getElementById("display").style.fontSize  = "5.7em";
	},
  
	compute: function compute() {
		var sign = 1;
		if (this.disp.value[0] == '-') {
			sign = -1;
		}
		this.disp.value = this.calculate(this.disp.value, sign);
		this.update(this.disp.value.length);
		return this.disp.value;
	},

calculate: function calculate(input,sign){
	var opr_list = 
		{	add : '+',
	     	sub : '-', 
	     	div : '/',
	    	mlt : '*',
	    	mod : '%',
	    	pow : '^' 
	    };

	opr_list.opr = [[ [opr_list.mlt] , [opr_list.div] , [opr_list.mod]],
	        [ [opr_list.add] , [opr_list.sub] , [opr_list.pow] ]];

	input = input.replace(/[^0-9%^*\/()\-+.]/g,'');      
	var output, n;
	for ( var i=0, n=opr_list.opr.length; i<n; i++) {

	  var re = new RegExp('(\\d+\\.?\\d*)([\\'+opr_list.opr[i].join('\\')+'])(\\d+\\.?\\d*)');
	  re.lastIndex = 0;                                     
	        while( re.test(input) ){
	     
	 output = this.compute_result(opr_list,sign*RegExp.$1,RegExp.$2,RegExp.$3);

	     if (isNaN(output) || !isFinite(output)) return output; 
	     input  = input.replace(re,output);
	  }
	}
	if(output) {
		return output;
	}
	else {
		return input;
	}
},

   compute_result: function compute_result(opr_list,a,op,b) {
      a=a*1; b=b*1;
      switch(op){
         case opr_list.add: return a+b; break;
         case opr_list.sub: return a-b; break;
         case opr_list.div: return a/b; break;
         case opr_list.mlt: return a*b; break;
         case opr_list.mod: return a%b; break;
         case opr_list.pow: return Math.pow(a,b); break;
         default: null;
      }
   },
  
	clearall: function clearall() {
	    document.getElementById("display").style.fontSize = "5.7em";
	    this.disp.value = 0;
 	},

	deleteKey: function deleteKey() {
		this.disp.value = this.disp.value.substring(0, this.disp.value.length - 1);
		if (this.disp.value== '') {
		  this.disp.value = 0;
		}
	},

	checkSyntax: function checkSyntax(inputKey) {
		if (this.validateExpr(this.disp.value)) { 
		  if (!this.checkOperatorDuplicacy(inputKey))
		    this.compute();
		}
	},

	validateExpr: function validateExpr(displayExpr) {
		if (displayExpr.length == 0) {
		  return false;
		}
		for (var i = 0; i < displayExpr.length; i++) {
		    var ch = displayExpr.substring(i, i+1);
		    if (ch < "0" || ch > "9") {
		        if (ch != "/" && ch != "*" && ch != "+" && ch != "-" && ch != "." && ch != "%" && ch != "^" ) {
		            this.disp.value = 0;
		            return false;
		        }
		    }
		}
		return true;
	},
  
init: function init() {
    //var len, scaleFactor, Scale, last_displayKey, ch;
    document.addEventListener('mousedown', this);   
 },
  
handleEvent: function handleEvent(evt) {
    this.target = evt.target;
    var value = this.target.value;
  
    switch (this.target.dataset.type) {
        case 'key-value':
        case 'operator':
            this.displayKey(value);
        break;
        case 'clear':
          this.clearall();
        break;
        case 'delete':
          this.deleteKey();
        break;
        case 'compute':
          this.checkSyntax(value);
        break;
    }
  
},
  
};


window.addEventListener('load', function load(evt) {
    window.removeEventListener('load', load);
    Calculator.init();
});



