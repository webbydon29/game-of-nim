/*-------------------------------------------------------------------*
 *	Title:			main.js											 *
 *	Author:			Roberto Gomez									 *
 *	Date:			6/10/13											 *
 *	Description:	A robust and versatile take on the Game of Nim	 *
 *					using JS to manipulate DOM elements.			 *
 *-------------------------------------------------------------------*/

function startGame()
{
	var playButton = document.getElementById('playButton');

	var maxColumns = 5;										// Maximum number of columns possible
	var maxTokens = 5;										// Maximum number of tokens possible in each column
	var dx = 400/maxColumns;								// Division sizes in pixels to draw tokens in playArea
	var dy = 350/maxTokens;									// Used for calculating pos_x and pos_y of Token objects

	var numOfCol = getRandomInt(2, maxColumns);				// Actual number of columns in this round
	var tokens = Array(numOfCol);							// Create random 2D array for storing Token objects
	for (var i=0; i<numOfCol; i++)							// First index represents the column
		tokens[i] = Array(getRandomInt(2, maxTokens));		// Second index represents the Token object in each column

	playButton.style.display = 'none';						// Hide playButton link		

	for (var i=0; i<tokens.length; i++) {
		for (var j=0; j<tokens[i].length; j++) {	
			tokens[i][j] = new Token(((20 + i * dx)), 			// Create Token objects and assign to tokens array
			(400 - (dy + j * dy)), i, j);
			document.body.appendChild(tokens[i][j].element);	// Add token element to DOM
			tokens[i][j].element.classList.add('token');		// Apply token CSS class as specified in nim.css

			tokens[i][j].element.style.left = tokens[i][j].pos_x + 'px';	// Specify location of tokens in DOM
			tokens[i][j].element.style.top = tokens[i][j].pos_y + 'px';

			tokens[i][j].element.onclick = removeTokens;		// Add onclick property to trigger removeTokens() function
		}
	}

	// Constructor function for creating token objects
	function Token(pos_x, pos_y, col, num) {
		this.pos_x = pos_x;									// X position for CSS left property
		this.pos_y = pos_y;									// Y position for CSS top property
		this.element = document.createElement('div');		// HTML element placed in DOM
		this.element.col = col;								// Index value for specifying which column token belongs to
		this.element.num = num;								// Index value for specifying placement of token in its column
	}

	/*---------------------------------------------------------------*
	 * removeTokens() function										 *
	 *																 *
	 * Removes the selected token and the tokens above it from the	 *
	 * DOM. Remove tokens starting from the top of the column down	 *
	 * to the selected token. First for loop line removes token		 *
	 * element from the DOM and second removes the the Token object	 *
	 * from the tokens array.										 *
	 *---------------------------------------------------------------*/

	function removeTokens() {
		//alert("token[" + this.col + "][" + this.num + "]");

		for (var j=tokens[this.col].length-1; j>=this.num; j--) {
			tokens[this.col][j].element.parentNode.removeChild(tokens[this.col][j].element);
			tokens[this.col].pop();
		}
	}

	// Returns a random integer between min and max
	// Using Math.round() will give you a non-uniform distribution!
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

/*
NOTES

use document fragments to add elements to DOM faster/more efficiently 
than adding them individually

create area to place tokens on, surface, and use surface.clear() to clear
all references (to avoid memory leaks) and create new round

add way of checking for incompatible browsers

maybe define remove function as a method for each Token object so
it has access to all the objects properties
*/

/*
 * Thanks to
 *
 * MDN for providing getRandomInt() function
 */