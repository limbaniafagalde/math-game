$(document).ready(function(){
    var currentQuestion;
    var interval;
    var timeLeft = 10;
    var score = 0;
    var currScore;

    $('#highScore').val(0);

    var updateTimeLeft = function (amount) {
      timeLeft += amount;
      $('#time-left').text(timeLeft);
    };
    
    var updateScore = function (amount) {
      score += amount;
      $('#score').text(score);
      currScore = score;
    };
    
    var startGame = function () {
      if (!interval) {
        if (timeLeft === 0) {
          updateTimeLeft(9);
          updateScore(-score);
        }
        interval = setInterval(function () {
          updateTimeLeft(-1);
          if (timeLeft === 0) {
            clearInterval(interval);
            interval = undefined;
            var highScore = parseInt($('#highScore').val());
            console.log(currScore, highScore);
            if( highScore < currScore){
                $('#highScore').val(currScore);
                $('#highScore').text(currScore);
            }
          }
        }, 1000);  
      }      
    };

    var randomNumberGenerator = function (size) {
      return Math.ceil(Math.random() * size);
    };

    var randomOperationGenerator = function (max, min) {
       return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var questionGenerator = function () {

        var question = {};

        const value = document.querySelector("#value");
        let digit = document.querySelector("#limitInput");
        digit.defaultValue= "10";
        value.textContent = digit.value;
        digit.addEventListener("input", (event) => {
        value.textContent = event.target.value;
        });


        var num1 = randomNumberGenerator(Number(digit.value));
        var num2 = randomNumberGenerator(Number(digit.value));
        
        var sum = document.getElementById("sum").checked;
        var subtraction = document.getElementById("subtraction").checked;
        var multiplication = document.getElementById("multiplication").checked;
        var division = document.getElementById("division").checked;
        
        var arr = [];
        arr.push(sum, subtraction, multiplication, division);
        console.log(sum, subtraction, multiplication, division);

        var min;
        var max;
        
        var transaction;
        var operation

        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i], min);
            if(arr[i] && min === undefined){
                min = i;
            }
            if(arr[i]){
                max = i;
            }
            
        }
        
        operation = randomOperationGenerator(max, min);

        if(num1<num2){
            let num3 = num1;
            num1 = num2;
            num2 = num3;
        }
        
      switch (operation) {
        case 0:
            transaction = "+";
            question.answer = num1 + num2;
            question.equation = String(num1) + transaction + String(num2);
            break;
        case 1:
            transaction = "-";
            question.answer = num1 - num2;
            question.equation = String(num1) + transaction + String(num2);
            break;
        case 2:
            transaction = "x";
            question.answer = num1 * num2;
            question.equation = String(num1) + transaction + String(num2);
            break;
        case 3:
            transaction = "/";
            question.answer = num1 / num2;
            question.equation = String(num1) + transaction + String(num2);
            break;              
        default:
            transaction = "+";
            question.answer = num1 + num2;
            question.equation = String(num1) + transaction + String(num2);
            break;
      }


        return question;    
      
    };
    
    var renderNewQuestion = function () {
      currentQuestion = questionGenerator();
      $('#equation').text(currentQuestion.equation);  
    };
    
    var checkAnswer = function (userInput, answer) {
      if (userInput === answer) {
        renderNewQuestion();
        $('#user-input').val('');
        updateTimeLeft(+1);
        updateScore(+1);
      }
    };
    
    $('#user-input').on('keyup', function () {
      startGame();
      checkAnswer(Number($(this).val()), currentQuestion.answer);
    });
    
    renderNewQuestion();
  });