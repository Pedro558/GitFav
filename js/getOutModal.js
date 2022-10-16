import { modal, modalAdded, modalRemove, closeBtn, cancelRemove, confirmRemove} from "./elements.js"

export function GetOutModal(){
  closeBtn.addEventListener('click', () => {
    modalAdded.classList.remove('open-modal')
    modalRemove.classList.remove('open-modal')
  })

  cancelRemove.addEventListener('click', () =>{
    modalRemove.classList.remove('open-modal')
  })

  confirmRemove.addEventListener('click', () =>{
    modalAdded.classList.remove('open-modal')
  })

  window.addEventListener('click', (e)=>{
    if (e.target == modal){
      modalAdded.classList.remove('open-modal')
      modalRemove.classList.remove('open-modal')
    }
  })

  window.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      modalAdded.classList.remove('open-modal')
      modalRemove.classList.remove('open-modal')
    }
  })
}