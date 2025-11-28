import { useState, useEffect } from 'react'
import logo from '../assets/img/logo.svg'
import ResponsiveToggle from './ResponsiveToggle'

export default function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    useEffect(() => {
        let ticking = false

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 20)
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const menuItems = [
        { label: 'Home', path: '#home' },
        { label: 'Diensten', path: '#diensten' },
        { label: 'Projecten', path: '#projecten' },
        { label: 'Over Ons', path: '#over-ons' },
        { label: 'Contact', path: '#contact' },
    ]

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled && !isMobileMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
                }`}
        >
            <div className="container px-4 mx-auto flex justify-between items-center">
                {/* Logo */}
                <a href="#home" className="relative z-50">
                    <img
                        src={logo}
                        alt="J.A. van der Wiel"
                        className={`transition-all duration-300 ${isScrolled && !isMobileMenuOpen ? 'h-12' : 'h-16 md:h-20'}`}
                    />
                </a>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex items-center gap-8">
                    {menuItems.map((item) => (
                        <a
                            key={item.path}
                            href={item.path}
                            className={`text-sm font-semibold uppercase tracking-wider transition-colors nav-link ${isScrolled ? 'text-gray-800 hover:text-primary-600' : 'text-primary-900 hover:text-primary-600'
                                }`}
                        >
                            {item.label}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        className={`px-6 py-2 rounded-full font-bold transition-all shadow-md border-2 ${isScrolled
                            ? 'bg-white border-primary-600 text-primary-600 hover:bg-primary-50'
                            : 'bg-primary-600 border-primary-600 text-white hover:bg-primary-700'
                            }`}
                    >
                        Offerte Aanvragen
                    </a>
                </nav>

                {/* Mobile Toggle */}
                <div className="lg:hidden relative z-50">
                    <ResponsiveToggle onClick={toggleMobileMenu} isOpen={isMobileMenuOpen} />
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 z-40 flex flex-col items-center justify-center"
                        style={{ backgroundColor: '#0c4a6e' }} // Hardcoded Dark Blue
                    >
                        <nav className="flex flex-col items-center gap-8">
                            {menuItems.map((item) => (
                                <a
                                    key={item.path}
                                    href={item.path}
                                    className="text-3xl font-bold transition-colors hover:opacity-80"
                                    style={{ color: '#ffffff' }} // Hardcoded White
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                className="mt-8 px-8 py-3 font-bold rounded-full text-xl transition-colors hover:opacity-90"
                                style={{ backgroundColor: '#ffffff', color: '#0c4a6e' }} // Hardcoded White BG, Dark Blue Text
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Offerte Aanvragen
                            </a>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}

