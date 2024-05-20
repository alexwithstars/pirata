import './style.css'
import confetti from 'canvas-confetti'

const modal = document.getElementById('modal')
const video = document.getElementById('video')
const close = document.getElementById('close')

const login = document.getElementById('login')
const register = document.getElementById('register')

const form = document.getElementById('form')

class Noti {
  constructor ({ text, error = false, time = 3000 }) {
    this.text = text
    this.isError = error
    this.time = time
    this.styles = {
      backgroundColor: this.isError ? '#f44' : '#4a4',
      position: 'fixed',
      top: '10px',
      left: '10px',
      fontSize: '18px',
      zIndex: '100',
      padding: '10px 20px',
      borderRadius: '5px',
      color: '#fff',
      translate: '0 calc(-100% - 20px)',
      transition: 'translate 0.5s'
    }
    this.#show()
  }

  #show () {
    const noti = document.createElement('span')
    noti.textContent = this.text
    Object.assign(noti.style, this.styles)
    document.body.appendChild(noti)
    noti.checkVisibility()
    noti.style.translate = '0 0'
    setTimeout(() => {
      noti.style.translate = '0 calc(-100% - 20px)'
      noti.addEventListener('transitionend', () => {
        document.body.removeChild(noti)
      })
    }, this.time)
  }
}

function logUser (username, password) {
  if (window.localStorage.getItem(username) === password) {
    (
      () => new Noti({ text: 'Login correcto' })
    )()
    modal.show()
    confetti({ particleCount: 300, spread: 360, origin: { y: 0.7 } })
    video.currentTime = 4
    video.play()
  } else {
    (
      () => new Noti({ text: 'Login incorrecto', error: true })
    )()
  }
}

function registerUser (username, password) {
  if (!username || !password) {
    (
      () => new Noti({ text: 'Todos los campos son obligatorios', error: true })
    )()
    return
  }
  if (window.localStorage.getItem(username)) {
    (
      () => new Noti({ text: 'El usuario ya existe', error: true })
    )()
    return
  }
  window.localStorage.setItem(username, password)
  ;(
    () => new Noti({ text: 'Registro correcto' })
  )()
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(form)
  const username = formData.get('username')
  const password = formData.get('password')
  if (e.submitter === login) {
    logUser(username, password)
  }
  if (e.submitter === register) {
    registerUser(username, password)
  }
})

close.addEventListener('click', () => {
  modal.close()
  video.pause()
})
