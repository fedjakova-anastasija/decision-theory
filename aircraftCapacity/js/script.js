function calculateCapacity(scores, weights, capacity) {
    var weightsCount = weights.length;
    var maxCost = [capacity + 1];

    for (var i = 0; i <= capacity; i++) {
        maxCost[i] = new Array(weights.length + 1).fill(0);
    }
    var t;
    var s;
    for (t = 1; t <= weights.length; t++) {
        for (s = 1; s <= capacity; s++) {
            if (weights[t] <= s) {
                maxCost[s][t] = Math.max(maxCost[s][t - 1], maxCost[s - weights[t]][t - 1] + scores[t]);
            } else {
                maxCost[s][t] = maxCost[s][t - 1];
            }
        }
    }
    var items = [];
    findItems(items, maxCost, weights, s - 1, t - 1);
    //console.log(findItems(items, maxCost, weights, s - 1, t - 1));
    /*for (var j = 0; j <= weights.length; j++) {
        console.log(scores[items[j]]);
    }
    console.log(items);*/
    showItems(items, scores);
    return maxCost[capacity][weightsCount];
}

//console.log(calculateCapacity([1, 6, 4, 7, 6], [3, 4, 5, 8, 9], 13));


function showItems(items, scores) {
    for (var i = 0; i < scores.length; i++) {
        for (var j = 0; i < items.length; j++) {
            if (scores[items[j]] === document.querySelectorAll(".cost")[i].value) {
                document.getElementsByClassName('input-group')[i].style.border = '2px solid #000000';
            }
        }
    }
}

function findItems(items, maxCost, weights, s, t) {
    if (maxCost[s][t] === 0) {
        return;
    }
    if (maxCost[s][t - 1] === maxCost[s][t]) {
        findItems(items, maxCost, weights, s, t - 1)
    }
    else {
        findItems(items, maxCost, weights, s - weights[t], t - 1);
        items.push(t)
    }
    return items;
}


function getParam(param) {
    var itemsCount = document.getElementsByClassName('input-group').length;
    var items = [];

    for (var i = 0; i < itemsCount; i++) {
        var itemParam = document.querySelectorAll("." + param)[i].value;
        items.push(Number(itemParam));
    }

    return items;
}

document.getElementById("button").addEventListener("click", function () {
    var scores = getParam("cost");
    var weights = getParam("weight");
    var capacity = document.getElementById("capacity").value;

    document.getElementById("result").value = calculateCapacity(scores, weights, capacity);
});

document.getElementById("increment").addEventListener("click", function () {
    var original = document.getElementsByClassName("input-group")[0];
    var clone = original.cloneNode(true);
    clone.querySelector(".cost").value = "";
    clone.querySelector(".weight").value = "";
    original.parentNode.appendChild(clone);
});
