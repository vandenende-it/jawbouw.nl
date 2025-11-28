import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <section className="my-12">
            <div className="container">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <div className="space-content">
                    <p className="text-2xl mb-4">Aan deze pagina wordt nog getimmerd</p>
                    <Link className="button" to="/">Naar homepage 🏡</Link>
                </div>
            </div>
        </section>
    )
}
