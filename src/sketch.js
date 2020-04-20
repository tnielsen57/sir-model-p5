p5.disableFriendlyErrors = true;
let population = [];

const HEIGHT = 480;
const WIDTH = 1024;

function setup() {
    for (let i = 0; i < 1000; i++) {
        let individual = new Individual(WIDTH, HEIGHT);
        population.push(individual);
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
        individual.move();
    });
    stroke('red');
    infectious.forEach(individual => {
        point(individual.posX, individual.posY);
        population
            .filter(candidate => Math.abs(individual.posX - candidate.posX) <= 2 && Math.abs(individual.posY - candidate.posY) <= 2)
            .forEach(candidate => candidate.infect());
        individual.move();
    });
    stroke('green');
    removed.forEach(individual => {
        point(individual.posX, individual.posY);
        individual.move();
    });
    stroke('black');
    strokeWeight(0.5);
    text(`Susceptible: ${susceptible.length}, Infectious: ${infectious.length}, Removed: ${removed.length}`, 10, 30);
}

function filterByStatus(status) {
    return population.filter(individual => individual.status == status);
}
