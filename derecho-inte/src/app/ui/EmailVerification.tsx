'use client';

import React, { useState, useEffect} from "react";
import { AlertTriangle, X } from 'lucide-react';
import pb from "../database/db";
import { sendVerification } from "../actions/auth";

import { getUser, getVerifyUser } from "../actions/users";

// ====================================================================
// MOCKS DE ACCIÓN (Mantener o reemplazar con tu lógica de Next.js/PocketBase)
// ====================================================================

// 3. Mock de la función de reenvío


// ====================================================================


/**
 * Componente Flotante para la Verificación de Email.
 * Muestra un aviso de verificación con un botón para reenviar el email.
 * Incluye un botón flotante de reapertura en la esquina superior izquierda.
 * * @param {object} props
 * @param {object | null} props.user - Objeto de usuario con la propiedad 'verified' y 'email'.
 */
const EmailVerificationPopup = ({ user }) => {
     const [show, setShow] = useState(user.verified);


    // El estado inicial es 'true' para mostrar el popup grande la primera vez
    const [showVerificationPopup, setShowVerificationPopup] = useState(true);
    

    useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const _user = await getVerifyUser();
        console.log(_user,'chaufa')
        if (_user.verified) {
          setShow(true);
          clearInterval(interval);
        }
      } catch (err) {
        console.error('Error al verificar estado del usuario', err);
      }
    }, 3000); // Cada 3 segundos

    return () => clearInterval(interval);
  }, [user.id]);
    // Si el usuario no existe o ya está verificado, no se renderiza nada.
    const needsVerification = !show
    console.log(needsVerification)
    console.log(user, 'ajam')

    const handleResendVerification = async (email) => {
    const formData = new FormData();
    formData.append('email',email)
    const response = await sendVerification(formData)
    
    /* if (response){
        setShow(false)
    } */
    // NOTA: Aquí iría tu lógica real para llamar a la API para reenviar el email.
    console.log(`Solicitando reenvío de verificación para: ${email}`);
    // Reemplazado alert por console.log para cumplir con las restricciones de la plataforma.
    console.log("AVISO: Enlace de verificación enviado. Por favor, revisa tu correo.");
};

    if (!needsVerification) {
        return null;
    }
    
    console.log("hoo")

    const isPopupOpen = showVerificationPopup;
    const isFloatingButtonVisible = !showVerificationPopup;

    // Contenido del Popup principal
    const PopupContent = (
        <div className="fixed top-0 left-0 right-0 z-50 p-4 sm:top-4 sm:right-4 sm:left-auto sm:w-80 transition-all duration-300">
            <div className="bg-yellow-800 border-l-4 border-yellow-500 text-white p-4 rounded-lg shadow-2xl flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 flex-shrink-0 text-yellow-300 mt-0.5" />
                <div className="flex-grow">
                    <h4 className="text-base font-semibold mb-1">
                        ¡Email no verificado!
                    </h4>
                    <p className="text-sm text-yellow-200 mb-3">
                        Tu cuenta está activa, pero por favor verifica tu correo electrónico para acceder a todas las funcionalidades.
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
    );

    // Botón de Reapertura (flechita arriba a la izquierda)
    const ReopenButton = (
        <button
            onClick={() => setShowVerificationPopup(true)}
            className="fixed top-6 left-6 z-40 p-3 bg-yellow-500 hover:bg-yellow-600 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-50"
            aria-label="Mostrar aviso de verificación de email"
        >
            {/* Usamos AlertTriangle como icono de aviso */}
            <AlertTriangle className="w-6 h-6 text-gray-900" />
        </button>
    );

    return (
        <>
            {isPopupOpen && PopupContent}
            {isFloatingButtonVisible && ReopenButton}
        </>
    );
};

export default EmailVerificationPopup;
