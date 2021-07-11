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

      <main className={mainStyle}>
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
      <div className={imageViewGap} ></div>
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

const mainStyle = css`
  padding:2em;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%,22em), 1fr));
  position: relative;
  &:before {
    content: '';
    display: none;
    @media (max-width: 785px) {
      display:block;
      position: absolute;
      z-index:-1;
      top:0;
      left:0;
      width: 100%;
      height: 100%;
      background: rgb(255,244,246);
      background: linear-gradient(180deg, rgba(255,244,246,0.92) 0%, rgba(255,244,246,0.90) 85%, rgba(255,244,246,0) 100%);
    }
  }
  &:after {
    display: none;
    content: '';
    @media (max-width: 785px) {
      display: block;
      width: 100%;
      height:30em;
    }
  }
}
`

const leftColumn = css`
  display: grid;
  justify-items: center;
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
const imageViewGap = css`
  display:none;
  @media (max-width: 785px) {
    width: 100%;
    height: 100vh;
    display:block;
  }
  
`

const background = css`
  position:fixed;
  right:0;
  bottom:0;
  @media (max-width: 785px) {
    opacity: 1;
  }
`
const BackgroundContainer = styled.div`
  display: block;
`

export default App
