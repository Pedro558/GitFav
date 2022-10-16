import { modal, closeBtn} from "./elements.js"

export function GetOutModal(){
  closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
  })

  window.addEventListener('click', (e)=>{
    if (e.target == modal){
      modal.style.display = "none";
    }
  })

  window.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      modal.style.display = "none";
    }
  })
}