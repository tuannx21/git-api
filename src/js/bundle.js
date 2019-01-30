import { getUser, getAllRepos, renameRepo, deleteRepo } from './promiseAPI';

const labelAccessKey = 'git-access-key'
const inputAccessKey = document.querySelector('#input-access-key')
const imgUserAvatar = document.querySelector('#userAvatar')
const userName = document.querySelector('#userName')
const userEmail = document.querySelector('#userEmail')
const reposList = document.querySelector('#repoList')

//Displaying App
const showUserInf = ({ name, login, email, avatar_url }) => {
  imgUserAvatar.src = avatar_url
  userName.innerHTML = name || login
  userEmail.innerHTML = email
}

const showRepos = (repos, accessKey) => {
  repos.map((repo) => {
    let template = document.querySelector('#repo-template')
    let clone = template.content.cloneNode(true)
    let repoItem = clone.querySelector('li')
    let inputRepo = repoItem.querySelector('#repoName')
    let removeRepo = repoItem.querySelector('#btnRemoveRepo')

    repoItem.id = repo.id
    inputRepo.value = repo.name
    inputRepo.addEventListener('dblclick', function () { this.readOnly = false })
    inputRepo.addEventListener('keypress', function (event) {
      if (event.which === 13 || event.keyCode === 13) {
        this.readOnly = true
        renameRepo(accessKey, repo.owner.login, repo.name, this.value)
          .then(alert('U have edited success, it may take a while to completely rename'))
      }
    })
    removeRepo.addEventListener('click', function () {
      let confirmDeleteBox = confirm(`you sure you want to delete repo ${repo.name} ?????`)
      if (confirmDeleteBox === true) {
        deleteRepo(accessKey, repo.owner.login, repo.name)
        loadData()
      }
    })
    reposList.appendChild(clone)
  })
}

//Pure Function
const filterByOwner = (repos) => {
  return repos.filter((repo) => (repo.owner.login === users.login))
}

//Util
const clearAll = () => {
  reposList.innerHTML = null
  userEmail.innerHTML = null
  userName.innerHTML = null
  imgUserAvatar.src = null
}

const saveToLocalStorage = (label, item) => {
  window.localStorage.setItem(label, JSON.stringify(item))
}

const getItemFromLocalStorage = (label) => {
  return JSON.parse(window.localStorage.getItem(label))
}

const onKeyPressAccessKey = () => {
  inputAccessKey.addEventListener('keypress', function (event) {
    if (event.which === 13 || event.keyCode === 13) {
      clearAll()
      let accessKey = inputAccessKey.value;
      saveToLocalStorage(labelAccessKey, accessKey)
      loadData(accessKey)
      inputAccessKey.value = ''
    }
  })
}

const loadData = (accessKey) => {
  clearAll()
  let key = accessKey === undefined ? getItemFromLocalStorage(labelAccessKey).toString() : accessKey
  getUser(key)
    .then(user => { showUserInf(user) })
  getAllRepos(key)
    .then(repos => { showRepos(repos, key) })
}

const App = () => {
  loadData();
  onKeyPressAccessKey()
}

//start App
App()

