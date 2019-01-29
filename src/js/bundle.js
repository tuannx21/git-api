const inputAccessKey = document.querySelector('#input-access-key')
const imgUserAvatar = document.querySelector('#userAvatar')
const userName = document.querySelector('#userName')
const userEmail = document.querySelector('#userEmail')
const reposList = document.querySelector('#repoList')

const showUserInf = ({ name, login, email, avatar_url }) => {
  imgUserAvatar.src = avatar_url
  userName.innerHTML = name || login
  userEmail.innerHTML = email
}

const getUser = (accessKey) => {
  return fetch('https://api.github.com/user', {
    headers: {
      'Authorization': `Bearer ${accessKey}`
    }
  })
    .then(response => response.json())
}

const getAllRepos = (accessKey) => {
  return fetch('https://api.github.com/user/repos', {
    headers: {
      'Authorization': `Bearer ${accessKey}`
    }
  })
    .then(response => response.json())
}

const renameRepo = (accessKey, owner, oldName, newName) => {
  return fetch(`https://api.github.com/repos/${owner}/${oldName}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${accessKey}`
    },
    body: JSON.stringify({
      name: newName
    })
  })
}

const clearAll = () => {
  reposList.innerHTML = null
  userEmail.innerHTML = null
  userName.innerHTML = null
  imgUserAvatar.src = null
}

const onKeyPressAccessKey = () => {
  inputAccessKey.addEventListener('keypress', function (event) {
    if (event.which === 13 || event.keyCode === 13) {
      clearAll()
      loadAuthUser(inputAccessKey.value)
      inputAccessKey.value = ''
    }
  })
}

const loadAuthUser = (accessKey) => {
  getUser(accessKey)
    .then(users => {
      showUserInf(users)
      getAllRepos(accessKey)
        .then(repos => repos.filter((repo) => (repo.owner.login === users.login)))
        .then(userRepos => {
          userRepos.map((repo) => {
            let template = document.querySelector('#repo-template')
            let clone = template.content.cloneNode(true)
            let repoItem = clone.querySelector('li')
            let inputRepo = repoItem.querySelector('#repoName')

            repoItem.id = repo.id
            inputRepo.value = repo.name
            inputRepo.addEventListener('dblclick', function () { this.readOnly = false })
            inputRepo.addEventListener('keypress', function (event) {
              if (event.which === 13 || event.keyCode === 13) {
                renameRepo(accessKey, repo.owner.login, repo.name, this.value)
                  .then(alert('U have edited success'))
                  .then(loadAuthUser(accessKey))
              }
            })
            reposList.appendChild(clone)
          })
        })
    })
    .catch("something wrong happened, abort change")
}

onKeyPressAccessKey()

