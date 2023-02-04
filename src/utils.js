// Reusable dumb function here

const mapleType = {'DARK': 'Foncé', 'AMBER': 'Ambré', 'CLEAN': 'Claire'};
const tps = 5, tvq = 9.975;

export function getTypeOfMaple(value) {
    return mapleType[value.toUpperCase()];
}

export function getListMapleType() {
    return Object.keys(mapleType);
}

export function getPriceWithTaxe(value) {
    let sum = parseInt(value);
    sum = sum + ((tps/100) * sum);
    sum = sum + ((tvq/100) * sum);
    return (sum).toFixed(2);
}