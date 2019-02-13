import { getUser, getAllRepos, renameRepo, deleteRepo, createRepo } from './promise-api';

const inputNewRepo = document.querySelector('#input-new-repo')
const imgUserAvatar = document.querySelector('#user-avatar')
const userName = document.querySelector('#user-name')
const userEmail = document.querySelector('#user-email')
const reposList = document.querySelector('#repo-list')

//DOM manipulate
const deleteElement = id => {
  document.querySelector(`#repo${id}`).style.display = 'none'
}

//Displaying App
const showUserInf = ({ name, login, email, avatar_url }) => {
  imgUserAvatar.src = avatar_url
  userName.innerHTML = name || login
  userEmail.innerHTML = email
}

const addRepoItem = repo => {
  let template = document.querySelector('#repo-template')
  let clone = template.content.cloneNode(true)
  let repoItem = clone.querySelector('li')
  let inputRepo = repoItem.querySelector('#repo-name')
  let removeRepo = repoItem.querySelector('#btn-remove-repo')

  repoItem.id = `repo${repo.id}`
  inputRepo.value = repo.name
  inputRepo.addEventListener('dblclick', function () { this.readOnly = false })
  inputRepo.addEventListener('keypress', function (event) {
    if (event.which === 13 || event.keyCode === 13) {
      this.readOnly = true
      renameRepo(repo.owner.login, repo.name, this.value)
        .catch(err => {
          this.value = repo.name
          alert(err)
        })
    }
  })
  removeRepo.addEventListener('click', function () {
    let confirmDeleteBox = confirm(`you sure you want to delete repo ${repo.name} ?????`)
    if (confirmDeleteBox === true) {
      deleteRepo(repo)
        .then(deleteElement(repo.id))
    }
  })
  reposList.appendChild(clone)
}

const showRepos = repos => {
  repos.map(repo => {
    addRepoItem(repo)
  })
}

//Util
const onKeyPressAccessKey = () => {
  inputNewRepo.addEventListener('keypress', function (event) {
    if (event.which === 13 || event.keyCode === 13) {
      let newRepoName = inputNewRepo.value
      createRepo({ name: newRepoName })
        .then(data => { addRepoItem(data) })
        .catch(er => alert(er))
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

