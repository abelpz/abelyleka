import React from 'react'
import * as PIXI from 'pixi.js'
import {
  Stage,
  Sprite,
  withFilters,
  Container
} from '@inlet/react-pixi'

import { render } from 'ReactDOM'

console.clear()

const width = 400
const height = 400
const backgroundColor = 0x1d2330

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

const Filters = withFilters(Container, {
  displacement: PIXI.filters.DisplacementFilter
})

const config = {
  displacement: {
    x: 1,
    y: 1
  }
}

const Bunny = ({ config }) => {
  const displacementSpriteRef = React.useRef()
  const [renderFilter, setRenderFilter] = React.useState(false)

  React.useEffect(() => {
    displacementSpriteRef.current.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
    setRenderFilter(true)
  }, [])

  return (
    <>
      <Sprite
        {...config}
        image="https://pixijs.io/examples/examples/assets/pixi-filters/displacement_map_repeat.jpg"
        ref={displacementSpriteRef}
      />
      {renderFilter && (
        <Filters
          displacement={{
            construct: [displacementSpriteRef.current],
            scale: { x: 30, y: 60 }
          }}
        >
          <Sprite
            anchor={0.5}
            scale={5}
            x={width / 2}
            y={height / 2}
            image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
          />
        </Filters>
      )}
    </>
  )
}

const App = () => {
  const [displacementConfig, setDisplacementConfig] = React.useState(
    config.displacement
  )

  const gui = React.useMemo(() => {
    const g = new dat.GUI()

    const displacement = g.addFolder('Displacement')
    displacement.open()
    displacement.add(config.displacement, 'x', 0, 1000).onChange((value) => setDisplacementConfig((config) => ({ ...config, x: value })))
    displacement.add(config.displacement, 'y', 0, 1000).onChange((value) => setDisplacementConfig((config) => ({ ...config, y: value })))

    return g
  }, [])

  return (
    <Stage width={width} height={height} options={{ backgroundColor }}>
      <Bunny config={displacementConfig} />
    </Stage>
  )
}

render(<App />, document.getElementById('root'))
