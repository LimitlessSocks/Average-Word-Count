window.addEventListener("load", function () {
    const result = $("#result");
    const cardCount = $("#cardCount");
    const cardContainer = $("#cardContainer");
    const shortest = $("#shortest");
    const longest = $("#longest");
    const average = $("#average");
    const total = $("#total");
    
    const round = (v) => Math.floor(v * 1000) / 1000;
    
    let cardReferences = [];
    
    const updateResult = () => {
        let sizes = cardReferences.map(
            e => e.val()
                  .split(/\s+/)
                  .filter(e => e)
                  .length
        );
        
        let min = Math.min(...sizes);
        let max = Math.max(...sizes);
        let sum = sizes.reduce((a, b) => a + b, 0);
        let avg = sum / sizes.length;
        
        shortest.text(min);
        longest.text(max);
        average.text(round(avg));
        total.text(sum);
    };
    
    const updateCards = (n) => {
        if(n < 0 || n !== Math.floor(n)) {
            return;
        }
        while(cardReferences.length < n) {
            let next = $("<textarea class=cardInput>");
            next.change(updateResult);
            cardContainer.append(next);
            cardReferences.push(next);
        }
        while(cardReferences.length > n) {
            cardReferences.pop().detach();
        }
    };
    
    cardCount.change(() => {
        let str = cardCount.val();
        let n = parseInt(str, 10);
        updateCards(n);
        updateResult();
    });
    cardCount.change();
});