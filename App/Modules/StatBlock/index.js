import { MakeAttack } from './../AttackEntry/index.js';
import { RollHP, RollCheck } from './../DiceRolls/index.js';
import { DisplayModal } from './../ModalOverlay/index.js';

export const RenderStatBlock = (props) => {

    // Destruct properties
    const {name} = props;
    
    // Process creature name by replacing ' ' in original string by '-' and lowercase
    const getCreatureFileName = (creatureName) => {
        let newName = '';
        for (let i=0; i<creatureName.length; i++) {
            creatureName[i] === ' ' ? newName += '-' : newName += creatureName[i];
        }
        return newName.toLowerCase();  
    }

    // List all items in list-type arrays, separate by specified divider (typically ', ' or '</br>')
    const makeList = (array, divider) => {
        let listContent = '';
        for (let i=0; i<array.length; i++) {
            listContent += array[i];
            i < (array.length - 1) ? listContent += `${divider} ` : null;
        }
        return listContent;
    }

    // List all entries in traits, reactions, and text-based attacks
    const makeEntry = (entry) => {  
        const creatureEntry = document.createElement('p');
        creatureEntry.className = 'creature__entry';
        creatureEntry.innerHTML = `<p class="creature__entry"><strong><em>${entry.name}.</strong></em>${entry.text}</p>`;
        return creatureEntry;
    }

    // Render content into #app-content element
    const renderContent = (json) => {

        // Name and type
        const titleEntryContainer = document.createElement('div');
        titleEntryContainer.className = 'creature__title';
        titleEntryContainer.innerHTML = `
            <h1 class="creature__name">${json.name}</h1>
            <p class="creature__classification">${json.size} ${json.type}, ${json.alignment}</p>
        `
        document.querySelector('#app-content').appendChild(titleEntryContainer);

        // Stats
        const statEntryContainer = document.createElement('div');
        statEntryContainer.className = 'creature__stats';
        statEntryContainer.id = 'creature_main'
        document.querySelector('#app-content').appendChild(statEntryContainer);

        // Create stat containers
        const statNames = ['AC', 'HP', 'speed'];
        for (let i=0; i<statNames.length; i++) {
            const statContainer = document.createElement('div');
            statContainer.className = 'creature__stat';
            statContainer.id = `creature_${statNames[i]}`;
            document.querySelector('.creature__stats').appendChild(statContainer);
        }    
        
        // Display AC
        document.querySelector('#creature_AC').innerHTML = `
            <p class="creature__stat-name"><strong>AC</strong></p>
            <p class="creature__stat-value creature__stat-value--large">${json.AC.value}</p>
        `
        
        // Display HP
        document.querySelector('#creature_HP').classList.add('creature__btn');
        document.querySelector('#creature_HP').innerHTML = `
            <p class="creature__stat-name"><strong>HP</strong></p>
            <p class="creature__stat-value">
                ${Math.ceil(json.HP.amount * ((json.HP.die + 1) / 2 + json.HP.bonus))}
            </p>
            <p class="creature__stat-value">
                (${json.HP.amount}d${json.HP.die} + ${json.HP.amount * json.abilities.CON})
            </p>
        `

        // Roll random HP
        document.querySelector('#creature_HP').addEventListener('click', () => {
            const hpDisplay = `
                <p class="modal__title">${json.name} hit points:</p>
                <p class="modal__value--xl">${RollHP(json.HP)}</p>
            `;
            DisplayModal({display: hpDisplay});
        });

        // Display movement modes and speed
        document.querySelector('#creature_speed').innerHTML = `
            <p class="creature__stat-name"><strong>Speed</strong></p>
            <p class="creature__stat-value">
        `
        document.querySelector('#creature_speed').innerHTML += makeList(json.speed, '</br>');
        document.querySelector('#creature_speed').innerHTML += `</p>`
        
        // Abilities
        const abilityEntryContainer = document.createElement('div');
        abilityEntryContainer.className = 'creature__abilities';
        document.querySelector('#app-content').appendChild(abilityEntryContainer);

        const abilityScoreNames = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
        for (let i=0; i<abilityScoreNames.length; i++) {
            const abilityContainer = document.createElement('div');
            abilityContainer.className = 'creature__ability creature__btn';
            abilityContainer.id = `creature_${abilityScoreNames[i]}`;
            abilityContainer.innerHTML = `
                <p class="creature__ability-name"><strong>${abilityScoreNames[i]}</strong></p>
                <p class="creature__ability-value">${json.abilities[abilityScoreNames[i]]}</p>
            `
            document.querySelector('.creature__abilities').appendChild(abilityContainer);
        }  
        
        // Roll ability checks
        for (let i=0; i<abilityScoreNames.length; i++) {
            document.querySelector(`#creature_${abilityScoreNames[i]}`).addEventListener('click', () => {
                const abilityDisplay = `
                <p class="modal__title">${[abilityScoreNames[i]]} check:</p>
                <p class="modal__value--xl">${RollCheck(json.abilities[abilityScoreNames[i]])}</p>
                <p class="modal__value--sm">Two values generated for advantage/disadvantage.</br>If neither applies, use the first value.</p>
                `;
                DisplayModal({display: abilityDisplay});
            });
        }
        
        // Miscellany entries
        const miscellanyEntryContainer = document.createElement('div');
        miscellanyEntryContainer.className = 'creature__stats';
        miscellanyEntryContainer.id = 'creature_miscellany';
        miscellanyEntryContainer.innerHTML = `
        <p class="creature__skills"><strong>Skills</strong>
            `
            miscellanyEntryContainer.innerHTML += makeList(json.skills, ',');
            miscellanyEntryContainer.innerHTML += `
                </p>
                <p class="creature__senses"><strong>Senses</strong>
                `
            miscellanyEntryContainer.innerHTML += makeList(json.senses, ',');            
            miscellanyEntryContainer.innerHTML += `
                </p>
                <p class="creature__languages"><strong>Languages</strong>
                `               
            miscellanyEntryContainer.innerHTML += makeList(json.languages, ',');                
            miscellanyEntryContainer.innerHTML += `
                </p>
                <p class="creature__cr"><strong>CR</strong> ${json.challenge}</p>
            </div>    
        `
        document.querySelector('#app-content').appendChild(miscellanyEntryContainer);

        // Trait entries
        const traitEntryContainer = document.createElement('div');
        traitEntryContainer.className = 'creature__traits';
        document.querySelector('#app-content').appendChild(traitEntryContainer);

        for (let i=0; i<json.traits.length; i++) {
            document.querySelector('.creature__traits').appendChild(makeEntry(json.traits[i]));
        }
        
        // Action entries
        const actionEntryContainer = document.createElement('div');
        actionEntryContainer.className = 'creature__actions';
        actionEntryContainer.innerHTML = `<h2 class="creature__section">Actions</h2>`;
        document.querySelector('#app-content').appendChild(actionEntryContainer);
        
        for (let i=0; i<json.actions.length; i++) {
            if (json.actions[i].actionType === 'Attack') {
                document.querySelector('.creature__actions').appendChild(MakeAttack(json.actions[i]));
            }
            else {
                document.querySelector('.creaure__actions').appendChild(makeEntry(json.actions[i]));
            }
        }
    }

    // Load a JSON object from local
    const jsonRequest = () => {
        //console.log('Requesting JSON');
        const request = new Request(`./Database/Bestiary/${getCreatureFileName(name)}.json`);
        fetch(request)
            .then(response => response.json())
            .then(data => {
                renderContent(data);
            });
    }
    jsonRequest();
}