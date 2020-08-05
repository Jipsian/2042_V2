var round = 1;
var isAddable = true;
var isFull = false;
var score = 0;
var bestScore = 0;

bestScore = localStorage.getItem("bestScore");
var size = $('#select option:selected').val();

$("div.b:first-child");

/* CREATE / REFRESH GRID */

function createGrid () {
	for (var rows = 0; rows < size; rows++) {
		for (var columns = 0; columns < size; columns++) {
			$("#container").append("<div class='grid' x='" + columns + "' y='" + rows + "'><span></span></div>");
		}
	}

	value = 480 / size;   	
	fontSize = 120;

	$(".grid").width(value);
	$(".grid span").width(value);
	$(".grid").height(value);
	$(".grid").css("fontSize", (fontSize/size));
	initNumbers();
	createArray();	
}

function clearGrid () {
	$(".grid").remove();
};

function refreshGrid () {
	clearGrid();
	createGrid(size);
};

$(document).ready(function () {
	$('#select').prop('selectedIndex',0);
	createGrid(4);
});


/*RELOAD*/

$("#newGame").on("click", function () {
	location.reload();
});		
$(".replay").on("click", function () {
	location.reload();
});


/* FIRST VALUES */

function initNumbers () {
	size = $("#select option:selected").val();
	var firstNumber = 2;
	var secondNumber = 4;
	var firstPosition = Math.round(Math.random() * (size - 1));
	var secondPosition = Math.round(Math.random() * (size - 1));			
	var thirdPosition = Math.round(Math.random() * (size - 1));
	var fourthPosition = Math.round(Math.random() * (size - 1));

	$(".grid[x='" + firstPosition + "'][y='" + secondPosition + "'] span").text(firstNumber);

	if (firstPosition != thirdPosition || secondPosition != fourthPosition) {
		$(".grid[x='" + thirdPosition + "'][y='" + fourthPosition + "'] span").text(secondNumber);	
	} else {
		if (firstPosition == thirdPosition) {
			thirdPosition++;
			if (thirdPosition == 0) {
				$(".grid[x='1'][y='" + fourthPosition + "'] span").text(secondNumber);	
			} else if (thirdPosition == 4) {
				$(".grid[x='3'][y='" + fourthPosition + "'] span").text(secondNumber);	
			} else {
				$(".grid[x='" + thirdPosition + "'][y='" + fourthPosition + "'] span").text(secondNumber);	
			}
		} else if (secondPosition == fourthPosition) {
			fourthPosition++;
			if (fourthPosition == 0) {	
				$(".grid[x='" + thirdPosition + "'][y='1'] span").text(secondNumber);		
			} else if (fourthPosition == 4) {
				$(".grid[x='" + thirdPosition + "'][y='3'] span").text(secondNumber);		
			} else {
				$(".grid[x='" + thirdPosition + "'][y='" + fourthPosition + "'] span").text(secondNumber);		
			}
		}
	}
	addColorsToBlock();
}


/* LISTEN EVENTS */

$(document).keydown(function (e) {
	if (round >= 2) {
		isAddable = false;
	}
	if (e.which == 37) { // GO LEFT BITCH
		createArray();
		moveGrid(e.which);
		handleCollisions(e.which);
		moveGrid(e.which);
		isItFull();
		addNumber();
		addColorsToBlock();
		isItLoose();
		isItGG();
	} else if (e.which == 38) { // GO UP BITCH
		createArray();
		moveGrid(e.which);
		handleCollisions(e.which);
		moveGrid(e.which);
		isItFull();
		addNumber();
		addColorsToBlock();
		isItLoose();
		isItGG();
	} else if (e.which == 39) { // GO RIGHT BITCH
		createArray();
		moveGrid(e.which);
		handleCollisions(e.which);
		moveGrid(e.which);
		isItFull();
		addNumber();
		addColorsToBlock();
		isItLoose();
		isItGG();
	} else if (e.which == 40) { // GO DOWN BITCH
		createArray();
		moveGrid(e.which);
		handleCollisions(e.which);
		moveGrid(e.which);
		isItFull();
		addNumber();
		addColorsToBlock();
		isItLoose();
		isItGG();
	}			
});


/* ADD NUMBER WHEN MOVING */

