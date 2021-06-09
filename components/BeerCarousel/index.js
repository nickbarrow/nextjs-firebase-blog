import React, { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'

export default function BeerCarousel(props) {

  return (
    <Carousel>
      {props.gallery.map((item, index) => {
        return (
          <Carousel.Item key={index} interval={10000}>
            <img className="d-block w-100" src={item} alt="First slide" />
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
  )
}