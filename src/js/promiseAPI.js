//Promise
export const getUser = (accessKey) => {
  return fetch('https://api.github.com/user', {
    headers: { 'Authorization': `Bearer ${accessKey}` }
  })
    .then(response => response.json())
}

export const getAllRepos = (accessKey) => {
  return fetch('https://api.github.com/user/repos', {
    headers: { 'Authorization': `Bearer ${accessKey}` }
  })
    .then(response => response.json())
}

export const renameRepo = (accessKey, owner, oldName, newName) => {
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

export const createRepo = (accessKey, newRepo = { name: 'Repo-create-by-api' }) => {
  return fetch(`https://api.github.com/user/repos`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessKey}`
    },
    body: JSON.stringify(newRepo)
  })
}

export const deleteRepo = (accessKey, owner, repoName) => {
  return fetch(`https://api.github.com/repos/${owner}/${repoName}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessKey}`
    }
  })
  .then(alert('done but it will take a while to completely delete on github'))
  .catch(error => {alert("errorrrrrr")})
}
