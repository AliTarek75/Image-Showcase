const container = document.getElementById("gallery");
const items = document.getElementsByClassName("imagebox");
let lastItem;

function resize() {
    for (let element of items) {
        if (lastItem != undefined && element.getBoundingClientRect().y != lastItem.getBoundingClientRect().y) {
            let leftOver = container.getBoundingClientRect().right - lastItem.getBoundingClientRect().right;
            let newWidth = (container.clientWidth - leftOver - 8) + "px";
            if (leftOver <= 300) {
                container.style.width = newWidth; 
                return; 
            }
        }
        lastItem = element;
    }

    lastItem = items[items.length - 1];;
    let leftOver = container.getBoundingClientRect().right - lastItem.getBoundingClientRect().right;
    let newWidth = (container.clientWidth - leftOver) + "px";
    container.style.width = newWidth; 
}

window.onload = resize();
window.addEventListener('resize', () => {
    container.style.width = "85%";
    resize()
});

function imageFocus(element) {
    let child = element.firstElementChild;
    const root = document.documentElement;

    let imageApsect = child.naturalWidth / child.naturalHeight;
    let windowApsect = window.innerWidth / window.innerHeight;
    let widthResult;

    if (imageApsect >= windowApsect) {
        widthResult = (window.innerWidth - 60) + "px";
    } else {
        widthResult = imageApsect * (window.innerHeight - 60 - 38) + "px";
    }

    root.style.setProperty("--zoomWidth", widthResult);
    element.classList.add("image-on");
    document.getElementById("panel").style.display = "block";
}   

function imageOutFoucs() {
    for (let element of items) {
        element.classList.remove("image-on");
    }
    document.getElementById("panel").style.display = "none";
}

for (let element of items) {
    element.addEventListener("click", () => {
        imageFocus(element);
    })
}