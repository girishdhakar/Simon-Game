//creating an array to store the colours
var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];  // to store the pattern of game
var userClickedPattern = []; // to store the user that clicked

// detecting when a key was pressed
var started = false;
var level = 0;

$(document).keypress( function(){
    //if not started yet
    if(!started){
        $("#level-title").text("Level " + level);
        setTimeout(function(){
                nextSequence();
            }, 1000);
        started = true;
    }

});

//detecting when a button was clicked by user
$(".btn").click( function(){
    var userChosenColour = $(this).attr("id");  // it gives the color

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

//checking the answer that user clicked
function checkAnswer(currentLevel){
    //user clicked the last button correctly
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
       // console.log("success");

        //if user clicked the right sequence, then upgrading the level
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
      //  console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}

function startOver(){
    started = false;
    gamePattern = [];
    level = 0;
}

function nextSequence(){

    //reset the userClickedPattern array for the next level
    userClickedPattern = [];

    //increasing the level every time when nextSequence() function was called
    level++;

    //updating the h1 with increasing level
    $("#level-title").text("level " + level);

    //selecting the button by Math.random()
    var randomNumber = Math.random();
    randomNumber = 4 * randomNumber;
    randomNumber = Math.floor(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //adding animations to selected button
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
            $("#" + currentColour).removeClass("pressed");
    }, 100);
}