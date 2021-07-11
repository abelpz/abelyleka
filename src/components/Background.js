import React, {
  useState,
  useRef,
  useEffect,
  useCallback
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
  const initialAspectRatio = document.documentElement.clientWidth / document.documentElement.clientHeight

  const canvasOptions = {
    backgroundAlpha: 0,
    autoResize: true
  }

  const [canvasStyle, setCanvasStyle] = useState({
    width: initialAspectRatio > 1.56 ? document.body.clientWidth : (document.documentElement.clientHeight * 5 / 4),
    height: initialAspectRatio > 1.56 ? (document.documentElement.clientWidth * 1.0 * 4 / 5) : (document.documentElement.clientHeight)
  })

  const imageInitialState = {
    height: initialAspectRatio > 1.56 ? (document.documentElement.clientWidth * 4 / 5) : (document.documentElement.clientHeight + 300),
    width: initialAspectRatio > 1.56 ? (document.documentElement.clientWidth) : ((document.documentElement.clientHeight + 300) * 5 / 4),
    x: initialAspectRatio > 1.5 ? 20 : document.documentElement.clientWidth - (document.documentElement.clientHeight * 5 / 4) - 300,
    y: initialAspectRatio > 1.5 ? -140 : -100,
    pivotX: initialAspectRatio > 1.5 ? 20 : document.documentElement.clientWidth - (document.documentElement.clientHeight * 5 / 4) - 300,
    pivotY: initialAspectRatio > 1.5 ? -140 : -100
  }

  const displacementSpriteRef = useRef()

  const Filters = withFilters(Container, {
    displacement: PIXI.filters.DisplacementFilter
  })

  const [imageState, setImageState] = useState(imageInitialState)
  const [filterState, setFilterState] = useState({})

  const [renderFilter, setRenderFilter] = useState(false)

  const onMouseMove = useCallback(
    (e) => {
      setFilterState({
        scale: {
          x: (window.innerWidth / 2 - e.clientX) / 80,
          y: (window.innerHeight / 2 - e.clientY) / 40
        }
      })
      // console.log('mousemove', imageState.pivotX)
      setImageState({
        ...imageInitialState,
        x: (imageState.pivotX + (window.innerWidth / 2 - e.clientX) / 150),
        y: (imageState.pivotY + (window.innerWidth / 2 - e.clientY) / 90)
      })
    },
    [imageState]
  )

  // const resizeImage = () => {

  // }

  const onWindowSizeChange = useCallback(
    (e) => {
      const width = document.documentElement.clientWidth
      const height = document.documentElement.clientHeight

      // console.log(width / height, 5 / 4)
      // console.log(imageStaWte.x, width)

      setCanvasStyle({ ...canvasStyle, width, height })

      if (height < (imageState.height - 160)) {
        setImageState({
          ...imageInitialState,
          x: imageState.pivotX - (imageInitialState.width - width),
          pivotX: imageState.pivotX - (imageInitialState.width - width)
        })
      // console.log('resizeX', imageState.pivotX)
      // console.log('resizePX', imageState.pivotX)
      }
    },
    [imageState]
  )

  useEffect(() => {
    setImageState(imageInitialState)
  }, [])

  useEffect(() => {
    setRenderFilter(true)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onWindowSizeChange)
    // console.log(document.documentElement.clientWidth / document.documentElement.clientHeight)
    // console.log({ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight })
    // console.log(imageState)
    // console.log({ diff: imageState.width - document.documentElement.clientWidth })
    return () => {
      window.removeEventListener('resize', onWindowSizeChange)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [imageState])

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
