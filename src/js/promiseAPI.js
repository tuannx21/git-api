const hostURL = 'https://api.github.com'

//Promise
export const callAPI = (endpoint, method, body) => {
  return fetch(`https://api.github.com${endpoint}`, {
    method: method,
    headers: {
      'Authorization': `Bearer cae334db7b05a0aa274dc562a81e698d53673d5f`
    },
    body: (body === undefined || body === null) ? null : JSON.stringify(body)
  })
    .then(response => response.json())
}

export const getUser = (accessKey) => {
  return fetch(`${hostURL}/user`, {
    headers: { 'Authorization': `Bearer ${accessKey}` }
  })
    .then(response => response.json())
}

export const getAllRepos = (accessKey) => {
  return fetch(`${hostURL}/user/repos`, {
    headers: { 'Authorization': `Bearer ${accessKey}` }
  })
    .then(response => response.json())
}

export const renameRepo = (accessKey, owner, oldName, newName) => {
  return fetch(`${hostURL}/${owner}/${oldName}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${accessKey}`
    },
    body: JSON.stringify({
      name: newName
    })
  })
}

export const createRepo = (accessKey, newRepo = { name: 'Repo-create-by-api' }) => {
  return fetch(`${hostURL}/user/repos`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessKey}`
    },
    body: JSON.stringify(newRepo)
  })
}

export const deleteRepo = (accessKey, owner, repoName) => {
  return fetch(`${hostURL}/${owner}/${repoName}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessKey}`
    }
  })
    .then(alert('done but it will take a while to completely delete on github'))
    .catch(error => { alert("errorrrrrr") })
}
