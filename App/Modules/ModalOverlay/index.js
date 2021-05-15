// Create modal display window for app messages
export const DisplayModal = (props) => {
    // Modal display window
    const modal = document.createElement('div');
    modal.className = 'modal__window';
    document.querySelector('#app').appendChild(modal);

    // Modal information display
    const modalDisplay = document.createElement('div');
    modalDisplay.className = 'modal__display';
    modalDisplay.innerHTML = (props.display);
    document.querySelector('.modal__window').appendChild(modalDisplay);

    // Close modal on tap/click
    document.querySelector('.modal__window').addEventListener('click', () => {
        document.querySelector('#app').removeChild(modal);
    })
}