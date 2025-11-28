import { Helmet } from 'react-helmet-async'

interface SEOProps {
    title?: string
    description?: string
    image?: string
    author?: string
    subtitle?: string
}

export default function SEO({
    title = 'J.A. van der Wiel',
    subtitle = 'J.A. van der Wiel Bouw & Timmerwerken',
    description = 'Bouw & Timmerwerken',
    image = '/social-preview.png',
    author = 'Maarten van den Ende',
}: SEOProps) {
    const fullTitle = `${title} - ${subtitle}`
    // In a real SPA, window.location might be used, but for initial render we can default or use a prop if needed.
    // For now, we'll assume client-side execution.

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="author" content={author} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            {/* <meta property="og:url" content={window.location.href} />  -- handled by react-helmet-async automatically or better left dynamic */}
            <meta property="og:image" content={image} />
        </Helmet>
    )
}
