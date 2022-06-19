import React, { createContext, useCallback, useState } from 'react'
import Api from '../services/api'

export const GithubContext = createContext({
  hasUser: false,
  loading: false,
  user: {},
  repositories: [],
  starred: []
})

const GithubProvider = ({ children }) => {
  const [githubState, setGithubState] = useState({
    hasUser: false,
    loading: false,
    user: {
      id: undefined,
      avatar: undefined,
      login: undefined,
      name: undefined,
      html_url: undefined,
      blog: undefined,
      company: undefined,
      location: undefined,
      followers: 0,
      following: 0,
      public_gists: 0,
      public_repos: 0
    },
    repositories: [],
    starred: []
  })

  const getUser = username => {
    setGithubState(prevState => ({
      ...prevState,
      loading: !prevState.loading
    }))

    Api.get(`users/${username}`)
      .then(({ data }) => {
        setGithubState(prevState => ({
          ...prevState,
          hasUser: true,
          user: {
            id: data.id,
            avatar_url: data.avatar_url,
            login: data.login,
            name: data.name,
            html_url: data.html_url,
            blog: data.blog,
            company: data.company,
            location: data.location,
            followers: data.followers,
            following: data.following,
            public_gists: data.public_gists,
            public_repos: data.public_repos
          }
        }))
      })
      .finally(() => {
        setGithubState(prevState => ({
          ...prevState,
          loading: !prevState.loading
        }))
      })
  }

  const getUserRepos = username => {
    Api.get(`users/${username}/repos`).then(({ data }) => {
      console.log('data: ' + JSON.stringify(data))
      setGithubState(prevState => ({
        ...prevState,
        repositories: data
      }))
    })
  }

  const getUserStarred = username => {
    Api.get(`users/${username}/starred`).then(({ data }) => {
      console.log('data: ' + JSON.stringify(data))
      setGithubState(prevState => ({
        ...prevState,
        starred: data
      }))
    })
  }

  const ContextValue = {
    githubState,
    getUser: useCallback(username => getUser(username), []),
    getUserRepos: useCallback(username => getUserRepos(username), []),
    getUserStarred: useCallback(username => getUserStarred(username), [])
  }

  return (
    <GithubContext.Provider value={ContextValue}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubProvider
