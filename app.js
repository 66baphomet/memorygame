document.addEventListener("DOMContentLoaded", ()=>{
    //card options
    let cardArray=[

        {
            name: "fries",
            img: "fries.png",
        },

        {
            name: "fries",
            img: "fries.png",
        },

        {
            name: "burger",
            img: "burger.png",
        },

        {
            name: "burger",
            img: "burger.png",
        },

        {
            name: "shake",
            img: "shake.png",
        },

        {
            name: "shake",
            img: "shake.png",
        },

        {
            name: "pizza",
            img: "pizza.png",
        },

        {
            name: "pizza",
            img: "pizza.png",
        },


        {
            name: "icecream",
            img: "icecream.png",
        },

        {
            name: "icecream",
            img: "icecream.png",
        },

        {
            name: "hotdog",
            img: "hotdog.png",
        },

        {
            name: "hotdog",
            img: "hotdog.png",
        }
    ];

    let b=true;
    let c=true;
    let counter=24;
    const grid=document.querySelector(".grid");
    var cardChosen=[];
    var cardChosenId=[];
    var cardsWon=[];
    const resultDisplay=document.querySelector("#result");

    cardArray.sort(()=> 0.5 - Math.random() );

    function createBoard()
    {
        for(let i=0; i<cardArray.length; i++)
        {
            var card = document.createElement("img");
            card.setAttribute("src", "back.jpg");
            card.setAttribute("data-id", i);
            card.style.height="120px";
            card.style.width="100px";
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

 var audioClick = new Audio("clicksound.mp3");
 var audioBingo= new Audio("bingosound.mp3");
 var audioWin= new Audio("winsound.mp3");
 var audioFailed= new Audio("failed.mp3");

    function flipCard()
    {
      
        var cardId = this.getAttribute("data-id");

    try{
        cardChosen.push(cardArray[cardId].name);
        cardChosenId.push(cardId);
    }
    catch(err){
        cardChosen.pop();
        cardChosenId.pop();
        if(c)
        {
        counter++;
        }
      }
    
    if(c)
    {
    counter--;
    }
    
    if (counter >= 0)
    {
      document.querySelector("#chance").innerHTML = "Chances : " + counter;
    }
    
    if (counter < 0)
            {
                audioFailed.play();
                cardArray = [];
                b = false;
                setTimeout(()=>{
              alert("Chances finished! Game Over.")},1000);
            }

    if(b)
    {
        this.setAttribute('src', cardArray[cardId].img);
    }
    
         if (cardChosen.length == 2)
         {
           setTimeout(checkForMatch, 500);
         }
    }

    function checkForMatch()
    {
        var cards = document.querySelectorAll('img');

        const optionOneId = cardChosenId[0];
        const optionTwoId = cardChosenId[1];

        if(cardChosen[0]===cardChosen[1]   && optionOneId!=optionTwoId)
        {
          audioBingo.play();
            cards[optionOneId].setAttribute("src","bingo.png");
            cards[optionTwoId].setAttribute("src","bingo.png");
            cardsWon.push(cardChosen);

            cardArray[optionTwoId]=undefined;
            cardArray[optionOneId]=undefined;
        }
        else if(optionOneId==optionTwoId)
        {
          audioClick.play();
            cards[optionOneId].setAttribute("src","back.jpg");
            cards[optionTwoId].setAttribute("src","back.jpg");
        }
        else
        {
          audioClick.play();
            cards[optionOneId].setAttribute("src","back.jpg");
            cards[optionTwoId].setAttribute("src","back.jpg");
        }

        cardChosen=[];
        cardChosenId=[];

      if(cardsWon.length===cardArray.length/2 && counter>=0)
      {
        audioWin.play();
        c=false;
        setTimeout(()=>{
        				alert("Congratulations! You have won.");
        				},1000);
      }
      
    }
    createBoard();
});

function restart()
{
    location.reload();
}