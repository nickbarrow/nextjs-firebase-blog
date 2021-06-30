import React, { useState } from 'react'
import { useAuth } from '@contexts/auth'
import { signInWithGoogle, signOut } from '@lib/firebase'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'

export default function BeerNav(props) {
  const [expanded, setExpanded] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [user] = useAuth()

  const handleDropdownClick = () => {
    if (showDropdown === true) setShowDropdown(false)
    else setShowDropdown(true)
  }

  return (
    <Navbar className={'BeerNav'} expanded={expanded} expand="lg">
      <Navbar.Brand>
        <a href="/" onClick={() => setExpanded(false)}>
          <img
            className="nav-logo d-inline-block align-top"
            src="../images/logo_magic.png"
            alt="Logo Transparent"
          />
        </a>
      </Navbar.Brand>
      <Navbar.Toggle
        onClick={() => setExpanded(!expanded)}
        aria-controls="responsive-navbar-nav"
      />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <a href="/" className="nav-link" onClick={() => setExpanded(false)}>
            Home
          </a>

          <a
            href="/list"
            className="nav-link"
            onClick={() => setExpanded(false)}>
            Listings
          </a>

          <Nav.Link>Contact Us</Nav.Link>
        </Nav>

        {user ? (
          <div className="nav-link nav-user">
            <Dropdown show={showDropdown}>
              <div className="logged-in" onClick={handleDropdownClick}>
                <img
                  className="nav-profile-pic mr-3"
                  src={user.photoURL}
                  alt="User Profile Pic"
                />
                <span>{user.displayName}</span>
              </div>

              <Dropdown.Menu>
                <Dropdown.Item onClick={signOut}>
                  <i className="fas fa-door-open mr-2"></i>
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <div className="nav-link nav-user" onClick={signInWithGoogle}>
            <span>Login</span>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}
