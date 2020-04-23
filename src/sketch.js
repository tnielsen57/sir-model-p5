p5.disableFriendlyErrors = true;
let population = [];
let populationTotal = 1000;
let infectedFromStart = 5;
let iteration = 0;

const HEIGHT = 500;
const WIDTH_POPULATION = 640;
const WIDTH_GRAPH = 640;

function setup() {
    for (let i = 0; i < infectedFromStart; i++) {
        population.push(new Individual(WIDTH_POPULATION, HEIGHT, Individual.INFECTIOUS));
    }
    for (let i = 0; i < populationTotal - infectedFromStart; i++) {
        population.push(new Individual(WIDTH_POPULATION, HEIGHT, Individual.SUSCEPTIBLE));
    }
    createCanvas(WIDTH_POPULATION + WIDTH_GRAPH, HEIGHT);
    textSize(18);
    background(220);
}

function draw() {
    stroke('black');
    fill(220);
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
    text(`Susceptible: ${susceptible.length}, Infectious: ${infectious.length}, Removed: ${removed.length}`, 10, 30);
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
    point(iteration/2 + WIDTH_POPULATION, -susceptible/2);
    stroke('red');
    point(iteration/2 + WIDTH_POPULATION, -infectious/2);
    stroke('green');
    point(iteration/2 + WIDTH_POPULATION, -removed/2);
    if(infectious != 0) {
        iteration++;
    }
}