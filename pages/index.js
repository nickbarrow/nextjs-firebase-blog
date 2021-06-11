import React, { useState, useEffect } from 'react'
import { getPosts, getProperties } from '@lib/firebase'
import { Layout } from '@components'
import { useAuth } from '@contexts/auth'
// react-bootstrap component imports
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const Home = ({ posts, properties }) => {
  const [user] = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(false)

  var toggleEditing = () => {
    if (editing) setEditing(false)
    else setEditing(true)
  }

  const [windowHeight, setWindowHeight] = useState(undefined)

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowHeight(window.innerHeight)
      }

      // Add event listener
      window.addEventListener('resize', handleResize)

      // Call handler right away so state gets updated with initial window size
      handleResize()

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Layout>
      <div className="home" style={{ height: windowHeight }}>
        <img
          className="home-img"
          src="images/kitchen.jpg"
          alt="Beautiful Home"
        />

        <div className="home-text">
          <h1 className="mb-3">Homepage H1</h1>

          <p>
            Homepage paragraph text.
            <br />
            Give us a call at (555) 555-5555 or schedule an appointment online:
          </p>

          <Button>Schedule an Appointment</Button>
        </div>

        <div className="image-info">
          <div className="info">
            <span>
              Photo by{' '}
              <a href="https://unsplash.com/@aahubs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                Aaron Huber
              </a>{' '}
              on{' '}
              <a href="https://unsplash.com/s/photos/real-estate-house?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                Unsplash
              </a>
            </span>
          </div>

          {user && (
            <>
              <div className={`edit-info ${editing ? 'editing' : ''}`}>
                <span
                  onClick={() => {
                    toggleEditing()
                  }}>
                  Edit Homepage
                </span>
              </div>

              <Modal
                show={showModal}
                onHide={() => {
                  setShowModal(false)
                }}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    <b>Edit Homepage</b>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Header Text</Form.Label>
                    <Form.Control type="text" placeholder="Homepage H1" />
                    {/* <Form.Text className="text-muted">
                    Greeting header.
                  </Form.Text> */}
                    <br />

                    <Form.Label>Paragraph Text</Form.Label>
                    <Form.Control type="text" placeholder="Homepage H1" />
                    <br />

                    <Form.Label>Button Text</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Schedule an Appointment"
                    />
                    <br />
                    <Form.Label>Button Link</Form.Label>
                    <Form.Control type="text" placeholder="appt" />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowModal(false)
                    }}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setShowModal(false)
                    }}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const posts = await getPosts()
  const properties = await getProperties()

  return {
    props: {
      posts,
      properties
    }
  }
}

export default Home
