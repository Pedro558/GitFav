import { CreateRow } from "./createRow.js"
import {addButton, cancelRemove, confirmRemove, error, modalAdded, modalRemove, searchInput, closeBtn, tbody} from "./elements.js"


export class GithubUser{
  static async search(username){
    const endpoint = `https://api.github.com/users/${username}`

    const data = await fetch(endpoint)

    const {login, name, public_repos, followers, twitter_username} = await data.json()
    return({
      login,
      name,
      public_repos,
      followers,
      twitter_username
    })
  }
}

export class Favorites{
  constructor(root){
    this.root = document.querySelector(root)
    this.load()
  }

  load(){
    this.inputs = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  saveLocally(){
    localStorage.setItem('@github-favorites:', JSON.stringify(this.inputs))
  }

  async addUser(username){
    try{
      const loginNames = this.inputs.map(user => {
        return user.login.toLowerCase()
      })

      for(let i = 0; i < loginNames.length; i++){
        if(username == loginNames[i]){
          error.classList.add('open-error')
          error.firstElementChild.innerHTML = 'User already added'
          throw new Error('User already added')
        }
      }

      const user = await GithubUser.search(username)

      if(user.login === undefined){
        error.classList.add('open-error')
        error.firstElementChild.innerHTML = 'User not find'
        throw new Error('User not find')
      }

      error.classList.remove('open-error')
      
      this.inputs = [user, ...this.inputs]
      this.update()
      this.saveLocally()

      modalAdded.showModal()
      closeBtn[0].onclick = () =>{
        modalAdded.close()
      }
      

    } catch(error){
      console.log(error);
    }
  }

  delete(user){
    const filterItems = this.inputs.filter(
      input => user.login !== input.login
      )
    this.inputs = filterItems
    this.update()
    this.saveLocally()
  }
}

export class FavoritesView extends Favorites{
  constructor(root){
    super(root)
    this.tbody = this.root.querySelector('table tbody')

    this.update()
    this.grabUser()
  }

  grabUser(){
    addButton.onclick = () =>{
      const event = window.event
      event.preventDefault()

      this.addUser(searchInput.value.toLowerCase())
    }
  }


  update(){
    this.removeAllTr()

    this.inputs.forEach( user => {
      const row = CreateRow()
      
      row.classList.add('body-row')
      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagem de ${user.name}`
      row.querySelector('.user a').href = `https://github.com/${user.login}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers
      row.querySelector('.visit').href = `https://github.com/${user.login}`

      if(user.twitter_username != null){
        const twitter = row.querySelector('.twitter')

        twitter.href = `https://www.twitter.com/${user.twitter_username}`

        twitter.style.display = "block";
      }

      row.querySelector('.remove').
      addEventListener('click', (e) =>{
        e.preventDefault()
        modalRemove.showModal()

        confirmRemove.addEventListener('click', () => {
          this.delete(user)
          modalRemove.close()
        }) 
        
        cancelRemove.onclick = () => {
          modalRemove.close()
        }

        closeBtn[1].onclick = () =>{
          modalRemove.close()
        }
      })

      this.tbody.append(row)
    })
  }

  removeAllTr(){
    this.tbody.querySelectorAll('tr')
    .forEach(tr =>{
      tr.remove()
    })
  }

  /*noUser(){
      const tr = document.createElement('tr')
      tr.classList.add('no-user-wrapper')
  
      tr.innerHTML = `
      <td colspan="4">
      <div class="no-user-content">
        <img src="./images/big-star.svg" alt="big star image">
        <span class="no-user-text">No favorite yet</span>
      </div>
    </td>
      `
      return tr
  }*/

}