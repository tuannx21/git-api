import { getUser, getAllRepos, renameRepo, deleteRepo, createRepo } from './promiseAPI';

const accessKey = 'ee4fecbcfa2218525f059ed37b42a0e44cadaf88'
const labelAccessKey = 'git-access-key'
const inputNewRepo = document.querySelector('#input-new-repo')
const imgUserAvatar = document.querySelector('#userAvatar')
const userName = document.querySelector('#userName')
const userEmail = document.querySelector('#userEmail')
const reposList = document.querySelector('#repoList')

//DOM manipulate
const createElement = () => {}

const deleteElement = (id) => {
  document.querySelector(`#repo${id}`).style.display = 'none'
}

//Displaying App
const showUserInf = ({ name, login, email, avatar_url }) => {
  imgUserAvatar.src = avatar_url
  userName.innerHTML = name || login
  userEmail.innerHTML = email
}

const addRepoItem = (repo) => {
  let template = document.querySelector('#repo-template')
    let clone = template.content.cloneNode(true)
    let repoItem = clone.querySelector('li')
    let inputRepo = repoItem.querySelector('#repoName')
    let removeRepo = repoItem.querySelector('#btnRemoveRepo')

    repoItem.id = 'repo' + repo.id
    inputRepo.value = repo.name
    inputRepo.addEventListener('dblclick', function () { this.readOnly = false })
    inputRepo.addEventListener('keypress', function (event) {
      if (event.which === 13 || event.keyCode === 13) {
        this.readOnly = true
        renameRepo(repo.owner.login, repo.name, this.value)
          .then(alert('U have edited success, it may take a while to completely rename'))
          .catch(alert('something happen. Abort change'))
      }
    })
    removeRepo.addEventListener('click', function () {
      let confirmDeleteBox = confirm(`you sure you want to delete repo ${repo.name} ?????`)
      if (confirmDeleteBox === true) {
        deleteRepo(repo.owner.login, repo.name)
          .then(deleteElement(repo.id))
          .catch(alert('delete fail'))
      }
    })
    reposList.appendChild(clone)
}

const showRepos = (repos) => {
  repos.map((repo) => {
    addRepoItem(repo)
  })
}

//Util
const onKeyPressAccessKey = () => {
  inputNewRepo.addEventListener('keypress', function (event) {
    if (event.which === 13 || event.keyCode === 13) {
      let newRepoName = inputNewRepo.value
      createRepo({name: newRepoName})
        .then(data => {addRepoItem(data)})
        inputNewRepo.value = ''
    }
  })
}

const loadData = () => {
  getUser()
    .then(user => { showUserInf(user) })
  getAllRepos()
    .then(repos => { showRepos(repos) })
}

const App = () => {
  loadData();
  onKeyPressAccessKey()
}

//start App
App()

