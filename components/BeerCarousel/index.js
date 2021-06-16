import React from 'react'
import Image from 'next/image'
import Carousel from 'react-bootstrap/Carousel'
import Spinner from 'react-bootstrap/Spinner'

export default function BeerCarousel(props) {
  return (
    <div className="carousel-root">
      <Carousel interval={null}>
        {props.gallery.map((item, index) => {
          return (
            <Carousel.Item key={index}>
              <Image
                className="d-block w-100"
                src={item}
                alt={'Property image ' + (index + 1)}
                layout="fill"
                priority={index === 0 ? true : false}
              />
              {props.text === 'true' && (
                <Carousel.Caption>
                  <a href={{ pathname: `/list/${item.id}` }}>
                    <h3 className="underline-trigger">
                      {item.streetAddress}
                      <div className="underline"></div>
                    </h3>
                  </a>
                  <p>{item.text}</p>
                </Carousel.Caption>
              )}
            </Carousel.Item>
          )
        })}
      </Carousel>
      <div className="loading-img">
        <Spinner animation="border" className="mr-3" />
        Loading...
      </div>
    </div>
  )
}
