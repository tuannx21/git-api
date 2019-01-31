const hostURL = 'https://api.github.com'

//Promise
export const callAPI = (endpoint, method, body) => {
  return fetch(`${hostURL}${endpoint}`, {
    method: method,
    headers: {
      'Authorization': `Bearer ee4fecbcfa2218525f059ed37b42a0e44cadaf88`
    },
    body: (body === undefined || body === null) ? null : JSON.stringify(body)
  })
    .then(response => response.json())
}

export const getUser = () => {
  return callAPI('/user','GET')
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

export const deleteRepo = (owner, repoName) => {
  return callAPI(`/repos/${owner}/${repoName}`, 'DELETE')
}
