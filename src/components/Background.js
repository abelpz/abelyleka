import React, {
  useState,
  useRef,
  useEffect
} from 'react'

import * as PIXI from 'pixi.js'
import {
  Stage,
  Sprite,
  withFilters,
  Container
} from '@inlet/react-pixi'

import {
  MainPhoto,
  MainPhotoDepthMap
} from '../assets/images'

function Background (props) {
  const [canvasStyle, setCanvasStyle] = useState({
    width: document.body.clientWidth,
    height: (document.documentElement.clientWidth * 1.0 * 4 / 5)
  })

  const canvasOptions = {
    backgroundAlpha: 0,
    autoResize: true
  }

  const imageInitialState = {
    height: (document.documentElement.clientWidth * 1.0 * 4 / 5),
    width: (document.documentElement.clientWidth * 1.0),
    x: 20,
    y: -140
  }

  const displacementSpriteRef = useRef()

  const Filters = withFilters(Container, {
    displacement: PIXI.filters.DisplacementFilter
  })

  const [imageState, setImageState] = useState(imageInitialState)
  const [filterState, setFilterState] = useState({})

  const [renderFilter, setRenderFilter] = useState(false)

  useEffect(() => {
    setRenderFilter(true)
    // setBackgroundImageSize()
    window.onmousemove = e => {
      setFilterState({
        scale: {
          x: (window.innerWidth / 2 - e.clientX) / 80,
          y: (window.innerHeight / 2 - e.clientY) / 40
        }
      })
      setImageState({
        ...imageInitialState,
        x: (imageInitialState.x + (window.innerWidth / 2 - e.clientX) / 150),
        y: (imageInitialState.y + (window.innerWidth / 2 - e.clientY) / 90)
      })
    }

    window.addEventListener('resize', (e) => {
      const width = document.documentElement.clientWidth
      const height = document.documentElement.clientHeight

      // console.log(width / height, 5 / 4)
      console.log(imageState.x, width)

      setCanvasStyle({ width, height })

      if (height < (imageState.height - 160)) {
        setImageState({
          ...imageInitialState,
          x: imageInitialState.x - (imageInitialState.width - width)
        })
      }
    })
  }, [])

  return (
    <Stage options={canvasOptions} {...canvasStyle} {...props}>
      <Sprite image={MainPhotoDepthMap} ref={displacementSpriteRef} {...imageState} />

      {renderFilter && (
        <Filters
          displacement={{
            ...filterState,
            construct: [displacementSpriteRef.current]
          }}
        >
          <Sprite image={MainPhoto} {...imageState}></Sprite>
        </Filters>
      )}
    </Stage>
  )
}

export default React.memo(Background)
