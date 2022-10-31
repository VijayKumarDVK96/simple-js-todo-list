'use strict';

const formEl = document.getElementById('form-item');
const itemEl = document.getElementById('item');
const itemContainerEl = document.getElementById('item-container');

let items = [];

const displayUI = function() {
    if(items.length > 0) {
        itemContainerEl.innerHTML = '';

        items.forEach((item) => {
            const listEl = document.createElement('li');
            listEl.classList.add('list-item');
            listEl.innerHTML = `${item.value} <button onclick='deleteItem(${item.id})'>Delete</button>`;

            itemContainerEl.appendChild(listEl);
        });
        
    }
};

const deleteItem = function (id) {
    // console.log(id);
    items = items.filter((item) => item.id !== id);
    displayUI();
}

formEl.addEventListener('submit', function(e) {
    e.preventDefault();

    if(itemEl.value) {
        // const item = itemEl.value;
        // items.push(item);
        // itemEl.value = null;

        const item = {
            id: new Date().valueOf(),
            value: itemEl.value
        }
        items.push(item);
        itemEl.value = null;

        // console.log(items);
        displayUI();
    } else {
        alert('Enter a valid input');
    }
});