p5.disableFriendlyErrors = true;
let population = [];
let populationTotal = 1000;
let infectedFromStart = 5;

const HEIGHT = 480;
const WIDTH = 1024;

function setup() {
    for (let i = 0; i < infectedFromStart; i++) {
        population.push(new Individual(WIDTH, HEIGHT, Individual.INFECTIOUS));
    }
    for (let i = 0; i < populationTotal - infectedFromStart; i++) {
        population.push(new Individual(WIDTH, HEIGHT, Individual.SUSCEPTIBLE));
    }
    createCanvas(WIDTH, HEIGHT);
    textSize(18);
}

function draw() {
    background(220);
    strokeWeight(4);
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
    stroke('black');
    strokeWeight(0.5);
    text(`Susceptible: ${susceptible.length}, Infectious: ${infectious.length}, Removed: ${removed.length}`, 10, 30);
}

function filterByStatus(status) {
    return population.filter(individual => individual.status == status);
}
