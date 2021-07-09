import { css } from '@emotion/css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import data from '../data'
import Instagram from './Mensajes/Instagram'
import Preguntar from './Mensajes/Preguntar'
import Presencial from './Mensajes/Presencial'
import Zoom from './Mensajes/Zoom'

function Invitation () {
  const normalizeText = str => encodeURIComponent(str.normalize('NFD').replace(/\p{Diacritic}| |\./gu, ''))
  const params = useParams()
  const [guests, setGuests] = useState([])
  const [words, setWords] = useState({
    ustedes: ' ustedes',
    la: 'la',
    acompanaran: 'acompañaran',
    desean: 'desean',
    pueden: 'pueden'
  })
  useEffect(() => {
    const guestHead = data.filter((guest) => {
      return normalizeText(guest['nombre del grupo']) === params.slug
    })
    console.log(guestHead)
    const guestGroup = data.filter((guest) => {
      console.log(guestHead[0].grupo)
      return guest.grupo === guestHead[0].grupo
    })
    setGuests(guestGroup)
  }, [])
  const mensaje = {
    Zoom: <Zoom/>,
    Presencial: <Presencial/>,
    Instagram: <Instagram/>,
    Preguntar: <Preguntar/>
  }

  useEffect(() => {
    if (guests?.length === 1) {
      console.log('Hay un invitado')
      setWords({
        ...words,
        ustedes: 'tigo',
        la: '',
        acompanaran: 'acompañaras',
        desean: 'deseas',
        pueden: 'puedes'
      })
    }
  }, [guests])
  console.log(words)

  return (
    <div className={invitation}>
      <p>Para nosotros es un placer y un privilegio invitar a</p>
      {(guests?.length > 0) &&
        <>
          <h2>{guests[0]['nombre del grupo']}</h2>
         <span className="lista-invitados" >
          {guests.map((guest, key) => {
            console.log(key)
            return (
              <span key={key} className="invitado">
                {guest.nombre} {guest.apellido} {(guests[key] !== guests[guests.length - 1]) && ' + '}
              </span>
            )
          })}
          </span>
        </>
      }
      <p>
        a celebrar con nosotros el día de nuestra boda. Queremos compartir la alegría de nuestra boda con{words.ustedes}, por eso nos encantaría que nos {words.acompanaran} el día
      </p>
      <p>
        <span className="date">31 de Julio del 2021 a las 2:00 p.m.</span>
        <span className="branch"></span>
      </p>
      {mensaje[guests[0]?.tipo]}
      <p>Sabemos el deseo que tienen muchos de poder bendecirnos económicamente durante esta nueva etapa de nuestras vidas.</p>
      <p>Si lo {words.desean}, {words.pueden} hacerlo a través de:</p>
    </div>
  )
}

export default Invitation

const invitation = css`
  font-family: 'Montserrat';
  color: #aa959b;
  display:flex;
  justify-content: center;
  flex-wrap: wrap;
  width:100%;

  & h2 {
    font-family: 'Playfair Display', serif;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color:#8d3f54;
    opacity: 0.6;
    font-size: 2em;
    margin: 0.5em 0;
  }
  & span.date{
    font-family: 'Montserrat', 'Roboto', sans-serif;
    font-style: italic;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color:#a9b39a;
    opacity: 1;
    font-size: 1.5em;
    margin: 1.5em 0px;
    line-height: 1.5em;
    width: 100%;
    flex: 1;
  }

  & span.lista-invitados{
    letter-spacing: 0.2em;
    margin-bottom: 2em;
    font-size: 0.8em;
    max-width: 500px;
    line-height: 1.7em;

    & span.invitado{
      margin: 0em, 1em;
      font-style: italic;
    }
  }

  & p {
    font-size: 1em;
    max-width: 500px;
    line-height: 1.7em;
    letter-spacing: 0.2em;
    margin: 1.2em;
  }

  & a{
    color: #a9b39a;
    font-style: italic;
  }

`
