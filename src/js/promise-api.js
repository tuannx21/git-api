const hostURL = 'https://api.github.com'
const accessKey = 'e007f511e4b8303e78435518e1a820b47a0d886a'

//Promise
export const callAPI = (endpoint, method, body) => {
  return fetch(`${hostURL}${endpoint}`, {
    method: method,
    headers: {
      'Authorization': `Bearer ${accessKey}`
    },
    body: (body === undefined || body === null) ? null : JSON.stringify(body)
  })
    .then(response => {
      if (response.ok && response.status !== 422) {
        return response.json()
      } else {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    })
}

export const getUser = () => {
  return callAPI('/user', 'GET')
}

export const getAllRepos = () => {
  return callAPI('/user/repos', 'GET')
}

export const renameRepo = (owner, oldName, newName) => {
  return callAPI(`/repos/${owner}/${oldName}`, 'PATCH', { name: newName })
}

export const createRepo = (newRepo = { name: 'Repo-create-by-api' }) => {
  return callAPI('/user/repos', 'POST', newRepo)
}

export const deleteRepo = (repo) => {
  return callAPI(`/repos/${repo.owner.login}/${repo.name}`, 'DELETE')
}
