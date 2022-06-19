import React from 'react'
import App from './App'
import GithubProvider from './providers/github-provider'
import { ResetCSS } from './global/resetCSS'

const Providers = () => {
  return (
    <div>
      <main>
        <GithubProvider>
          <ResetCSS />
          <App />
        </GithubProvider>
      </main>
    </div>
  )
}

export default Providers
