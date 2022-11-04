'use strict';

const formEl = document.getElementById('form-item');
const itemEl = document.getElementById('item');
const itemContainerEl = document.getElementById('item-container');
let btnSubmit = document.getElementById('btn-submit');

let items = [];
let isEditing = false;
let editId = 0;

const displayUI = function () {
    if (items.length > 0) {
        itemContainerEl.innerHTML = '';

        items.forEach((item) => {
            const listEl = document.createElement('li');
            listEl.classList.add('list-item');
            listEl.innerHTML = `${item.value} <button onclick='editItem(${item.id})'>Edit</button><button onclick='deleteItem(${item.id})'>Delete</button>`;

            itemContainerEl.appendChild(listEl);
        });

    }
};

const deleteItem = function (id) {
    // console.log(id);
    items = items.filter((item) => item.id !== id);
    displayUI();
}

const editItem = function (id) {
    const itemToEdit = items.find((item) => item.id === id);
    itemEl.value = itemToEdit.value;
    editId = id;
    isEditing = true;
    displayUI();

    btnSubmit.value = 'Update';
}

formEl.addEventListener('submit', function (e) {
    e.preventDefault();
    if (itemEl.value) {
        if (isEditing) {
            items = items.map((item) => {
                if (item.id === editId) {
                    return {...item, value: itemEl.value};
                } else {
                    return item;
                }
            });

            editId = null;
            isEditing = false;
            itemEl.value = null;

            displayUI();

            btnSubmit.value = 'Add';
        } else {
            const item = {
                id: new Date().valueOf(),
                value: itemEl.value
            }
            items.push(item);
            itemEl.value = null;

            // console.log(items);
            displayUI();
        }
    } else {
        alert('Enter a valid input');
    }
});