import React from 'react'
import Zoom from './Zoom'

function Preguntar ({ words }) {
  return (
    <>
      <Zoom words={words}/>

      <p>
        Aún así, queremos saber cuáles de nuestros invitados quisieran y tienen las posibilidades de poder asistir en persona y celebrar junto a nosotros. Para ello es muy importante que llenen este pequeño formulario de consulta tan pronto como sea posible:
      </p>
      <p style={{ width: '100%' }}><a href="https://forms.gle/KxPrBS8a659RC9Mf7" target="_blank" rel="noreferrer">Llenar formulario</a><br /></p>
  </>
  )
}

export default Preguntar
