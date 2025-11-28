import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import '@fontsource-variable/montserrat'
import './assets/scss/globals.scss'
import App from './App'
import './index.css'

const RECAPTCHA_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''

if (!RECAPTCHA_KEY) {
    console.warn('VITE_RECAPTCHA_SITE_KEY is missing in environment variables. reCAPTCHA will not work.')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HelmetProvider>
            <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
                <App />
            </GoogleReCaptchaProvider>
        </HelmetProvider>
    </React.StrictMode>,
)
