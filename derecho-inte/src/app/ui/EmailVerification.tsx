'use client'
import { SessionPayload } from '../lib/sessions'
import React, { useState, useEffect } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import pb from '../database/db'
import { sendVerification } from '../actions/auth'
import { getVerifyUser } from '../actions/users'
import { useUser } from '../context/UserContext'

// 🧩 Tipado del usuario
export type User = {
  id: string
  email: string
  verified: boolean
}

// 🧩 Props del componente
interface EmailVerificationPopupProps {
 
}

/**
 * Componente Flotante para la Verificación de Email.
 * Muestra un aviso de verificación con un botón para reenviar el email.
 * Incluye un botón flotante de reapertura en la esquina superior izquierda.
 */
const EmailVerificationPopup: React.FC<EmailVerificationPopupProps> = ({  }) => {
  const UserContext = useUser()
  const user = UserContext.currentUser
  if(!user)return 
  const [isVerified, setIsVerified] = useState<boolean>(user.verified? true:false)
  const [showVerificationPopup, setShowVerificationPopup] = useState<boolean>(true)

  // 🔁 Comprobación periódica del estado de verificación
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const _user = await getVerifyUser() as SessionPayload
        console.log(_user, 'chaufa')
        if (_user?.verified) {
          setIsVerified(true)
          clearInterval(interval)
        }
      } catch (err) {
        console.error('Error al verificar estado del usuario', err)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [user.id])

  // Si el usuario no existe o ya está verificado, no se muestra nada
  const needsVerification = !isVerified
  if (!needsVerification) return null

  // 🔹 Función para reenviar el correo de verificación
  const handleResendVerification = async (email: string) => {
    try {
      const formData = new FormData()
      formData.append('email', email)
      const response = await sendVerification(formData)
      console.log('Respuesta del servidor:', response)
      console.log(`Solicitando reenvío de verificación para: ${email}`)
      console.log('AVISO: Enlace de verificación enviado. Por favor, revisa tu correo.')
    } catch (err) {
      console.error('Error al reenviar verificación:', err)
    }
  }

  const isPopupOpen = showVerificationPopup
  const isFloatingButtonVisible = !showVerificationPopup

  // 🧩 Contenido del Popup principal
  const PopupContent = (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 sm:top-4 sm:right-4 sm:left-auto sm:w-80 transition-all duration-300">
      <div className="bg-yellow-800 border-l-4 border-yellow-500 text-white p-4 rounded-lg shadow-2xl flex items-start space-x-3">
        <AlertTriangle className="w-6 h-6 flex-shrink-0 text-yellow-300 mt-0.5" />
        <div className="flex-grow">
          <h4 className="text-base font-semibold mb-1">¡Email no verificado!</h4>
          <p className="text-sm text-yellow-200 mb-3">
            Tu cuenta está activa, pero por favor verifica tu correo electrónico para acceder a todas las
            funcionalidades.
          </p>
          <button
            onClick={() => handleResendVerification(user.email)}
            className="w-full bg-yellow-500 hover:bg-yellow-600 transition-colors text-gray-900 text-sm font-bold py-2 px-4 rounded-md shadow-lg"
          >
            Enviar Verificación
          </button>
        </div>
        <button
          onClick={() => setShowVerificationPopup(false)}
          className="p-1 rounded-full text-yellow-200 hover:bg-yellow-700 transition-colors flex-shrink-0"
          aria-label="Cerrar aviso"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )

  // 🧩 Botón flotante de reapertura
  const ReopenButton = (
    <button
      onClick={() => setShowVerificationPopup(true)}
      className="fixed top-6 left-6 z-40 p-3 bg-yellow-500 hover:bg-yellow-600 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-50"
      aria-label="Mostrar aviso de verificación de email"
    >
      <AlertTriangle className="w-6 h-6 text-gray-900" />
    </button>
  )

  return (
    <>
      {isPopupOpen && PopupContent}
      {isFloatingButtonVisible && ReopenButton}
    </>
  )
}

export default EmailVerificationPopup
