var currentPlayer = "player1";
var cols = $(".col");
// console.log("slots: ", slots);
// console.log("currentPlayer: ", currentPlayer);
var allSlots = document.getElementsByClassName("slot");
// console.log(allSlots[0].classList.contains("slot"));
var diagonals = [
    [0, 7, 14, 21],
    [1, 8, 15, 22],
    [2, 9, 16, 23],
    [3, 8, 13, 18],
    [4, 9, 14, 19],
    [5, 10, 15, 20],
    [6, 13, 20, 27],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 14, 19, 24],
    [10, 15, 20, 25],
    [11, 16, 21, 26],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
    [14, 21, 28, 35],
    [15, 20, 25, 30],
    [16, 21, 26, 31],
    [17, 22, 27, 32],
    [18, 25, 32, 39],
    [19, 26, 33, 40],
    [20, 27, 34, 41],
    [21, 26, 31, 36],
    [22, 27, 32, 37],
    [23, 28, 33, 38]
];

function startGame() {

    cols.on("mouseover", function (e) {
        var col = $(e.currentTarget);
        var offset = col.offset();
        // console.log(offset);
        $(".arrow").css({
            left: offset.left + 35
        })
    })

    cols.on("click", function (e) {
        // console.log(allSlots);
        var col = $(e.currentTarget);
        var slotsInCol = col.children();
        // console.log("how many slots: ", slotsInCol);


        for (var slot, i = slotsInCol.length - 1; i >= 0; i--) {
            slot = slotsInCol.eq(i);
            if (!slot.hasClass("player1") && !slot.hasClass("player2")) {
                slot.addClass(currentPlayer);
                allSlots = $(".slot");
                break;
            }
            // console.log("slotsInCol: ", slot);
        }

        // console.log("i: ", i);
        if (i === -1) {
            return;
        }

        var slotsInRow = $(".row" + i);
        // console.log('slotsInRow: ', slotsInRow);

        if (checkForVictory(slotsInCol)) {
            // if we make it here there was a column victory!
            // do the victory dance!
            var winSlots = $("." + currentPlayer + ".win");
            winSlots.addClass("star");
            cols.off("click");
            $("h1.congrats-" + currentPlayer).show();
            // console.log('there was a column victory for ', currentPlayer);
        } else if (checkForVictory(slotsInRow)) {
            // if we make it here there was a row victory!
            // do the victory dance!
            var winSlots = $("." + currentPlayer + ".win");
            winSlots.addClass("star");
            $("h1.congrats-" + currentPlayer).show();
            cols.off("click");
            // console.log('there was a row victory for ', currentPlayer);
        } else if (checkForDiagonalVictory()) {
            var winSlots = $("." + currentPlayer + ".win");
            winSlots.addClass("star");
            cols.off("click");
            $("h1.congrats-" + currentPlayer).show();
            // console.log('there was a diagonal victory for ', currentPlayer);
        }


        switchPlayer();

        if (currentPlayer === "player1") {
            $("h2 span").eq(0).addClass("show");
            $("h2 span").eq(1).removeClass("show");
        } else {
            $("h2 span").eq(0).removeClass("show");
            $("h2 span").eq(1).addClass("show");

        }
        // console.log("currentPlayer: ", currentPlayer);
    });
}

function checkForVictory(slots) {
    // console.log('slots in checkForVictory: ', slots);
    var count = 0;
    for (var slot, i = 0; i < slots.length; i++) {
        // wrap any slot in a jQuery object
        slot = $(slots[i]);

        // console.log("slot: ", slot);

        if (slot.hasClass(currentPlayer)) {
            count++;
            slot.addClass("win");
            if (count >= 4) {
                return true;
            }
        }
        else {
            count = 0;
            if (count != 4) {
                slots.removeClass("win");
            }
        }
    }
}
// var arr = [];
function checkForDiagonalVictory() {
    for (let j = 0; j < diagonals.length; j++) {
        var c1 = diagonals[j][0];
        var c2 = diagonals[j][1];
        var c3 = diagonals[j][2];
        var c4 = diagonals[j][3];
        // console.log(allSlots.eq(c1).hasClass("player1"));
        if (allSlots.eq(c1).hasClass("player1") && allSlots.eq(c2).hasClass("player1") && allSlots.eq(c3).hasClass("player1") && allSlots.eq(c4).hasClass("player1")) {
            console.log(diagonals[j]);
            allSlots.eq(c1).addClass("win");
            allSlots.eq(c2).addClass("win");
            allSlots.eq(c3).addClass("win");
            allSlots.eq(c4).addClass("win");
            // console.log("player 1 won diagonal");
            return true;
        }

        if (allSlots.eq(c1).hasClass("player2") && allSlots.eq(c2).hasClass("player2") && allSlots.eq(c3).hasClass("player2") && allSlots.eq(c4).hasClass("player2")) {
            // console.log("player 2 won diagonal");
            allSlots.eq(c1).addClass("win");
            allSlots.eq(c2).addClass("win");
            allSlots.eq(c3).addClass("win");
            allSlots.eq(c4).addClass("win");
            return true;
        }

        // for (let k = 0; k < allSlots; k++) {
        //     var num = allSlots.index(allSlots[k]);
        //     console.log(num);
        //     if (allSlots.eq(num).hasClass("player1")) {
        //         console.log(diagonal);
        //     }

        // }

    }

    // for (var j = 0; j < diagonals.length; j++) {
    //     var check = diagonals[j];
    //     console.log(check);
    //     for (let k = 0; k < check.length; k++) {

    //         // var check1 = check[j][0];
    //         // console.log(check[k]);
    //         if (allSlots[check[k]].classList.contains("player1")) {
    //             // console.log(allSlots[check[k]], j);
    //             if (arr.includes(j)) {
    //                 break;
    //             }
    //             arr.push(j);
    //         }

    //     }
    // }
}


$(".start").on("click", function () {
    $(".overlay").hide();
})


//Function to switch player every turn
function switchPlayer() {
    currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
}




var reset = $(".reset");

reset.on("click", function () {
    restart();
    $(".reset img").removeClass("rotate");
});

reset.on("mouseover", function () {
    $(".reset img").addClass("rotate");
});

reset.on("mouseleave", function () {
    $(".reset img").removeClass("rotate");
});

//Function to Reset
function restart() {
    allSlots.removeClass("player1 player2 win star");
    $("h1").hide();
    startGame();
}

startGame();
