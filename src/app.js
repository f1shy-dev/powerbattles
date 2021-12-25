const qs = (q) => document.querySelector(q);

const getRandom = (n, r) => {
    var a = new Array(r),
        e = n.length,
        t = new Array(e);
    if (r > e)
        throw new RangeError("getRandom: more elements taken than available");
    for (; r--;) {
        var o = Math.floor(Math.random() * e);
        (a[r] = n[o in t ? t[o] : o]), (t[o] = --e in t ? t[e] : e);
    }
    return a;
};

const powerCard = `<div class="flex flex-col px-6 py-4 m-4 rounded-lg shadow-lg"><p class="text-slate-700 text-xs uppercase mb-1">Player #{{p}}'s abilities</p>`;

(async() => {
    const powerData = await (await fetch("powers.json")).json();
    const items = Object.values(powerData).flat();
    const update = () => {
        const players = parseInt(qs(".players").value);
        const powPerPlayer = parseInt(qs(".pow").value);
        if (!Number.isInteger(players) || !Number.isInteger(powPerPlayer)) return;
        let abilHTML = "";

        [...Array(players)].forEach((_, i) => {
            let card = powerCard.replace("{{p}}", i + 1);

            getRandom(items, powPerPlayer).forEach(
                (i) => (card += `<span class="mt-1.5"> - ${i}</span>`)
            );
            console.log(card);
            abilHTML += card + "</div>";
        });
        (abilHTML.match(/\{\d\}/g) || []).forEach(
            (i) =>
            (abilHTML =
                abilHTML.substring(0, abilHTML.indexOf(i)) +
                Math.random()
                .toString()
                .slice(2, parseInt(i.charAt(1)) + 2) +
                abilHTML.substring(abilHTML.indexOf(i) + 3, abilHTML.length - 1))
        );
        qs(".abilities").innerHTML = abilHTML;
    };

    qs(".players").addEventListener("input", update);
    qs(".pow").addEventListener("input", update);
    qs(".gen").addEventListener("click", update);

    update();
})();