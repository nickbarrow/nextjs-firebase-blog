import React, { useState } from 'react'
import { getProperties, firestore } from '@lib/firebase'
import { Layout } from '@components'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useAuth } from '@contexts/auth'
import { BeerCarousel, UploadModal } from '@components'

const Gallery = ({ properties }) => {
  const [user] = useAuth()
  // Modal display state
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [deletingItem, setDeletingItem] = useState(null)

  // Set form state when editing existing item.
  const editItem = (item) => {
    setEditingItem(item)
    setShowModal(true)
  }

  const deleteProperty = async () =>
    await firestore.collection('properties').doc(deletingItem.id).delete()

  return (
    <Layout>
      <div className="gallery">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 className="mx-3" style={{ fontSize: '30px', fontWeight: '900' }}>
            Listings
          </h1>
          {user && user.displayName === 'Nick Barrow' ? (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => {
                setShowModal(true)
              }}>
              <i className="fas fa-plus-circle mr-2"></i>
              Add a Property
            </Button>
          ) : (
            ''
          )}
        </div>

        {properties ? (
          <div className="card-grid">
            {properties.map((item, index) => {
              return (
                <Card key={index}>
                  <BeerCarousel gallery={item.imageURLs} text="false" />

                  <Card.Body>
                    <Card.Title>
                      <a href={'/list/' + item.id}>{item.title}</a>
                    </Card.Title>
                    <p className="lead">
                      $<b>{item.price}</b>
                    </p>
                    <p className="br-pill mr-2">{item.br}br</p>
                    <p className="ba-pill">{item.ba}ba</p>
                    <Card.Text>
                      <span className="card-body-fade">{item.desc}</span>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                    {user && (
                      <>
                        <Button
                          variant="primary"
                          className="d-block w-100 my-2"
                          onClick={() => {
                            editItem(item)
                          }}>
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          className="d-block w-100"
                          onClick={() => {
                            setDeletingItem(item)
                            setShowDeleteConfirmation(true)
                          }}>
                          Delete
                        </Button>
                      </>
                    )}
                  </Card.Footer>
                </Card>
              )
            })}
          </div>
        ) : (
          '🔄 Loading...'
        )}

        {/* Property Upload/Edit Modal */}
        {user && (
          <UploadModal
            show={showModal}
            setShowModal={setShowModal}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
          />
        )}

        {/* Item deletion confirmation */}
        <Modal
          show={showDeleteConfirmation}
          onHide={() => setShowDeleteConfirmation(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to delete this property?</p>
            <p>{deletingItem?.title}</p>
            <p style={{ fontSize: '10px' }}>{deletingItem?.id}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteConfirmation(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                deleteProperty()
                setShowDeleteConfirmation(false)
              }}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  )
}

export default Gallery

export async function getServerSideProps() {
  // const posts = await getPosts()
  const properties = await getProperties()

  return {
    props: {
      properties
    }
  }
}
