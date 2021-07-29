import React from 'react'

function Instagram ({ words }) {
  return (
    <>
      <p>
        A través de Instagram, dónde {words.podran} ver la ceremonia en vivo y participar escribiéndonos desde la transmisión. Al inicio de la ceremonia {words.podran} entrar a través de la cuenta:
      </p>
      <p style={{ width: '100%' }}>
        <a href="https://instagram.com/abelyvaleska">@abelyvaleska</a><br/>
      </p>
      <p>en instagram.</p>
    </>
  )
}

export default Instagram
