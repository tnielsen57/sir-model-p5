let population = [];

const HEIGHT = 480;
const WIDTH = 1024;

function setup() {
    for (let i = 0; i < 1000; i++) {
        let individual = new Individual(WIDTH, HEIGHT);
        population.push(individual);
    }
    createCanvas(WIDTH, HEIGHT);
}

function draw() {
    background(220);
    strokeWeight(4);
    let susceptible = population.filter(human => human.status == Individual.SUSCEPTIBLE);
    let infectious = population.filter(human => human.status == Individual.INFECTIOUS);
    let removed = population.filter(human => human.status == Individual.REMOVED);
    susceptible.forEach(individual => {
        stroke('yellow');
        point(individual.posX, individual.posY);
        individual.move();
    });
    infectious.forEach(individual => {
        stroke('red');
        point(individual.posX, individual.posY);
        infect(individual.posX, individual.posY);
        individual.move();
    });
    removed.forEach(individual => {
        stroke('green');
        point(individual.posX, individual.posY);
        individual.move();
    });
    
    document.getElementById('caption').innerHTML = `Susceptible: ${susceptible.length}, Infectious: ${infectious.length}, Removed: ${removed.length}`;


    /*population.forEach(human => {
        switch (human.status) {
            case Human.HEALTHY:
                stroke('yellow');
                break;
            case Human.INFECTED:
                stroke('red');
                infect(human.posX, human.posY);
                break;
            case Human.CURED_IMMUNE:
                stroke('green');
                break;
        }
        point(human.posX, human.posY);
        human.move();
    });*/
}

function infect(posX, posY) {
    let infectionCandidates = population.filter(individual => Math.abs(posX - individual.posX) <= 2 && Math.abs(posY - individual.posY) <= 2);
    infectionCandidates.forEach(individual => individual.infect());
}