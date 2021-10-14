function calculateCapacity(scores, weights, capacity) {
    var weightsCount = weights.length;
    var maxCost = [capacity + 1];

    for (var i = 0; i <= capacity; i++) {
        maxCost[i] = new Array(weights.length + 1).fill(0);
    }

    for (var t = 0; t < weights.length; t++) {
        for (var s = 1; s <= capacity; s++) {
            if (weights[t] <= s) {
                maxCost[s][t + 1] = Math.max(maxCost[s][t], maxCost[s - weights[t]][t] + scores[t]);
            } else {
                maxCost[s][t + 1] = maxCost[s][t];
            }
        }
    }

    return maxCost[capacity][weightsCount];
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
