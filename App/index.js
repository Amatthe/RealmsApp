// Testing module
//import { _ } from './Modules/_Testing/index.js';

/** IMPORT MODULES */
// Module for loading creature stats from bestiary
import { RenderStatBlock } from './Modules/StatBlock/index.js';
// Module for opening and closing sidebars
import { ToggleContent } from './Modules/ToggleContent/index.js'

/** IMPLEMENT MODULES */
// Close App
const app = document.querySelector('#app');
const appContent = document.querySelector('#app-content');
const closeBtn = document.querySelector('#app-close');
const closeApp = () => {
    // Hide the app container
    app.classList.add('element--hidden');
    
    // Clear all generated content
    while (appContent.firstChild) {
        appContent.removeChild(appContent.firstChild);
    }   
}
closeBtn.addEventListener('click', closeApp);

// Open App
const openApp = () => {
    // Display app container
    app.className = '';

    // Display app close button
    closeBtn.className = "button--round";    
}

// When a creature link is clicked, render the appropriate bestiary stat
const creatureLink = document.querySelector('.creature');
const creatureName = creatureLink.textContent;

creatureLink.addEventListener('click', () => {
    closeApp();
    openApp();
    RenderStatBlock({name: creatureName});
});

// Toggle sidebar content
const sectionTitle = document.querySelectorAll('.sidebar__title');

for (let i=0; i<sectionTitle.length; i++) {
    sectionTitle[i].addEventListener('click', ToggleContent);    
}
