// Class that takes data from Github's API
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

// How the data will be structured
export class Favorites{
  constructor(root){
    this.root = document.querySelector(root)
    this.load()
  }

  // load what is already saved in localStorage
  load(){
    this.inputs = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  // save data into localStorage
  saveLocally(){
    localStorage.setItem('@github-favorites:', JSON.stringify(this.inputs))
  }

  // dealing with data when a new user is added 
  async addUser(username){
    const error = document.querySelector('.error')
    
    try{
      // map the users already in the list
      const loginNames = this.inputs.map(user => {
        return user.login.toLowerCase()
      })

      // check if a user is already in the list
      for(let i = 0; i < loginNames.length; i++){
        if(username == loginNames[i]){
          error.classList.add('open')
          error.firstElementChild.innerHTML = 'User already added'
        }
      }

      // load API's data into a const
      const user = await GithubUser.search(username)

      // check if the user is find
      if(user.login === undefined){
        error.classList.add('open')
        error.firstElementChild.innerHTML = 'User not find'
      }

      // remove error message from the screen
      error.classList.remove('open')

      

    }
  }
}