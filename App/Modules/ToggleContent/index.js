export const ToggleContent = (event) => { 
    const sectionIcon = event.currentTarget.querySelector('.eye');
    const sectionContent = event.currentTarget.parentNode.querySelector('.content');

    // Toggles content based on state

    if (sectionIcon.className === 'eye') {
        // Changes eye icon to open and display content
        sectionIcon.className = 'eye eye--open';
        sectionContent.style.display = "block";
    }   
    else {
        // Changes eye icon to closed and hide content
        sectionIcon.className = 'eye';
        sectionContent.style.display = "none";
    }
}