import React, { useContext } from 'react'
import { useAuth } from '@contexts/auth'
import { signInWithGoogle, signOut } from '@lib/firebase'
import Button from 'react-bootstrap/Button'

export default function BeerFooter(props) {
  const [user] = useAuth()

  return (
    <div className="beer-footer">
      <img src="../images/logo_magic.png" alt="Logo Transparent Background" />

      <div className="footer-right">
        {user ? (
          <Button onClick={() => signOut()} variant="outline-secondary">
            Logout
          </Button>
        ) : (
          <Button
            onClick={() => signInWithGoogle()}
            variant="outline-secondary">
            Admin Login
          </Button>
        )}
        <span className="d-block my-2">© Beer Properties 2021</span>
        <span className="d-block">
          Made with{' '}
          <span role="img" aria-label="Black Heart Emoji">
            🖤
          </span>{' '}
          in Fort Wayne
        </span>
      </div>
    </div>
  )
}
