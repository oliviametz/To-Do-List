const inputField = document.getElementById('input-field');
const submitButton = document.getElementById('submit-button');
const list = document.getElementById('list');
const clearButton = document.getElementById('clear-button');
const listContainer = document.getElementById('list-container');

const storedBackgroundColor = localStorage.getItem('listContainerBackgroundColor');

if (storedBackgroundColor) {
    listContainer.style.background = storedBackgroundColor;
} else {
    listContainer.style.background = 'linear-gradient(rgb(248, 204, 72), rgb(238, 238, 156))';
}

loadSavedItems();



// Making sure the input fields content gets submitted when the enter key is pressed

inputField.addEventListener('keyup', function (e) {
    e.preventDefault();
    if (e.key === 'Enter') {
        submitButton.click();
    }
});



submitButton.addEventListener('click', function () {
    const inputValue = inputField.value;

    if (inputValue !== '' && list.children.length < 13) {
        const listItem = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = inputValue;
        listItem.appendChild(span);
        list.appendChild(listItem);

        const buttonsContainer = document.createElement('div');
        listItem.appendChild(buttonsContainer);

        const doneButton = document.createElement('button');
        doneButton.classList.add('done-button');
        doneButton.textContent = 'Check';
        buttonsContainer.appendChild(doneButton);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'x';
        buttonsContainer.appendChild(deleteButton);
        inputField.focus();
        inputField.value = '';
        saveListItems();



    } else if (list.children.length >= 13) {
        inputField.value = '';
        inputField.placeholder = 'Maximum of items reached';
    }
});


clearButton.addEventListener('click', function () {
    while (list.firstChild) {
        list.firstChild.remove();
    }
    inputField.placeholder = 'Add an item';
    inputField.focus();
    saveListItems();
});


list.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-button')) {
        const ItemToBeRemoved = e.target.parentElement.parentElement;
        ItemToBeRemoved.remove();
        inputField.placeholder = 'Add an item'
        localStorage.setItem('storedListItems', list.innerHTML)
    } else if (e.target.classList.contains('done-button')) {
        const doneButton = e.target;
        doneButton.parentElement.parentElement.style.textDecoration = 'line-through';
        doneButton.remove();
        saveListItems();
    }

});



blue.addEventListener('click', () => setBackgroundColor('linear-gradient(rgb(116, 137, 164), rgb(216, 219, 234))'));
green.addEventListener('click', () => setBackgroundColor('linear-gradient(rgb(175, 229, 148), rgb(220, 227, 208))'));
yellow.addEventListener('click', () => setBackgroundColor('linear-gradient(rgb(248, 204, 72), rgb(237, 237, 184))'));
purple.addEventListener('click', () => setBackgroundColor('linear-gradient(rgb(148, 114, 170), rgb(207, 184, 228))'));

function setBackgroundColor(color) {
    listContainer.style.background = color;
    localStorage.setItem('listContainerBackgroundColor', color);
    inputField.focus();
}


function setItemMaxLength() {
    if (window.innerWidth < 380) {
        inputField.maxLength = 15;
        document.querySelectorAll('span').forEach(listItemText => {
            if (listItemText.textContent.length > 15) {
                listItemText.textContent = listItemText.textContent.slice(0, 14) + '...';
            }
        })
    }
    else if (window.innerWidth < 480) {
        inputField.maxLength = 22;
        loadSavedItems();
        document.querySelectorAll('span').forEach(listItemText => {
            if (listItemText.textContent.length > 22) {
                listItemText.textContent = listItemText.textContent.slice(0, 21) + '...';
            }
        })
    }
    else {
        inputField.maxLength = 30;
        loadSavedItems();
    }
}




function saveListItems() {
    const listHTML = list.innerHTML;
    localStorage.setItem('storedListItems', checkHTML(listHTML));
}



function loadSavedItems() {
    let storedItems = localStorage.getItem('storedListItems');
    if (storedItems) {
        list.innerHTML = checkHTML(storedItems);
    }
}


// To prevent cross site scripting

function checkHTML(inputHTML) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = inputHTML;


    let isUnsafe = false;


    const dangerousAttrs = ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur', 'onchange'];


    tempDiv.querySelectorAll('*').forEach(element => {
        dangerousAttrs.forEach(attr => {
            if (element.hasAttribute(attr)) {
                isUnsafe = true;
                element.removeAttribute(attr);
            }
        });
    });

    if (isUnsafe == true) {
        localStorage.setItem('storedListItems', '');
        return '';
    } else {
        return tempDiv.innerHTML;
    }

}


window.addEventListener('resize', setItemMaxLength);
window.addEventListener('DOMContentLoaded', setItemMaxLength);










