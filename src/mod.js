const { writeFileSync, fstat } = require("fs");

let powers = require("./powers.json");
const words =
    "kph|meters|metres|seconds|miles|feet|days|minutes|hours|lb|kg|mph";
const regex = new RegExp(`(\\d,\\d+|\\d+)(\\s|)(${words})`, "g");
const wordEx = new RegExp(`(${words})`, "g");
for (type in powers) {
    powers[type].forEach((power, index) => {
        if (!power.match(regex)) return;

        power.match(regex).forEach((w) => {
            // power.match(/(\d),?(\d+)?/g).forEach((raw) => {
            const num = parseInt(w.replaceAll(",", ""));
            powers[type][index] = powers[type][index].replaceAll(
                w,
                `{${num.toString().length}} ${w.match(wordEx)[0]}`
            );

            // });
        });
    });
    powers[type] = [...new Set(powers[type])];
}

writeFileSync("./powers_out.json", JSON.stringify(powers, null, 2));