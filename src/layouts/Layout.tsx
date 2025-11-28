import { ReactNode } from 'react'
import SEO from '../components/SEO'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

interface LayoutProps {
    children: ReactNode
    title?: string
    description?: string
}

export default function Layout({ children, title, description }: LayoutProps) {
    return (
        <div className="flex flex-col min-h-screen text-[var(--font-color)] bg-[var(--background)]">
            <SEO title={title} description={description} />
            <Navigation />
            <main id="main-content" className="flex-auto">
                {children}
            </main>
            <Footer />
        </div>
    )
}
