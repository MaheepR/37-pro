class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    Question.this.title.hide();
    Question.this.input1.hide();
    Question.this.button.hide();
    Question.this.input2.hide();
    //write code to change the background color here
    
    //write code to show a heading for showing the result of Quiz
    textSize(30);
    text("Result of the Quiz",400,100);
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();
    //write condition to check if contestantInfor is not undefined
    if(allContestants!== undefined){
      fill("Blue");
      textSize(20);
    //write code to add a note here
    text("Note : Contenstants who answered correct are highligthed in green color",130,230);
  }
    //write code to highlight contest who answered correctly
    for(var plr in allContestants){
      var correctAns = "2";
      if(correctAns === allContestants[plr].answer){
        fill("Green");
      }else{
        fill("Red");
      }
    }
  }

}