function addNumber () {
	var two = 2;
	var four = 4;
	var firstPosition = Math.round(Math.random() * (size - 1));
	var secondPosition = Math.round(Math.random() * (size - 1));
	var elem = (".grid[x='" + firstPosition + "'][y='" + secondPosition + "'] span");
	
	if (round == 1) {
		if ($(".grid[x='" + firstPosition + "'][y='" + secondPosition + "'] span").text() == "") {
			$(".grid[x='" + firstPosition + "'][y='" + secondPosition + "'] span").text(two);
			round++;
		} else {
			addNumber();
		}
	} else {
		if (isAddable == true && isFull == false) {
			if (Math.random() >= 0.66) {
				if ($(".grid[x='" + firstPosition + "'][y='" + secondPosition + "'] span").text() == "") {
					$(".grid[x='" + firstPosition + "'][y='" + secondPosition + "'] span").text(four);
					round++;

				} else {
					addNumber();
				}
			} else {
				if ($(".grid[x='" + firstPosition + "'][y='" + secondPosition + "'] span").text() == "") {
					$(".grid[x='" + firstPosition + "'][y='" + secondPosition + "'] span").text(two);
					round++;

				} else {
					addNumber();
				}
			}				
		}
	}
}

function isItFull () {
	var count = 0;

	for (var rows = 0; rows <= size; rows++) {
		for (var columns = 0; columns <= size; columns++) {
			if ($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() == "") {
				count++;
			} 
		}
	}

	if (count == 0) {
		isFull = true;
	}
}


/* MOVE GRID */

function moveGrid (direction) {
	if (direction == 37) { // LEFT BITCH
		for (var rows = 0; rows < size; rows++) {
			for (var columns = 0; columns < size; columns++) {
				if ($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() != "") {
					if ($(".grid[x='" + (columns - 1) + "'][y='" + rows + "'] span").length && $(".grid[x='" + (columns - 1) + "'][y='" + rows + "'] span").text() == "") {
						var temp = $(".grid[x='" + columns + "'][y='" + rows + "'] span").text();
						$(".grid[x='" + (columns - 1) + "'][y='" + rows + "'] span").text(temp);
						$(".grid[x='" + columns + "'][y='" + rows + "'] span").text("");
						columns = 0;
						isAddable = true;
					}
				}
			}
		}
	} else if (direction == 38 ) { // UP BITCH
		for (var columns = 0; columns < size; columns++) {
			for (var rows = 0; rows < size; rows++) {
				if ($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() != "") {
					if ($(".grid[x='" + columns + "'][y='" + (rows - 1)+ "'] span").length && $(".grid[x='" + columns + "'][y='" + (rows - 1) + "'] span").text() == "") {
						var temp = $(".grid[x='" + columns + "'][y='" + rows + "'] span").text();
						$(".grid[x='" + columns + "'][y='" + (rows - 1) + "'] span").text(temp);
						$(".grid[x='" + columns + "'][y='" + rows + "'] span").text("");
						rows = 0;
						isAddable = true;
					}
				}
			}
		}
	} else if (direction == 39 ) { // RIGHT BITCH
		for (var rows = size - 1; rows >= 0; rows--) {
			for (var columns = size - 1; columns >= 0; columns--) {
				if ($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() != "") {
					if ($(".grid[x='" + (columns + 1) + "'][y='" + rows + "'] span").length && $(".grid[x='" + (columns + 1) + "'][y='" + rows + "'] span").text() == "") {
						var temp = $(".grid[x='" + columns + "'][y='" + rows + "'] span").text();
						$(".grid[x='" + (columns + 1) + "'][y='" + rows + "'] span").text(temp);
						$(".grid[x='" + columns + "'][y='" + rows + "'] span").text("");
						columns = size - 1;
						isAddable = true;
					}
				}
			}
		}
	} else if (direction == 40 ) { // DOWN BITCH
		for (var columns = size - 1; columns >= 0; columns--) {
			for (var rows = size - 1; rows >= 0; rows--) {
				if ($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() != "") {
					if ($(".grid[x='" + columns + "'][y='" + (rows + 1)+ "'] span").length && $(".grid[x='" + columns + "'][y='" + (rows + 1) + "'] span").text() == "") {
						var temp = $(".grid[x='" + columns + "'][y='" + rows + "'] span").text();
						$(".grid[x='" + columns + "'][y='" + (rows + 1) + "'] span").text(temp);
						$(".grid[x='" + columns + "'][y='" + rows + "'] span").text("");
						rows = size - 1;
						isAddable = true;
					}
				}
			}
		}
	}
}


