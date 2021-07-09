import './App.css'

import { Logo } from './assets/images'

import StageDecoration from './canvas/StageDecoration'
import { css } from '@emotion/css'
import styled from '@emotion/styled'

import Background from './components/Background'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Invitation from './components/Invitation'
import Particles from 'react-particles-js'

function App () {
  return (
    <>
      <BackgroundContainer>
        <Background className={background}/>
        <StageDecoration />
        <Particles
          className={particles}
          params={particleSettings}
        />
      </BackgroundContainer>

      <main className={css`
        margin:5em;
        display: grid;
        grid-template-columns: 1fr 1fr;
      `}>
        <div className={leftColumn}>
          <div className={logoStyle}>
            <img src={Logo} alt="Abel y Valeska" />
          </div>
          <Router>
            <Switch>
              <Route exact path="/invitacion/:slug">
                <Invitation />
              </Route>
            </Switch>
          </Router>
        </div>
        <div className="right-column">
        </div>
      </main>
    </>
  )
}

const particleSettings = {
  fpsLimit: 60,
  particles: {
    links: {
      width: 0
    },
    shape: {
      type: 'polygon',
      options: {
        color: {
          value: '#000'
        },
        polygon: {
          sides: 7
        }
      }
    },
    shadow: {
      blur: 7,
      enable: true,
      color: '#fff'
    },
    life: {
      count: 40
    },
    collisions: {
      enable: false
    },
    move: {
      speed: 1,
      outModes: {
        top: 'split'
      }
    },
    opacity: {
      value: {
        max: 0.65,
        min: 0.1
      }
    },
    size: {
      value: {
        max: 16,
        min: 2
      },
      random: {
        enable: true,
        minimumValue: 1
      },
      animation: {
        count: 4,
        enable: true,
        minimumValue: 0.1,
        speed: 4,
        startValue: 'random',
        sync: false
      }
    }
  }
}

const leftColumn = css`
  display: flex;
  justify-content: center;
  flex-flow: column;
  text-align: center;
`
const logoStyle = css`
  width: 100%;
  text-align: center;
  margin-bottom: 4em;
  & img {
    width: 20em;
    max-width: 80%;
    position:relative;
  }
`
const particles = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  filter: blur(2px);
`
const background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
`
const BackgroundContainer = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
`

export default App
