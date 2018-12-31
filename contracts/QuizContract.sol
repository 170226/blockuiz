pragma solidity ^0.4.24;

contract QuizContract{

    uint questionNumber=0;
    uint random;
    
    struct Question {
        uint id ;
        string quest;
        string answer1;
        string answer2;
        string answer3;
        uint RightAnswerindex;
    }

    mapping (uint=>Question) Questions;

    function SetRandom() returns (uint) {
        random = uint(keccak256(block.difficulty,now)) % questionNumber;
        return random;
    }
    
    function CreateQuestion(string quest_ ,string answer1,string answer2,string answer3,uint rightChoice) returns (bool) {
        Questions[questionNumber] = Question(questionNumber, quest_, answer1, answer2, answer3, rightChoice);
        questionNumber+=1;
        uint randNonce = 0;
        random = uint(keccak256(now, msg.sender, randNonce)) % questionNumber;
        return true;
    }

    function getPlayerAddress() returns (address){
        return msg.sender;
    }
    
    function getQuestionNumber() returns(uint) {
        return(questionNumber);
    }
    
    function getQuestion() returns(string) {
        return(Questions[random].quest);
    }
    
    function getQuestionAnsw1() returns(string) {
        return(Questions[random].answer1);
    }
    
    function getQuestionAnsw2() returns(string) {
        return(Questions[random].answer2);
    }
    
    function getQuestionAnsw3() returns(string) {
        return(Questions[random].answer3);
    }
    
    function getQuestionRightAnswer() returns(uint) {
        return(Questions[random].RightAnswerindex);
    }
}
