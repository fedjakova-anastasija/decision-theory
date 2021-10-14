function calculateCapacity(scores, weights, capacity) {
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

document.getElementById("button").addEventListener("click", function() {
    var scores = getParam("cost");
    var weights = getParam("weight");
    var capacity = document.getElementById("capacity").value;
    document.getElementById("result").value = calculateCapacity(scores, weights, capacity);

    return 1;
});

document.getElementById("increment").addEventListener("click", function() {
    var original = document.getElementsByClassName("input-group")[0];
    var clone = original.cloneNode(true);
    clone.querySelector(".cost").value = "";
    clone.querySelector(".weight").value = "";
    original.parentNode.appendChild(clone);
});
