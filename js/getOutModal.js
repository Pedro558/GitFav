import {  modal, modalAdded, modalRemove, closeBtn, cancelRemove, confirmRemove} from "./elements.js"

export function GetOutModal(){
  closeBtn.onclick = () => {
    //modalRemove.classList.remove('open-modal')
    console.log('click');
  }

  cancelRemove.addEventListener('click', () =>{
    modalRemove.classList.remove('open-modal')
  })

  confirmRemove.addEventListener('click', () =>{
    modalRemove.classList.remove('open-modal')
  })

  window.addEventListener('click', (e)=>{
    if (e.target == modal){
      modal.classList.remove('open-modal')
    }
  })

  window.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      modalAdded.classList.remove('open-modal')
      modalRemove.classList.remove('open-modal')
    }
  })
}