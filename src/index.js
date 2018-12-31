var temp;
if (typeof web3 !== 'undefined') {
	web3Provider = web3.currentProvider;
} else {
	web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
}
web3 = new Web3(web3Provider);
web3.eth.defaultAccount = web3.eth.accounts[0];
var quizContract = web3.eth.contract([
	{
		"constant": false,
		"inputs": [],
		"name": "getQuestionRightAnswer",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getQuestionNumber",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getPlayerAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getQuestionAnsw1",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "quest_",
				"type": "string"
			},
			{
				"name": "answer1",
				"type": "string"
			},
			{
				"name": "answer2",
				"type": "string"
			},
			{
				"name": "answer3",
				"type": "string"
			},
			{
				"name": "rightChoice",
				"type": "uint256"
			}
		],
		"name": "CreateQuestion",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getQuestionAnsw2",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "SetRandom",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getQuestionAnsw3",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getQuestion",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]);

var contractInstance=quizContract.at('0xf69cf1d1056674b513036e0cddc6038fcb4be098');

	function checkAnswer(){
		var quesNumber= localStorage.getItem("QuestionNumber");
		var res=false;
		var img = document.getElementById('image');
		contractInstance.getQuestionRightAnswer.call(function(error, result){
			if(!error){
				if (result.toString()=="0" && document.form1.rep1.checked == true){
					res=true;
				}
				if (result.toString()=="1" && document.form1.rep2.checked == true){
					res=true;
				}	
				if (result.toString()=="2" && document.form1.rep3.checked == true){
					res=true;
				}				  
			}
			else{console.log(error);}
			if(res == false) 
				img.src = "images/close.png";
			else
				img.src = "images/check.png";
		});
	}

function AddQuestion() {
	var quest=$('#NewQuestion').val();
	var ans1=$("#respond1").val();
	var ans2=$("#respond2").val();
	var ans3=$("#respond3").val();
	contractInstance.CreateQuestion(quest.toString(),ans1.toString(),ans2.toString(),ans3.toString(),2,function(error,result){
		if(!error){
			$("#CallBack").append("Success");
			document.getElementById("NewQuestion").value = "";
			document.getElementById("respond1").value = "";
			document.getElementById("respond2").value = "";
			document.getElementById("respond3").value = "";
			window.location.reload();
		}
		else{
			$("#CallBack").append("Fail to add question.");
		}
	});
}

function nextQ() {
	contractInstance.SetRandom.call(function(error, result) {
		if(!error){
			console.log(result.toString());
		}
		else{console.log(error);}
	});
	r();

}

function getQ(quesNumber) {
	contractInstance.getQuestionAnsw1.call(function(error, result){
		if(!error){
			document.getElementById("label1").innerText = result.toString();
		}
		else{console.log(error);}
	});
	contractInstance.getQuestionAnsw2.call(function(error, result){
		if(!error){
			document.getElementById("label2").innerText = result.toString();
		}
		else{console.log(error);}
	});
	contractInstance.getQuestionAnsw3.call(function(error, result){
		if(!error){
			document.getElementById("label3").innerText = result.toString();
		}
		else{console.log(error);}
	});
}

function r() {
	var quesNumber=0;
	localStorage.setItem("QuestionNumber", quesNumber);
	if(temp == "0") {
		//break;
		return;
	}
	contractInstance.getQuestion.call(function(error, result){
		if(error){
			console.log(error);
		}
		else{
			document.getElementById("question").innerText = "Question: " + result.toString();
			getQ(quesNumber);
		}
	});
 }

$(document).ready(function() {
	contractInstance.getQuestionNumber.call(function(error,result){
	   if(!error){
		    document.getElementById("questionNum").innerText = "Total: " + result.toString();
			temp = document.getElementById("questionNum").innerText;
			r();
	   }else{
		   console.log(error);
		}
	});	
});


