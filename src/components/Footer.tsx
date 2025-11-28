import logo from '../assets/img/logo.svg'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-16">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-6">
                        <a href="#home" className="block">
                            <img src={logo} alt="J.A. van der Wiel" className="h-16 w-auto" />
                        </a>
                        <p className="text-sm leading-relaxed">
                            Uw betrouwbare partner voor al uw bouw- en timmerwerken. Kwaliteit en vakmanschap staan bij ons centraal.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Navigatie</h4>
                        <ul className="space-y-4">
                            <li><a href="#home" className="nav-link hover:text-primary-500 transition-colors">Home</a></li>
                            <li><a href="#diensten" className="nav-link hover:text-primary-500 transition-colors">Diensten</a></li>
                            <li><a href="#projecten" className="nav-link hover:text-primary-500 transition-colors">Projecten</a></li>
                            <li><a href="#over-ons" className="nav-link hover:text-primary-500 transition-colors">Over Ons</a></li>
                            <li><a href="#contact" className="nav-link hover:text-primary-500 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Diensten</h4>
                        <ul className="space-y-4">
                            <li><a href="#diensten" className="nav-link hover:text-primary-500 transition-colors">Nieuwbouw</a></li>
                            <li><a href="#diensten" className="nav-link hover:text-primary-500 transition-colors">Verbouw</a></li>
                            <li><a href="#diensten" className="nav-link hover:text-primary-500 transition-colors">Renovatie</a></li>
                            <li><a href="#diensten" className="nav-link hover:text-primary-500 transition-colors">Onderhoud</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Van Galenstraat 23<br />2202 JN Noordwijk</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg className="w-6 h-6 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:info@jawbouw.nl" className="nav-link hover:text-white transition-colors">info@jawbouw.nl</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg className="w-6 h-6 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>+31 (0)6 1234 5678</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <p>&copy; {new Date().getFullYear()} J.A. van der Wiel Bouw & Timmerwerken V.O.F. Alle rechten voorbehouden.</p>
                    <p className="flex items-center gap-1">
                        Created by <a href="https://webfabrik.nl" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-500 font-bold transition-colors">Webfabrik.nl</a>
                    </p>
                </div>
            </div>
        </footer>
    )
}
