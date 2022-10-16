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
    const error = document.querySelector('.error')
    const modalAdded = document.querySelector('.modal-added')
    
    try{
      const loginNames = this.inputs.map(user => {
        return user.login.toLowerCase()
      })

      for(let i = 0; i < loginNames.length; i++){
        if(username == loginNames[i]){
          error.classList.add('open-error')
          error.firstElementChild.innerHTML = 'User already added'
        }
      }

      const user = await GithubUser.search(username)

      if(user.login === undefined){
        error.classList.add('open-error')
        error.firstElementChild.innerHTML = 'User not find'
      }

      error.classList.remove('open-error')
      
      this.inputs = [user, ...this.inputs]
      this.update()
      this.saveLocally()

  
      modalAdded.classList.add('open-modal')

    } catch(error){
      console.log(error.message);
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
