const { writeFileSync } = require("fs");
let powers = require("./powers.json");

const numberMod = () => {
  const words =
    "kph|meters|metres|seconds|miles|feet|days|minutes|hours|lb|kg|mph";
  const regex = new RegExp(`(\\d,\\d+|\\d+)(\\s|)(${words})`, "g");
  const wordEx = new RegExp(`(${words})`, "g");
  for (type in powers) {
    powers[type].forEach((power, index) => {
      if (!power.match(regex)) return;

      power.match(regex).forEach((w) => {
        const num = parseInt(w.replaceAll(",", ""));
        powers[type][index] = powers[type][index].replaceAll(
          w,
          `{${num.toString().length}} ${w.match(wordEx)[0]}`
        );
      });
    });
    powers[type] = [...new Set(powers[type])];
  }
};

const sortAndFindDistributions = () => {
  const distribution = {};

  for (type in powers) {
    powers[type] = powers[type].sort();
    powers[type].forEach((i) => {
      if (!i.includes(":")) return;
      const val = i.split(":")[0];
      distribution[val] ? distribution[val]++ : (distribution[val] = 1);
    });
  }
  Object.keys(distribution).forEach((i) => {
    if (distribution[i] < 5) delete distribution[i];
  });
  console.log(distribution);
};

const getAnimorphKeys = () => {
  const types = [];
  Object.values(powers)
    .flat()
    .forEach((i) => {
      if (!i.includes("Animorph")) return;
      types.push(
        i
          .replace(/Animorph: \(Transform into an?/g, "")
          .trim()
          .split(" ")
          .slice(1)
          .join(" ")
      );
    });
  console.log([...new Set(types)]);
};

getAnimorphKeys();
writeFileSync("./powers_mod.json", JSON.stringify(powers, null, 2));
