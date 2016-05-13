var audio0 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var audio1 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var audio2 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var audio3 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
var audioerror = new Audio("http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3");
var status = "off"; // on or off status
var number = 0; // count number
var computer = []; //random number 0-3 generated for computer play
var player = [];//number 0-3 clicked by player
var turn = "computer"; // computer or player turn
$("#on").click(function(){  
  turn = "computer"
  if(status==="off")
    {
      status = "on";
      $("#onoff").css("left","25px");
      $("#num").html("--");
    }
  else {
      status = "off";
      $("#onoff").css("left","0px");
      $("#num").html("");
      computer.length = 0 ;
    }
});
$("#start").click(function(){    // on && start
  if(status === "on"){
    number = 1;
    computer.length = 0;
    player.length = 0;
    setTimeout(function(){
      computerMove();
    },1000);
    turn = "computer";
  }
});
function play(a){          //play music and hignlight according to id
  switch(a){
      case 0: audio0.play();
      $("#topright").css("background-color","#FF8888");
      setTimeout(function(){
        $("#topright").css("background-color","#CC0000");
      },40);
        break;
      case 1: audio1.play();
      $("#bottomright").css("background-color","#33CCFF");
      setTimeout(function(){
        $("#bottomright").css("background-color","#003C9D");
      },40);
        break;
      case 2: audio2.play();
      $("#bottomleft").css("background-color","#FFEE99");
      setTimeout(function(){
        $("#bottomleft").css("background-color","#DDAA00");
      },40);
        break;
      case 3: audio3.play();      
      $("#topleft").css("background-color","#99FF99");
      setTimeout(function(){
        $("#topleft").css("background-color","#008800");
      },40);
       break;
    default:break;
    }
}
function computerMove(){         //computer play
  $("#num").html(number);
  for(var i = 0; i < number; i++){
    computer.push(Math.round(Math.random()*3));
  }
  computer.forEach(function(a,i){
    setTimeout(function(){
      play(a);
    },(i+1)*1000);
  });
  turn = "player";
}
$(".gamefield").click(function(){
  if(turn === "player"){
    switch(this.id){
      case "topright": play(0);
        player.push(0);
        break;
      case "bottomright": play(1);
        player.push(1);
        break;
      case "bottomleft": play(2);
        player.push(2);
        break;
      case "topleft": play(3);
        player.push(3);
        break;
      default:break;
    }
    if(!compare(player,computer)){
      player.length = 0;
      audioerror.play();
      computer.forEach(function(a,i){
        setTimeout(function(){
        play(a);
         },(i+2)*1000);
      });
    }
    else if(player.length===computer.length){
      turn = "computer";
      computer.length = 0;
      player.length = 0;
      number++;
      computerMove();
    }    
  }
});
function compare(arr1,arr2){  //arr1,player. arr2 computer. whether the clicked array(player) is right
  for(var i = 0; i < arr1.length; i++){
    if(arr1[i]!==arr2[i])
      return false;
  }
  return true;
}