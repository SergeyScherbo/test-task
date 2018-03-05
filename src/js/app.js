const folderList = document.querySelector('.folder-list');
const input = document.querySelector('input');
let idCounter = 0;

let currentFolder = null;
let arrayOfFolders = [];

const addFolderBtn = document.querySelector('.addFolder');
addFolderBtn.addEventListener('click', function() {
  input.classList.toggle('is-display');
})

// constructor, that creates new object (each object refer to folder)
function createNewFolder(name) {
  this.name = name;
  this.messages = [];
  this.id = idCounter;
  idCounter++;
}

// append new folder to the sidebar
function appendFolder(obj) {

  const folder = newElement('li', 'folder', obj.name);
  folderList.appendChild(folder);

  const messageList = newElement('ul', 'message-list', null, obj.id);
  const content = document.querySelector('.content');
  content.appendChild(messageList);

  /*
  if there are some messages in the array, that means that
  they were stored in localStorage
  */
  if (obj.messages.length > 0) {
    obj.messages.map(msg => {
      const storedMessages = newElement('li', 'message', msg);
      messageList.appendChild(storedMessages);
    })
  }

  // assign event handlers to fresh new folders
  folder.addEventListener('click', showActiveFolder);
  folder.addEventListener('click', changeCurrentFolder);
  folder.addEventListener('click', changeMessageList)
}

function showActiveFolder() {
  for(let i = 0; i < folderList.childNodes.length; i++) {
    folderList.childNodes[i].classList.remove('is-active');
  }
  this.classList.add('is-active');
}

function changeCurrentFolder(e) {
  currentFolder = arrayOfFolders.find(el => {
    if(el.name === e.target.textContent) {
      return el;
    }
  });
}

function changeMessageList(e) {
  const lists = document.querySelectorAll('.message-list');
  lists.forEach(list => {
    list.style.display = 'none';
  });
  const curList = document.querySelector(`.message-list[data-id="${currentFolder.id}"]`);
  curList.style.display = 'block';
}

function newElement(elType, className, text, id) {
  const element = document.createElement(elType);
  element.classList.add(className);
  // if new element is folder - append to it icon
  if (className === 'folder') {
    element.innerHTML += `<i class="fa fa-hdd"></i>${text}`;
    return element;
  }
  if (text !== null) {
    element.textContent = text;
  }
  if (id > -1) {
    element.setAttribute('data-id', id);
  }

  return element;
}

input.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    if (this.value < 1) {
      alert('Your folder must be named!')
      return;
    }
    currentFolder = new createNewFolder(this.value);
    arrayOfFolders.push(currentFolder);

    this.value = '';

    appendFolder(currentFolder);
    localStorage.setItem('folders', JSON.stringify(arrayOfFolders));
    localStorage.setItem('folderID', idCounter);
  }
});

const send = document.querySelector('.send');
const textarea = document.querySelector('textarea');
send.addEventListener('click', function() {
  if (textarea.value.length < 1) {
    alert('You have to write something in your message!');
    return;
  }
  const li = document.createElement('li');
  li.classList.add('message');
  li.textContent = textarea.value;

  const curList = document.querySelector(`.message-list[data-id="${currentFolder.id}"]`);
  curList.appendChild(li);

  currentFolder.messages.push(textarea.value);
  textarea.value = '';
  localStorage.setItem('folders', JSON.stringify(arrayOfFolders));
});

window.addEventListener('load', function() {
  arrayOfFolders = JSON.parse(localStorage.getItem('folders')) || [];

  if (isNaN(parseInt(localStorage.getItem('folderID')))) {
    idCounter = 0;
  } else {
    idCounter = parseInt(localStorage.getItem('folderID'));
  }

  if (arrayOfFolders.length > 0) {
    arrayOfFolders.map(folder => {
      currentFolder = folder;
      appendFolder(currentFolder);
    });

    currentFolder = arrayOfFolders[0];
    document.querySelector('.folder-list .folder:first-of-type').classList.add('is-active');
    document.querySelector('.message-list:first-of-type').style.display = 'block';
  }
});
