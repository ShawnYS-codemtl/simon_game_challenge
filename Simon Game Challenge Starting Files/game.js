
let buttonColours = ["red", "blue", "green", "yellow"];
let randomChosenColour;
let gamePattern = [];

let userClickedPattern = [];

let gameStart = false;

let level = 0;
var index = 0;

function nextSequence(){
    let randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
    userClickedPattern = [];
    console.log("resetting index");
    index = 0;
}

function playSound(name){
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    console.log(index);
    if(userClickedPattern[index] == gamePattern[index]){
        if(index == currentLevel - 1){
            setTimeout(function(){
                nextSequence();
            }, 300);
        }
        else{
            index++;
        }
    }
    else{
        playSound('wrong');
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }   
}

function startOver(){
    level = 0;
    gamePattern = [];
    gameStart = false;
}

$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    if (gameStart == true){
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(level);
    }
});

$(document).keypress(function(event){
    if (gameStart == false){
        nextSequence();
        gameStart = true;
    }
});

