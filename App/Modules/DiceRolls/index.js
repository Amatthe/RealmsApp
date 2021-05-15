// Roll die of specified size
const dieRoll = (size) => {
    return Math.ceil(Math.random() * size);
}

// Generate hit points
export const RollHP = (props) => {

    const {amount, die, bonus} = props;
    
    // Make an amount of consecutive rolls
    let total = 0;
    for (let i=0; i<amount; i++) {
        total += dieRoll(die);
    }

    // Add bonus (listed in data as a multiple of CON bonus)
    total += bonus;
    
    return total;
}

// Make basic ability checks
export const RollCheck = (props) => {
    // Roll twice for advantage/disadvantage and add relevant bonus
    const firstRoll = dieRoll(20) + props;
    const secondRoll = dieRoll(20) + props;

    return `${firstRoll} | ${secondRoll}`
}

// Make attack and damage rolls
export const AttackRoll = (props) => {
    // Roll attack (attack check)
    const attackRoll = RollCheck(props.toHit);
    
    // Variables for tracking damage
    let damageRoll = 0;
    let damageReport = ``
    
    // Roll first part of the damage
    for (let i=0; i<props.hit.baseNumber; i++) {
        damageRoll += dieRoll(props.hit.baseDie);
    }
    damageReport += `${damageRoll + props.hit.bonus} ${props.hit.baseType} damage (`
    
    // Roll all dice again for crit
    for (let i=0; i<props.hit.baseNumber; i++) {
        damageRoll += dieRoll(props.hit.baseDie);
    }
    damageReport += `${damageRoll + props.hit.bonus} if crit)`;
    
    // If there is secondary damage, roll it
    damageRoll = 0;
    if (props.extraNumber) {
        damageReport += `</br>plus `
        for (let i=0; i<props.hit.extraNumber; i++) {
            damageRoll += dieRoll(props.hit.extraDie);
        }
        damageReport += `${damageRoll + props.hit.bonus} ${props.hit.extraType} damage (`
        
        // Roll all dice again for crit
        for (let i=0; i<props.hit.extraNumber; i++) {
            damageRoll += dieRoll(props.hit.extraDie);
        }
        damageReport += `${damageRoll + props.hit.bonus} if crit)`;
    };

    // Output for the modal display
    const attackDisplay = `
        <p class="modal__title">${props.name} attack:</p>
        <p class="modal__value--xl">${attackRoll}</p>
        <p class="modal__value--sm">Two values generated for advantage/disadvantage.</br>If neither applies, use the first value.</p>
        <p class="modal__value">${damageReport}</p>
    `;

    return attackDisplay;
}