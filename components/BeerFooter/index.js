import React, { useContext } from 'react'
import { useAuth } from '@contexts/auth'
import { signInWithGoogle, signOut } from '@lib/firebase'

export default function BeerFooter(props) {
  const [user] = useAuth()
  
  return (
    <div className="beer-footer">
      <img src="images/logo_magic.png" />

      <div className="footer-right">
        {user ? (
          <a href onClick={() => signOut() } className="btn btn-outline-secondary">
            Logout
          </a>
        ) : (
          <a href onClick={() => signInWithGoogle() } className="btn btn-outline-secondary">
            Admin Login
          </a>
        )}
        <span className="d-block my-2">© Beer Properties 2021</span>
        <span className="d-block">Made with 🖤 in Fort Wayne</span>
      </div>
    </div>
  )
}