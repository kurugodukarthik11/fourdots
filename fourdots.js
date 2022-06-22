var player1 = prompt("Player One: Enter Your Name , you are Blue");
var player1_col = 'rgb(86, 151, 255)';

var player2 = prompt("Player Two: Enter Your Name, you are Red");
var player2_col = 'rgb(237, 45, 73)';

var table = $('table tr');

function changecolor(i, j, color) {
    return table.eq(i).find('td').eq(j).find('button').css('background-color', color);
}

function returncolor(i, j) {
    return table.eq(i).find('td').eq(j).find('button').css('background-color');
}

function bottomcheck(j) {
    var colorReport = returncolor(5, j);
    for (var row = 5; row > -1; row--) {
        colorReport = returncolor(row, j);
        if (colorReport === 'rgb(128, 128, 128)') {
            return row
        }
    }
}

function colorcheck(a, b, c, d) {
    return (a === b && a === c && a === d && a !== 'rgb(128, 128, 128)' && a !== undefined);
}

function horizontalcheck() {
    for (var i = 0; i < 6; i++) {
        for (var col = 0; col < 4; col++) {
            if (colorcheck(returncolor(i, col), returncolor(i, col + 1), returncolor(i, col + 2), returncolor(i, col + 3))) {
                return true;
            }
        }
    }
}

function verticalcheck() {
    for (var col = 0; col < 7; col++) {
        for (var i = 0; i < 3; i++) {
            if (colorcheck(returncolor(i, col), returncolor(i + 1, col), returncolor(i + 2, col), returncolor(i + 3, col))) {
                return true;
            }
        }
    }
}

function diagonalcheck() {
    for (var col = 0; col < 5; col++) {
        for (var i = 0; i < 7; i++) {
            if (colorcheck(returncolor(i, col), returncolor(i + 1, col + 1), returncolor(i + 2, col + 2), returncolor(i + 3, col + 3))) {
                return true;
            } else if (colorcheck(returncolor(i, col), returncolor(i - 1, col + 1), returncolor(i - 2, col + 2), returncolor(i - 3, col + 3))) {
                return true;
            }
        }
    }
}

function gameEnd(winningPlayer) {
    for (var col = 0; col < 7; col++) {
        for (var i = 0; i < 7; i++) {
            $('h3').fadeOut('fast');
            $('h2').fadeOut('fast');
            $('h1').text(winningPlayer + " has won! Refresh your browser to play again!");
        }
    }
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1_col;

$('h3').text(player1 + ": it is your turn, please pick a column to drop your blue chip.");

$('.board button').on('click', function () {

    var col = $(this).closest("td").index();

    var bottomAvail = bottomcheck(col);

    changecolor(bottomAvail, col, currentColor);

    if (horizontalcheck() || verticalcheck() || diagonalcheck()) {
        $('h3').fadeOut('fast');
        $('h2').fadeOut('fast');
        $('h1').text(currentPlayer + " has won! Click Restart to play again!");
    }

    currentPlayer = currentPlayer * -1;

    if (currentPlayer === 1) {
        currentName = player1;
        $('h3').text(currentName + ": it is your turn, please pick a column to drop your blue chip.");
        currentColor = player1_col;
    } else {
        currentName = player2
        $('h3').text(currentName + ": it is your turn, please pick a column to drop your red chip.");
        currentColor = player2_col;
    }
})