/* HANDLE COLLISIONS */

function handleCollisions (direction) {
	if (direction == 37) { // LEFT BITCH
		for (var rows = 0; rows < size; rows++) {
			for (var columns = 0; columns < size; columns++) {
				if ($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() != "") {
					if ($(".grid[x='" + (columns - 1) + "'][y='" + rows + "'] span").text() == $(".grid[x='" + columns + "'][y='" + rows + "'] span").text()) {
						var temp = $(".grid[x='" + columns + "'][y='" + rows + "'] span").text();
						temp = temp * 2;
						score = score + temp;
						$(".grid[x='" + (columns - 1) + "'][y='" + rows + "'] span").text(temp);
						$(".grid[x='" + columns + "'][y='" + rows + "'] span").text("");
						isAddable = true;
					}
				}
			}
		}
	} else if (direction == 38 ) { // UP BITCH
		for (var columns = 0; columns < size; columns++) {
			for (var rows = 0; rows < size; rows++) {
				if ($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() != "") {
					if ($(".grid[x='" + columns + "'][y='" + (rows - 1) + "'] span").text() == $(".grid[x='" + columns + "'][y='" + rows + "'] span").text()) {
						var temp = $(".grid[x='" + columns + "'][y='" + rows + "'] span").text();
						temp = temp * 2;
						score = score + temp;
						$(".grid[x='" + columns + "'][y='" + (rows - 1) + "'] span").text(temp);
						$(".grid[x='" + columns + "'][y='" + rows + "'] span").text("");
						isAddable = true;
					}
				}
			}
		}
	} else if (direction == 39 ) { // RIGHT BITCH
		for (var rows = size - 1; rows >= 0; rows--) {
			for (var columns = size - 1; columns >= 0; columns--) {
				if ($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() != "") {
					if ($(".grid[x='" + (columns + 1) + "'][y='" + rows + "'] span").text() == $(".grid[x='" + columns + "'][y='" + rows + "'] span").text()) {
						var temp = $(".grid[x='" + columns + "'][y='" + rows + "'] span").text();
						temp = temp * 2;
						score = score + temp;
						$(".grid[x='" + (columns + 1) + "'][y='" + rows + "'] span").text(temp);
						$(".grid[x='" + columns + "'][y='" + rows + "'] span").text("");
						isAddable = true;
					}
				}
			}
		}
	} else if (direction == 40 ) { // DOWN BITCH
		for (var columns = size - 1; columns >= 0; columns--) {
			for (var rows = size - 1; rows >= 0; rows--) {
				if ($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() != "") {
					if ($(".grid[x='" + columns + "'][y='" + (rows + 1) + "'] span").text() == $(".grid[x='" + columns + "'][y='" + rows + "'] span").text()) {
						var temp = $(".grid[x='" + columns + "'][y='" + rows + "'] span").text();
						temp = temp * 2;
						score = score + temp;
						$(".grid[x='" + columns + "'][y='" + (rows + 1) + "'] span").text(temp);
						$(".grid[x='" + columns + "'][y='" + rows + "'] span").text("");
						isAddable = true;
					}
				}
			}
		}
	}
	$('#score span').text(score);
}


/* BLOCK COLOR DEPENDING ON NUMBER */

function addColorsToBlock () {
	for (var rows = 0; rows < size; rows++) {
		for (var columns = 0; columns < size; columns++) {
			if (($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() == "2")) {
				$(".grid[x='" + columns + "'][y='" + rows + "']").css("backgroundColor", "#ffff99");
			} else if (($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() == "4")) {
				$(".grid[x='" + columns + "'][y='" + rows + "']").css("backgroundColor", "#ffff66");		        		
			} else if (($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() == "8")) {
				$(".grid[x='" + columns + "'][y='" + rows + "']").css("backgroundColor", "#ffff33");		        		
			} else if (($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() == "16")) {
				$(".grid[x='" + columns + "'][y='" + rows + "']").css("backgroundColor", "#ffff00");
			} else if (($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() == "32")) {
				$(".grid[x='" + columns + "'][y='" + rows + "']").css("backgroundColor", "#ff9900");
			} else if (($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() == "64")) {
				$(".grid[x='" + columns + "'][y='" + rows + "']").css("backgroundColor", "#ff3300");
			} else if (($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() == "128")) {
				$(".grid[x='" + columns + "'][y='" + rows + "']").css("backgroundColor", "#cc3300");
			} else if (($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() == "256")) {
				$(".grid[x='" + columns + "'][y='" + rows + "']").css("backgroundColor", "#ff0000");
			} else if (($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() == "512")) {
				$(".grid[x='" + columns + "'][y='" + rows + "']").css("backgroundColor", "#cc0000");
			} else if (($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() == "1024")) {
				$(".grid[x='" + columns + "'][y='" + rows + "']").css("backgroundColor", "#990000");
			} else if (($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() == "2048")) {
				$(".grid[x='" + columns + "'][y='" + rows + "']").css("backgroundColor", "#800000");
			} else {
				$(".grid[x='" + columns + "'][y='" + rows + "']").css("backgroundColor", "#fff");
			}
		}
	}
}


