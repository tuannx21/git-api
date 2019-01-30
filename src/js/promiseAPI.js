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
