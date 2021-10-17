function calculateCapacity(scores, weights, capacity) {
    var weightsCount = weights.length;
    var maxCost = new Array(weightsCount + 1).fill(0);
    var items = [];
    var i;
    var j;

    for (var t = 0; t <= weightsCount; t++) {
        maxCost[t] = new Array(capacity + 1).fill(0);
    }

    for (i = 1; i <= weightsCount; i++) {
        for (j = 1; j <= capacity; j++) {
            if (weights[i - 1] <= j) {
                maxCost[i][j] = Math.max(maxCost[i - 1][j], maxCost[i - 1][j - weights[i - 1]] + scores[i - 1]);
            } else {
                maxCost[i][j] = maxCost[i - 1][j];
            }
        }
    }

    findItems(items, maxCost, weights, i - 1, j - 1);
    showItems(items, scores);

    return maxCost[weightsCount][capacity];
}

function showItems(items) {
    for (var i = 0; i < items.length; i++) {
        document.getElementsByClassName('input-group')[items[i] - 1].style.border = '2px solid #000000';
    }
}

function findItems(items, maxCost, weights, i, j) {
    if (maxCost[i][j] === 0) {
        return;
    }
    if (maxCost[i - 1][j] === maxCost[i][j]) {
        findItems(items, maxCost, weights, i - 1, j)
    } else {
        findItems(items, maxCost, weights, i - 1, j - weights[i - 1]);
        items.push(i)
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
    var itemsCount = document.getElementsByClassName('input-group').length;

    for (var i = 0; i < itemsCount; i++) {
        document.getElementsByClassName('input-group')[i].style.border = '1px solid #ced4da';
    }
    document.getElementById("result").value = calculateCapacity(scores, weights, Number(capacity));
});

document.getElementById("increment").addEventListener("click", function () {
    var original = document.getElementsByClassName("input-group")[0];
    var clone = original.cloneNode(true);
    clone.querySelector(".cost").value = "";
    clone.querySelector(".weight").value = "";
    clone.style.border = '1px solid #ced4da';
    original.parentNode.appendChild(clone);
});
