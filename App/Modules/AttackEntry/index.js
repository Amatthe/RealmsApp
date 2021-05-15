import { AttackRoll } from './../DiceRolls/index.js';
import { DisplayModal } from './../ModalOverlay/index.js';

export const MakeAttack = (props) => {
    const attackEntry = document.createElement('div');
    attackEntry.className = 'creature__attack creature__btn';
    attackEntry.id = `creature_attack-${props.name}`;
    let content = '';
    
    // Content builder
    content += `
        <p class="creature__entry">
            <strong><em>${props.name}. `
        
        // Full attack type
        let attackType = '';    
        for (let i=0; i<props.type.length; i++) {
            attackType += `${props.type[i]} `;
        }    
    content += `</strong>${attackType}Attack:</em>
            +${props.toHit} to hit,
            `
        if (props.reach) {content += `reach ${props.reach}, `}
        else if (props.range) {content += `range ${props.range}, `}
        else if (props.reach && props.range) {content += `reach ${props.range} or range ${props.range}, `}
        else {content += '[ERROR]'};
    content += `
        ${props.target}.
        <em>Hit: </em> 
        `
        // Calculate average hit value
        if (props.type[0] === 'Melee') {
            content += `${Math.floor(props.hit.baseNumber*(props.hit.baseDie+1)/2) + props.hit.bonus}`;
        }
        else if (props.type[0] === 'Ranged') {
            content += `${Math.floor(props.hit.baseNumber*(props.hit.baseDie+1)/2) + props.hit.bonus} `;
        }
        else {content += '[ERROR]'};
    
    // List damage
    content += ` 
            (${props.hit.baseNumber}d${props.hit.baseDie} + ${props.hit.bonus}) ${props.hit.baseType} damage.
        </p>
    `
    
    // Populate content
    attackEntry.innerHTML = content;

    // Click event listener
    attackEntry.addEventListener('click', () => {
        DisplayModal({display: AttackRoll(props)});
    });

    return attackEntry;
}