/* CHECK WIN */	

function isItGG () {
	console.log(bestScore);
	for (var rows = 0; rows < size; rows++) {
		for (var columns = 0; columns < size; columns++) {
				if ($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() == 2048) {
					$('#win').css("display", "inline");
					if (score > parseInt(localStorage.getItem("bestScore"))) {
						localStorage.setItem("bestScore", score);
						bestScore = localStorage.getItem("bestScore");
					}
					$('#bestScore span').text(bestScore);
				}
		}
	}
}


/* CREATE ARRAY */

function create2DArray(numRows, numColumns) {
	let array = new Array(numRows); 
	
	for(let i = 0; i <= numColumns; i++) {
		array[i] = new Array(numColumns); 
	}
	
	return array; 
}
	
var array = create2DArray(size, size); 

function createArray () {
	for (var rows = 0; rows < size; rows++) {
		for (var columns = 0; columns < size; columns++) {
			array[rows][columns] = $(".grid[x='" + columns + "'][y='" + rows + "'] span").text();
		}
	}
}

$("#undo").on("click", function () {
	for (var rows = 0; rows < size; rows++) {
		for (var columns = 0; columns < size; columns++) {
			$(".grid[x='" + columns + "'][y='" + rows + "'] span").text(array[rows][columns]);
		}
	}
	createArray();
	addColorsToBlock();
	round--;		
});


/* CHECK LOOSE */

function isItLoose () {
	count = 0;

	for (var rows = 0; rows < size; rows++) {
		for (var columns = 0; columns < size; columns++) {
			if ($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() == "") {
				count++;
			} 
		}
	}
	for (var rows = 0; rows < size; rows++) {
		for (var columns = 0; columns < size; columns++) {
			if ($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() != "" && $(".grid[x='" + (columns + 1) + "'][y='" + rows + "'] span").text() == $(".grid[x='" + columns + "'][y='" + rows + "'] span").text()) {
				count++;
			}
		}
	}
	for (var columns = 0; columns < size; columns++) {
		for (var rows = 0; rows < size; rows++) {
			if ($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() != "" && $(".grid[x='" + columns + "'][y='" + (rows + 1) + "'] span").text() == $(".grid[x='" + columns + "'][y='" + rows + "'] span").text()) {
				count++;
			}
		}
	}
	for (var columns = size - 1; columns >= 0; columns--) {
		for (var rows = size - 1; rows >= 0; rows--) {
			if ($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() != "" && $(".grid[x='" + columns + "'][y='" + (rows - 1) + "'] span").text() == $(".grid[x='" + columns + "'][y='" + rows + "'] span").text()) {
				count++;
			}
		}
	}
	for (var rows = size - 1; rows >= 0; rows--) {
		for (var columns = size - 1; columns >= 0; columns--) {
			if ($(".grid[x='" + columns + "'][y='" + rows + "'] span").text() != "" && $(".grid[x='" + (columns - 1) + "'][y='" + rows + "'] span").text() == $(".grid[x='" + columns + "'][y='" + rows + "'] span").text()) {
				count++;
			}
		}
	}
	if (count == 0) {
		$('#loose').css("display", "inline");
		if (score > parseInt(localStorage.getItem("bestScore"))) {
			localStorage.setItem("bestScore", score);
			bestScore = localStorage.getItem("bestScore");
		}
		$('#bestScore span').text(bestScore);
	}
}

/* INIT SCORE */

$('#score span').text(score);
$('#bestScore span').text(bestScore);


/* SELECT SIZE GRID */

$('#select option').on("click", function() {
	size = $(this).val();
	refreshGrid();
	score = 0;
	$('#score span').text(score);
});