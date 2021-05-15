// Testing module
//import { jsonRequest } from './Modules/_Testing/index.js';
//jsonRequest();

// Module for loading creature stats from bestiary
import { RenderStatBlock } from './Modules/StatBlock/index.js';
RenderStatBlock({name: 'Goblin'});

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
