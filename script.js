var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var level=0;
var started=0;

function  nextSequence()
{
   userClickedPattern = [];
   level++;
   $("#level-title").text("Level " + level);
   var randomNumber = Math.floor(Math.random() * 4);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);
 
   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
}

$(".btn").click(function() {

   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
 playSound(userChosenColour);
 animatePress(userChosenColour);
 checkAnswer(userClickedPattern.length-1);
 });

 function playSound(name)
 {
   var audio=new Audio("sounds/"+name+".mp3");
   audio.play();
 }

 function animatePress(currentColor)
 {
   $("."+currentColor).addClass("pressed");
   setTimeout(function()
   {
      $("."+currentColor).removeClass("pressed");
   },100);
 }

 $(document).keypress(function()
 {
   if(started==0)
   {
   $("#level-title").text("level "+level);
   started=1;
   nextSequence();
   }
 });


 function checkAnswer(currLevel)
 {
   if (gamePattern[currLevel] === userClickedPattern[currLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
   }
   else
   {
    $("body").addClass("game-over");
    setTimeout(function()
    {
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
   // console.log("false");
   }
}

function startOver()
{
level=0;
gamePattern=[];
started=1;
}

 