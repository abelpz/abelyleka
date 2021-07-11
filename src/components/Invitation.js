import { css } from '@emotion/css'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { Branch, BranchAlt, DatosRegalo, Thumbnail } from '../assets/images'
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
    pueden: 'pueden',
    podran: 'podrán',
    verlos: 'verlos',
    sus: 'sus',
    correos: 'correos'
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
    Zoom: <Zoom words={words}/>,
    Presencial: <Presencial words={words}/>,
    Instagram: <Instagram words={words}/>,
    Preguntar: <Preguntar words={words}/>
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
        pueden: 'puedes',
        podran: 'podrás',
        verlos: 'verte',
        sus: 'tu',
        correos: 'correo'
      })
    }
  }, [guests])
  console.log(words)

  return (
    <>
      <Helmet>
        <title>Abel y Valeska | {guests?.length > 0 && guests[0]['nombre del grupo']}</title>
        <meta property="og:title" content={'Abel y Valeska | ' + guests?.length > 0 && guests[0]['nombre del grupo']} />
        <meta property="og:url" content={window.location.pathname + window.location.search} />
        <meta property="og:image" content={Thumbnail} />
        <meta
            property="og:description"
            content={guests?.length > 0 && guests[0]['nombre del grupo']}
        />
      </Helmet>
      <div className={invitation}>
        <p>Para nosotros es un placer y un privilegio invitar a</p>
        {(guests?.length > 0) &&
          <>
            <h2>{guests[0]['nombre del grupo']}</h2>
            {(guests.length > 2) &&
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
            }
          </>
        }
        <p>
          a celebrar con nosotros el día de nuestra boda. Queremos compartir la alegría de nuestra boda con{words.ustedes}, por eso nos encantaría que nos {words.acompanaran} el día
        </p>
        <p>
          <span className="date">31 de Julio del 2021 a las 2:00 p.m.</span>
          <span className="branch">
            <img src={Branch} alt="" />
          </span>
        </p>
        {mensaje[guests[0]?.tipo]}
        <p>
          <span className="branch">
            <img src={BranchAlt} alt="" />
          </span>
        </p>
        <p>Sabemos el deseo que tienen muchos de poder bendecirnos económicamente durante esta nueva etapa de nuestras vidas.</p>
        <p>Si lo {words.desean}, {words.pueden} hacerlo a través de:</p>
        <span className="datos-regalo">
          <img src={DatosRegalo} alt="Datos para el regalo" />
        </span>
      </div>
    </>
  )
}

export default Invitation

const invitation = css`
  font-family: 'Montserrat';
  color: #aa959b;
  display:grid;
  justify-items: center;
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
  
  & span.branch{
    width: 100%;
    display:block;

    img {
      max-width: 270px;
      min-width: 250px;
    }
    
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

  & span.datos-regalo{
    margin-top: 2em;

    & img {
      width: 20em;
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
