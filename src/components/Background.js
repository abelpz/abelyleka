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
  const [images, setImages] = useState({})

  const imagesLoaded = (imagesArray) => {
    return new Promise((resolve, reject) => {
      let loadedImagesCounter = 0
      imagesArray.forEach((image) => {
        const img = new Image()
        img.src = image
        img.addEventListener('load', () => {
          loadedImagesCounter++
          if (loadedImagesCounter === imagesArray.length) {
            resolve(true)
          }
        })
      })
    })
  }

  const [windowSize, setWindowSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })

  const initialAspectRatio = windowSize.width / windowSize.height

  const canvasOptions = {
    backgroundAlpha: 0,
    autoResize: true
  }

  const [canvasStyle, setCanvasStyle] = useState({
    ...windowSize
  })

  const imageInitialState = {
    height: initialAspectRatio > 1.56 ? (windowSize.width * 4 / 5) : (windowSize.height + 300),
    width: initialAspectRatio > 1.56 ? (windowSize.width) : ((windowSize.height + 300) * 5 / 4),
    x: initialAspectRatio > 1.56 ? 20 : windowSize.width - (windowSize.height * 5 / 4) - 300,
    y: initialAspectRatio > 1.56 ? -140 : -100,
    pivotX: initialAspectRatio > 1.56 ? 20 : windowSize.width - (windowSize.height * 5 / 4) - 300,
    pivotY: initialAspectRatio > 1.56 ? -140 : -100
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
      setImageState({
        ...imageInitialState,
        x: (imageState.pivotX + (window.innerWidth / 2 - e.clientX) / 150),
        y: (imageState.pivotY + (window.innerWidth / 2 - e.clientY) / 90)
      })
    },
    [imageState]
  )

  const onWindowSizeChange = useCallback(
    (e) => {
      const width = document.documentElement.clientWidth
      const height = document.documentElement.clientHeight

      setCanvasStyle({ ...canvasStyle, width, height })

      if (height === windowSize.height) {
        setImageState({
          ...imageInitialState
        })
      }
      setWindowSize({ width, height })
    },
    [imageState, windowSize]
  )

  useEffect(() => {
    imagesLoaded([MainPhoto, MainPhotoDepthMap])
      .then((loaded) => {
        if (loaded) {
          setImages(MainPhoto, MainPhotoDepthMap)
        }
      })
  }, [])

  useEffect(() => {
    setImageState({
      ...imageInitialState
    })
    setFilterState({
      scale: {
        x: 1,
        y: 1
      }
    })
  }, [images])

  useEffect(() => {
    setRenderFilter(true)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onWindowSizeChange)
    return () => {
      window.removeEventListener('resize', onWindowSizeChange)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [imageState])

  return (
    <Stage options={canvasOptions} {...canvasStyle} {...props} >
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
