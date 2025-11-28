import './Hero.scss'
import logo from '../assets/img/logo.svg'

export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center bg-primary-50 overflow-hidden pt-20 lg:pt-0">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/50 skew-x-12 transform origin-top-right hidden lg:block"></div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left Content - Text */}
                    <div className="lg:w-1/2 animate-fade-in-up text-center lg:text-left">
                        <span className="inline-block px-4 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-bold tracking-wide uppercase mb-6 border border-primary-200">
                            Vakmanschap sinds 2008
                        </span>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-900 leading-tight mb-6">
                            Bouwen met <br />
                            <span className="text-primary-600">
                                Oog voor Detail
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Van complete nieuwbouw tot verfijnde renovaties. Wij realiseren uw woonwensen met passie, precisie en persoonlijk contact.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a
                                href="#contact"
                                className="px-8 py-4 bg-primary-600 hover:bg-primary-700 font-bold rounded-xl shadow-lg shadow-primary-600/20 transition-all transform hover:-translate-y-1 text-center"
                                style={{ color: '#ffffff' }}
                            >
                                Start uw Project
                            </a>
                            <a
                                href="#projecten"
                                className="px-8 py-4 bg-white hover:bg-gray-50 text-primary-700 font-bold rounded-xl shadow-md border border-gray-200 transition-all transform hover:-translate-y-1 text-center"
                            >
                                Bekijk ons Werk
                            </a>
                        </div>
                    </div>

                    {/* Right Content - Logo */}
                    <div className="lg:w-1/2 relative h-[400px] md:h-[600px] w-full mt-10 lg:mt-0 flex items-center justify-center">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white rounded-full blur-3xl opacity-60"></div>

                        <div className="relative z-20 w-full h-full flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <img
                                src={logo}
                                alt="J.A. van der Wiel Bouw & Timmerwerken"
                                className="max-w-full max-h-full object-contain drop-shadow-2xl p-8"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
