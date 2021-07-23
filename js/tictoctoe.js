//whose turn it is
let activePlayer ='X';
//Stores an array of moves to determine win condition
let selectedSquares = [];

//for placing an x or o in a square
function placeXOrO(squareNumber){
    //ensures a square hasn't benn selected already
    //the .some() method is used to check each element of selectedsquare array
    //to see if it contains the square number clicked on
    if (!selectedSquares.some(element => element.includes(squareNumber))){
        //This variable retrives the html element id that was clicked
        let select = document.getElementById(squareNumber);
        //this condition checks who's turn it is
        if (activePlayer === 'X'){
            //if activePlayeris equal to Xthe x.png is placed
            select.style.backgroundImage ='url("images/4.png")';
        } else{
            //if activePlayer is equal to O the o.png is placed
            select.style.backgroundImage= 'url("images/5.png")';
        }
        //squareNumber and activePlayer are concatenated and added to array
        selectedSquares.push(squareNumber + activePlayer);
        //This calls a function to check for any win condition
        checkWinConditions();
        //This condition is for changing the active player
        if (activePlayer === 'X'){
            //if active player is X change it to O
            activePlayer= 'O';
            //if active player is anything other than x
        }else{
            //change the activeplayer to x
            activePlayer ='X';
        }

        //this function plays placement sound
        audio('./media/eat.wav');
        //this checks if it is commputer turn
        if(activePlayer === 'O'){
             
            //This function disables clicking for comuper choice
            disableClick();
            //This function waits 1 seconds before comuter places images and enable click
            setTimeout(function(){ computersTurn();}, 1000)
        }
        //returning true is needed for our computersTurn() function to work
        return true;
    }
    //This function results in a random square being selected
    function computersTurn() {
        //This boolean is needed for our while loop
        let success = false;
        //This variable stores a random number 0-8
        let pickASquare;
        //This condition allows our while loop to keep trying is a square is selected already
        while(!success){
            //A random number between 0 and 8 is selected
            pickASquare = String(Math.floor(Math.random() * 9 ));
            //if the random number evaluated returns true the square hasn't been selected yet
            if (placeXOrO (pickASquare)){
                //calls the function
                placeXOrO(pickASquare);
                //this changes our boolian and ends loop
                success =true;
            };
        }
    }
}

    //This function parses the selected squares array to search for win condition
    //draw winlie function is called to draw line if condition is met
    function  checkWinConditions(){
        //X O 1,2 condition
        if   (arrayIncludes('0X', '1X', '2X')){ drawWinLines(50, 100, 558,100)}
        else if (arrayIncludes('3X', '4X', '5X')){ drawWinLines(50, 304, 558,304)}
        else if (arrayIncludes('6X', '7X', '8X')){ drawWinLines(50, 508, 558,508)}
        else if (arrayIncludes('0X', '3X', '6X')){ drawWinLines(100, 50, 100, 558)}
        else if (arrayIncludes('1X', '4X', '7X')){ drawWinLines(304, 50, 304, 558)}
        else if (arrayIncludes('2X', '5X', '8X')){ drawWinLines(508, 50,508, 558)}
        else if (arrayIncludes('6X', '4X', '2X')){ drawWinLines(100, 508, 510,90)}
        else if (arrayIncludes('0X', '4X', '8X')){ drawWinLines(100, 100, 520, 520)}
        else if (arrayIncludes('0O', '1O', '2O')){ drawWinLines(50, 100, 558,100)}
        else if (arrayIncludes('3O', '4O', '5O')){ drawWinLines(50, 304, 558,304)}
        else if (arrayIncludes('6O', '7O', '8O')){ drawWinLines(50, 508, 558,508)}
        else if (arrayIncludes('0O', '3O', '6O')){ drawWinLines(100, 50, 100,558)}
        else if (arrayIncludes('1O', '4O', '7O')){ drawWinLines(304, 50, 304,558)}
        else if (arrayIncludes('2O', '5O', '8O')){ drawWinLines(508, 50, 508, 558)}
        else if (arrayIncludes('6O', '4O', '2O')){ drawWinLines(100, 508, 510,90)}
        else if (arrayIncludes('0O', '4O', '8O')){ drawWinLines(100, 100, 520, 520)}
        //This condition checks for tie . if none o the above conditions rgister and 9
        //squares are selected the code executes
        else if (selectedSquares.length >= 9){
            //This function players the tie game sound
            audio('./media/tie_game.mp3');
            //this function sets a .3 second timer before the resetGame is called
            setTimeout(function() { resetGame(); } , 1000);
        }

        //This function checks if an array includes 3 strings. it is used to check for each win condition
        function arrayIncludes(squareA , squareB, squareC){
            //these 3 variables will be used to check for 3 in a row
            const a = selectedSquares.includes(squareA)
            const b = selectedSquares.includes(squareB)
            const c = selectedSquares.includes(squareC)
            if (a === true && b === true && c === true)  { return true}

        }


    }


    //this function make our body element temporarily unclickable
    function disableClick(){
        body.style.pointerEvents = 'none';
        //make it clickable again after 1 sec
        setTimeout(function() {body.style.pointerEvents ='auto'; }, 1000);
    }

    //this function takes a string parameters of the path you set earlier 
    //for placement sound
    function audio(audioURL) {
        //create a new audio object and pass the path as a parameter
        let audio = new Audio(audioURL);
        audio.play();
    }

    //use html to draw lines
    function drawWinLines (coordX1, coordY1, coordX2, coordY2){
        //This line accesses our html canvas element
        const canvas = document.getElementById('win-lines')
        //this line gives us access to mathods and properties to use on canvas
        const c = canvas.getContext('2d');
        //this line indicates where the start of a line x axis is
        let x1 = coordX1 ,
        //where the end of  a lines y axis is
        y1 = coordY1,
        x2 = coordX2, 
        y2 = coordY2,
         x = x1,
         y = y1;


         //interacts with the canvas
         function animateLineDrawing(){
             //create a loop
             const animationLoop = requestAnimationFrame(animateLineDrawing);
             //this method clears content from last loop iteration
             c.clearRect(0, 0, 608, 608)
             //this starts a new path
             c.beginPath();
             //moves us to starting point for our line
             c.moveTo(x1, y1)
             //end point
             c.lineTo(x, y)
             //sets the width of our line
             c.lineWidth = 10;
             //sets the color 
             c.strokeStyle = 'rgba(70, 255, 33, .8)';
             //draws everything we laid out above
             c.stroke();
             //checks if we've reached the end point
             if (x1 <= x2 && y1 <= y2){
                 //adds 10 to the previous end x point
                 if ( x < x2) { x +=10;}
                 //this adds 10 to the previous end y point
                 if (y <y2) {y += 10; }
                 if (x >= x2 && y >= y2){cancelAnimationFrame(animationLoop); }
             }
                 //canceles our animation loop
                 // neccessary for the 6 , 4, 2 win condition
                 if (x1 <= x2 && y1 >= y2){
                     if (x < x2) { x += 10;}
                     if (y > y2) { y -= 10; }
                     if (x >= x2 && y <= y2){cancelAnimationFrame(animationLoop);}
                 }
             }


             //clear our canvas after our win line is drawn
             function clear() {
                 //starts our animation loop
                 const animationLoop =requestAnimationFrame(clear);
                 //clears our canvas
                 c.clearRect(0, 0, 608,608);
                 //stops animation loop
                 cancelAnimationFrame(animationLoop);
             }
             //disallows clicking while the win sound is playing
             disableClick();
             //plays win sound
             audio('./media/winsound.wav');
             //calls main animation loop
             animateLineDrawing();
             //wait 1 second and clear the game and reset
             setTimeout(function () { clear(); resetGame(); }, 1000);
        
         }

         //reset the game
         function resetGame(){
             for (let i= 0; i<9; i++){
                 let square = document.getElementById(String(i))
                 square.style.backgroundImage =''
             }
             selectedSquares= [];
         }
