import React, { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Image from 'next/image'

export default function BeerCarousel(props) {
  return (
    <Carousel interval={null}>
      {props.gallery.map((item, index) => {
        return (
          <Carousel.Item key={index} interval={10000}>
            <Image
              className="d-block w-100"
              src={item}
              // loader={() =>
              //   'https://thumbs.gfycat.com/ArtisticShoddyKudu-small.gif'
              // }
              alt={'Slide ' + index}
              width={350}
              height={200}
              priority={true}
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
  )
}
