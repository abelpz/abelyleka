import React from 'react'

function Zoom ({ words }) {
  return (
    <>
      <p>A través de Zoom, donde no solo {words.podran} ver el acto, sino que nosotros también podremos {words.verlos} e interactuar con{words.ustedes}. Poco antes de empezar la ceremonia {words.podran} entrar a la reunión de Zoom usando el enlace:</p>
      <p style={{ width: '100%' }}><a href="https://us02web.zoom.us/j/81091067670?pwd=TEhSem13YVRKYTVsdk4yeUhVWlpIUT09" target="_blank" rel="noreferrer">Entrar a la reunión</a><br/></p>
    </>
  )
}

export default Zoom
