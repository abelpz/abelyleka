import React from 'react'
import styled from '@emotion/styled'
import { Leafs } from '../assets/images'

function StageDecoration () {
  return (
    <>
      <LeafTop>
          <img src={Leafs} alt=""/>
      </LeafTop>
      <LeafBottom>
          <img src={Leafs} alt=""/>
      </LeafBottom>
    </>
  )
}

const LeafTop = styled.div(_ => ({
  position: 'fixed',
  top: '-50px',
  left: '-35px',
  width: '25vw',
  minWidth: '14em',
  '& img': {
    width: '100%'
  }
}))

const LeafBottom = styled.div(_ => ({
  position: 'fixed',
  transform: 'rotate(180deg)',
  bottom: '-15em',
  left: 'calc(50vw - 3em)',
  width: '25vw',
  minWidth: '14em',
  '& img': {
    width: '100%'
  }
}))

export default StageDecoration
