// import method from file system
const { readFileSync } = require('fs');

// parse cli arguments
const args = process.argv.slice(2);
const filename = args[0] || 'example.txt';

switch(filename) {
    case 'example.txt':
    case 'input.txt':
        console.log(`reading '${filename}'...`);
        break;
    default:
        console.log(`Sorry, filename '${filename}' does not exist.`);
        console.log(`Try 'example.txt' or 'input.txt'.`);
        return;
}

// read file synchronously
let caloriesList = readFileSync(`./advent-of-code/day1/${filename}`, 'utf8');
console.log(`reading complete.`);

// TC O(n) - split data by two new lines
const caloriesByElf = caloriesList.split('\n\n'),
    numElves = caloriesByElf.length;

// define array of sum calories, where each value represents the
// total calories the ith elf is carrying.
const sumCaloriesByElf = Array(numElves).fill(0);
let maxCalories = 0,
    elfIdx = 0;

// TC O(n^2) - loop number of elves
for (let i = 0; i < numElves; i++) {
    // TC O(n) - split each element by new line
    const calories = caloriesByElf[i].split('\n');
    let sum = 0;

    // calc sum of calories per elf
    for (const el of calories) sum += Number(el);

    // check if sum is greater than max calories
    if (sum > maxCalories) {
        maxCalories = sum;
        elfIdx = i + 1;
    }

    // assign sum to elf index
    sumCaloriesByElf[i] = sum;
}

console.log(`The elf carrying the most calories is elf '${elfIdx}', carrying '${maxCalories}' calories!`);

/* PART TWO */
// TC O(nlogn) - sort in descending order
sumCaloriesByElf.sort((a, b) => (b - a));

// calc sum calories of top 3 elves carrying the most.
const k = 3;
let sumOfTopThree = 0;

// TC O(1)
for (let i = 0; i < k; i++) sumOfTopThree += sumCaloriesByElf[i];
console.log(`The total calories carried by the top 3 elves are '${sumOfTopThree}' calories!`);