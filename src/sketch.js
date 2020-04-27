p5.disableFriendlyErrors = true;
let population = [];
let populationTotal = 0;
let infectedFromStart = 0;
let iteration = 0;

let HEIGHT = 0;
let WIDTH_POPULATION = 0;
let WIDTH_GRAPH = 0;

const SCALE = 3;
const TIME_SCALE = 2;

function setup() {
    HEIGHT = windowHeight;
    WIDTH_POPULATION = windowWidth / 2;
    WIDTH_GRAPH = windowWidth / 2;
    populationTotal = HEIGHT * SCALE;
    infectedFromStart = populationTotal / (HEIGHT / 2);
    for (let i = 0; i < infectedFromStart; i++) {
        population.push(new Individual(WIDTH_POPULATION, HEIGHT, Individual.INFECTIOUS));
    }
    for (let i = 0; i < populationTotal - infectedFromStart; i++) {
        population.push(new Individual(WIDTH_POPULATION, HEIGHT, Individual.SUSCEPTIBLE));
    }
    createCanvas(WIDTH_POPULATION + WIDTH_GRAPH, HEIGHT);
    textSize(18);
    background(180);
    text(`${HEIGHT * SCALE}`, WIDTH_POPULATION + 10, 25);
    text('0', WIDTH_POPULATION + 10, HEIGHT - 10);
}

function draw() {
    stroke('black');
    fill(180);
    rect(0, 0, WIDTH_GRAPH + 2, HEIGHT);
    strokeWeight(3);
    let susceptible = filterByStatus(Individual.SUSCEPTIBLE);
    let infectious = filterByStatus(Individual.INFECTIOUS);
    let removed = filterByStatus(Individual.REMOVED);
    stroke('yellow');
    susceptible.forEach(individual => {
        point(individual.posX, individual.posY);
        individual.update();
    });
    stroke('red');
    infectious.forEach(individual => {
        point(individual.posX, individual.posY);
        population
            .filter(candidate => Math.abs(individual.posX - candidate.posX) <= 2 && Math.abs(individual.posY - candidate.posY) <= 2)
            .forEach(candidate => candidate.infect());
        individual.update();
    });
    stroke('green');
    removed.forEach(individual => {
        point(individual.posX, individual.posY);
        individual.update();
    });
    fill(0);
    stroke('black');
    strokeWeight(0.5);
    text(`Susceptible: ${susceptible.length}, Infectious: ${infectious.length}, Removed: ${removed.length}`, 10, 25);
    drawGraph(susceptible.length, infectious.length, removed.length)
}

function filterByStatus(status) {
    return population.filter(individual => individual.status == status);
}

/*
    Draw the SIR graph - divide all values by 2 to fit the scale
*/
function drawGraph(susceptible, infectious, removed) {
    translate(0, HEIGHT);
    strokeWeight(2);
    stroke('yellow');
    point(iteration / TIME_SCALE + WIDTH_POPULATION, -susceptible / SCALE);
    stroke('red');
    point(iteration / TIME_SCALE + WIDTH_POPULATION, -infectious / SCALE);
    stroke('green');
    point(iteration / TIME_SCALE + WIDTH_POPULATION, -removed / SCALE);
    if (infectious != 0) {
        iteration++;
    }
}