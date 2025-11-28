import { useState, useRef } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import figuurzaag from '../assets/img/diensten/figuurzaag.webp'
import vlinderboor from '../assets/img/diensten/vlinderboor.webp'

export default function ContactForm() {
    const [status, setStatus] = useState<string | null>(null)
    const { executeRecaptcha } = useGoogleReCaptcha()
    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!executeRecaptcha) {
            setStatus('ReCAPTCHA not ready')
            return
        }

        try {
            const token = await executeRecaptcha('contact_form')

            if (!formRef.current) return

            const formData = new FormData(formRef.current)
            const data = Object.fromEntries(formData.entries())

            const response = await fetch('/.netlify/functions/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, token }),
            })

            if (response.ok) {
                setStatus('Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.')
                formRef.current.reset()
            } else {
                setStatus('Er is iets misgegaan. Probeer het later opnieuw.')
            }
        } catch (error) {
            console.error('Error submitting form:', error)
            setStatus('Er is een fout opgetreden. Controleer uw internetverbinding.')
        }
    }

    return (
        <section id="contact" className="py-24 bg-primary-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <img src={figuurzaag} alt="" className="absolute top-10 left-10 w-64 h-auto transform rotate-45" />
                <img src={vlinderboor} alt="" className="absolute bottom-10 right-10 w-56 h-auto transform -rotate-12" />
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-10 bg-primary-600 text-white flex flex-col justify-between">
                            <div>
                                <h2 className="text-3xl font-bold mb-6" style={{ color: '#ffffff' }}>Neem Contact Op</h2>
                                <p className="text-white/90 mb-8 leading-relaxed">
                                    Heeft u een vraag of wilt u een offerte aanvragen? Vul het formulier in en wij nemen zo spoedig mogelijk contact met u op.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span>+31 (0)6 1234 5678</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span>info@jawbouw.nl</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>Noordwijk, Nederland</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <div className="h-1 w-12 bg-primary-400 rounded-full mb-4"></div>
                                <p className="text-sm text-white/80">KVK: 91805406</p>
                            </div>
                        </div>

                        <div className="p-10 bg-white dark:bg-gray-800">
                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Naam</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                                        placeholder="Uw naam"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                                        placeholder="uw@email.nl"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bericht</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-all resize-none"
                                        placeholder="Hoe kunnen we u helpen?"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 px-6 bg-primary-600 hover:bg-primary-700 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                                    style={{ color: '#ffffff' }}
                                >
                                    Verstuur Bericht
                                </button>

                                {status && (
                                    <div className={`p-4 rounded-lg text-center ${status.includes('Bedankt') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {status}
                                    </div>
                                )}

                                <p className="text-xs text-gray-500 text-center mt-4">
                                    This site is protected by reCAPTCHA and the Google
                                    <a href="https://policies.google.com/privacy" className="text-primary-600 hover:underline mx-1">Privacy Policy</a> and
                                    <a href="https://policies.google.com/terms" className="text-primary-600 hover:underline mx-1">Terms of Service</a> apply.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
