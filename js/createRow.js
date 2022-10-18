export function CreateRow(){
  const tr = document.createElement('tr')

  tr.innerHTML = `
  <tr>
    <td class="user-wrapper">
      <div class="user">
        <img src="https://www.github.com/pedro558.png" alt="github profile user image">
        <a href="https://www.github.com/pedro558" target="_blank">
          <p>Pedro Afonso</p>
          <span>pedro558</span>
        </a>
      </div>
    </td>

    <td class="repositories">24</td>
    <td class="followers">3</td>
    <td class="actions-wrapper">
      <div class="actions">
        <a class="visit" href="" >
          <button>
            <img src="./images/git-pull-request-bold.svg" alt="git pull request symbol">
            <span>Visit</span>
          </button>
        </a>

        <a class="twitter" href="">
          <button>
            <img src="./images/twitter-logo-bold.svg" alt="twitter logo">
            <span>Twitter</span>
          </button>
        </a>

        <a class="remove" href="">
          <button>
            <img src="./images/trash-bold.svg" alt="trash symbol">
            <span>Remove</span>
          </button>
        </a>
      </div>
    </td>
  </tr> 
  `

  return tr
}