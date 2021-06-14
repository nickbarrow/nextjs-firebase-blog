import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default function BeerNav(props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Navbar className={'BeerNav'} expanded={expanded} expand="lg">
      <Navbar.Brand>
        <a href="/" onClick={() => setExpanded(false)}>
          <img
            alt=""
            src="../images/logo_magic.png"
            className="nav-logo d-inline-block align-top"
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
      </Navbar.Collapse>
    </Navbar>
  )
}
