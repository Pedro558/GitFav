const modal = document.getElementById('myModal')
const modalAdded = document.querySelector('.modal-added')
const modalRemove = document.querySelector('.modal-remove')

const closeBtn = document.querySelector('#myModal .close')
const addButton = document.querySelector('.add-button')
const error = document.querySelector('.error')

const searchInput = document.querySelector('#search-input')

const confirmRemove = document.querySelector('.confirm-remove')
const cancelRemove = document.querySelector('.cancel-remove')

export{
  error,
  modalAdded,
  closeBtn,
  modal,
  addButton,
  searchInput,
  modalRemove,
  confirmRemove,
  cancelRemove
}