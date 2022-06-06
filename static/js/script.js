function RPSgame(yourChoice){
    human = yourChoice.id; // human/user choice
    bot = randomChoiceCreation(); // bot choice randomly
    //console.log('bot:' + bot + '\t' + 'human:'+ human)
    
    result = SelectWinner(human, bot);
    //console.log('bot:' + result[1] + '\t' + 'human:'+ result[0])
    
    message = MessageGenerator(result);
    //console.log(message)

    FrontEndModification(human, bot, message);
}

// Generate a Random Number within [0-2]
// Here
// 0 = Rock
// 1 = Paper
// 2 = Scissor
function randomChoiceCreation(){
    randomNunber = Math.floor(Math.random() * 3);
    rpsArray = ['Rock', 'Paper', 'Scissor'];
    return rpsArray[randomNunber]
}

// select if human choice rock and bot choose Scissor, rock will get 1
function SelectWinner(human, bot){
    let database = {
        'Rock' : {'Rock': 0.5, 'Paper': 0, 'Scissor': 1},
        'Paper' : {'Rock': 1, 'Paper': 0.5, 'Scissor': 0},
        'Scissor': {'Rock': 0, 'Paper': 1, 'Scissor': 0.5}
    }
    let humanScore = database[human][bot];
    let botScore = database[bot][human];
    return [humanScore,botScore]
}

// result[0] = human score
// result[1] = bot score
function MessageGenerator(result){
    if(result[0] == 0){
        return {'msg': 'You Lost!', 'color': 'red'};
    }
    else if(result[0] == 0.5){
        return {'msg': 'You Tied!', 'color': 'yellow'};
    }
    else{
        return {'msg': 'You Win!', 'color': 'green'};
    }
}

// this function will remove those 3 images
// then show the human and bot choice images with a message
// the human choiche image will have blue shadow
// the bot choiche image will have red shadow
function FrontEndModification(human, bot, message){
    // create a database containing those image sources
    let imageDatabase = {
        'Rock' : document.getElementById('Rock').src,
        'Paper' : document.getElementById('Paper').src,
        'Scissor' : document.getElementById('Scissor').src
    }
    
    // remove those images
    document.getElementById('Rock').remove();
    document.getElementById('Paper').remove();
    document.getElementById('Scissor').remove();
    
    // Create 3 new div for human choice, message and bot choice
    let humanDiv = document.createElement('div');
    let msgDiv = document.createElement('div');
    let dotDiv = document.createElement('div');

    // push arrtibute valuess into the element
    humanDiv.innerHTML = '<img id="HumanChoice" src="' + imageDatabase[human] +'" alt="" height="150" width="150" style="box-shadow: 0px 10px 50px blue;">'
    msgDiv.innerHTML = '<h1 style="font-size: 60px; padding: 30px; height: 150; width: 150; color: ' + message.color + ';">'+ message.msg +'</h1>'
    dotDiv.innerHTML = '<img id="BotChoice" src="' + imageDatabase[bot] +'" alt="" height="150" width="150" style="box-shadow: 0px 10px 50px red;">'

    // append inside the fex_box div
    document.getElementById("flex_box_id").appendChild(humanDiv);
    document.getElementById("flex_box_id").appendChild(msgDiv);
    document.getElementById("flex_box_id").appendChild(dotDiv);
}