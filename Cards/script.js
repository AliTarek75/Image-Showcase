let cardbox = document.getElementById("cardbox");
let cards = Array.from(cardbox.children);
let halflength = Math.floor(cards.length/2);

for (let i = 0; i < cards.length; i++) {
    let rot = 2*(i - halflength);
    let tra = -50 + i*2;
    
    cards[i].style.transform = `rotate(${rot}deg)`;
    cards[i].style.transform += `translate(-50%, ${tra}%)`;

    cards[i].style.left = (i-halflength) * 20 + "px";
    cards[i].style["z-index"] = i;

    cards[i].addEventListener("mouseenter", (data) => {
        const source = parseInt(data.currentTarget.style["z-index"]);
        if (source == cards.length - 1) return;

        cards[source].children[0].style.transform = `translatey(-30%)`;
        for (let r = source+1; r < cards.length; r++) {
            let rot = 2*(r - halflength);
            let tra = -50 + r*2;
            cards[r].style.transform = `rotate(${rot + r * 1.5}deg)`;
            cards[r].style.transform += `translate(-30%, ${tra + 20-r}%)`; 
        }

        for (let r = source-1; r >= 0; r--) {
            let rot = 2*(r - halflength);
            let tra = -50 + r*2;

            cards[r].style.transform = `rotate(${rot - r*2.5}deg)`;
            cards[r].style.transform += `translate(${-60 + r}%, ${tra + 5-r*7 }%)`; 
        }

    })

    cards[i].addEventListener("mouseleave", (data) => {
        const source = parseInt(data.currentTarget.style["z-index"]);

        if (source !== cards.length - 1) cards[source].children[0].style.transform = `translatey(0%)`;
        
        for (let r = 0; r < cards.length; r++) {
            let rot = 2*(r - halflength);
            let tra = -50 + r*2;

            cards[r].style.left = (r-halflength) * 20 + "px";
            cards[r].style.transform = `rotate(${rot}deg)`;
            cards[r].style.transform += `translate(-50%, ${tra}%)`; 
        }

    })

    cards[i].addEventListener("click", (data) => {
        const source = parseInt(data.currentTarget.style["z-index"]);
        if (source == cards.length - 1) return;
        cards[source].children[0].style.transform += `translatey(30%)`;
        swap(source, cards.length-1);

        for (let r = 0; r < cards.length; r++) {
            let rot = 2*(r - halflength);
            let tra = -50 + r*2;

            cards[r].style.transform = `rotate(${rot}deg)`;
            cards[r].style.transform += `translate(-50%, ${tra}%)`; 
        }
    })
}



function swap(i, r) {
    [cards[i], cards[r]] = [cards[r], cards[i]]
        cards[r].style.left = (r-halflength) * 20 + "px";
        cards[r].style.transform = `rotate(${2*(r-halflength)}deg)`;
        cards[r].style.transform += `translate(-50%, ${-50 + r*2}%)`;
        cards[r].style["z-index"] = r;

        cards[i].style.left = (i-halflength) * 20 + "px";
        cards[i].style.transform = `rotate(${2*(i-halflength)}deg)`;
        cards[i].style.transform += `translate(-50%, ${-50 + i*2}%)`;
        cards[i].style["z-index"] = i;

}

