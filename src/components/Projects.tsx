
import { useState } from 'react'

const projects = [
    {
        title: "Project Dompad",
        description: "Bij dit project hebben we een complete uitbouw gerealiseerd, voorzien van alle moderne gemakken en een hoogwaardige afwerking.",
        details: [
            'Uitbouw met dakraam voor extra lichtinval',
            'Volledige vloerverwarming',
            'Duurzaam mosdak',
            'Open trap constructie',
            'Nieuw toilet',
            'Nieuwe garagedeuren'
        ],
        images: [
            "/projects/dompad/dompad-uitbouw.jpg",
            "/projects/dompad/dompad-uitbouw-keuken.jpg"
        ]
    },

]

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const openLightbox = (project: typeof projects[0]) => {
        setSelectedProject(project)
        setCurrentImageIndex(0)
        document.body.style.overflow = 'hidden' // Prevent scrolling
    }

    const closeLightbox = () => {
        setSelectedProject(null)
        document.body.style.overflow = 'unset' // Restore scrolling
    }

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!selectedProject) return
        setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length)
    }

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!selectedProject) return
        setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length)
    }

    return (
        <section id="projecten" className="py-24 bg-white dark:bg-gray-800">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Onze Projecten</h2>
                    <div className="h-1 w-24 bg-primary-500 mx-auto rounded-full"></div>
                    <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Een greep uit onze recent opgeleverde projecten.
                    </p>
                </div>

                <div className="space-y-32">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            {/* Image Side */}
                            <div className="w-full lg:w-1/2">
                                <div
                                    className="relative group cursor-pointer"
                                    onClick={() => openLightbox(project)}
                                >
                                    <div className={`absolute -inset-4 bg-primary-100 rounded-2xl transform transition-transform duration-500 group-hover:scale-105 ${index % 2 === 0 ? '-rotate-2' : 'rotate-2'}`}></div>
                                    <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                                        <img
                                            src={project.images[0]}
                                            alt={project.title}
                                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Overlay with "Click for more" */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span className="font-bold text-lg">Klik voor meer foto's</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Small Gallery Preview (if more images) */}
                                    {project.images.length > 1 && (
                                        <div className="absolute -bottom-6 -right-6 w-32 h-24 rounded-lg overflow-hidden shadow-xl border-4 border-white hidden lg:block transform rotate-3">
                                            <img src={project.images[1]} alt="" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full lg:w-1/2">
                                <span className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-2 block">
                                    Project {index + 1}
                                </span>
                                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                    {project.title}
                                </h3>
                                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                                    {project.description}
                                </p>

                                <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl border border-gray-100 dark:border-gray-600">
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        Project Details
                                    </h4>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {project.details.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                                                <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={closeLightbox}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-primary-500 transition-colors"
                        onClick={closeLightbox}
                    >
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="relative w-full max-w-6xl max-h-[90vh] flex items-center justify-center">
                        {/* Prev Button */}
                        <button
                            className="absolute left-4 p-2 bg-black/50 hover:bg-primary-600 text-white rounded-full transition-colors z-10"
                            onClick={prevImage}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <img
                            src={selectedProject.images[currentImageIndex]}
                            alt={`${selectedProject.title} - ${currentImageIndex + 1}`}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Next Button */}
                        <button
                            className="absolute right-4 p-2 bg-black/50 hover:bg-primary-600 text-white rounded-full transition-colors z-10"
                            onClick={nextImage}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Image Counter */}
                        <div className="absolute bottom-[-3rem] left-1/2 transform -translate-x-1/2 text-white font-bold text-lg">
                            {currentImageIndex + 1} / {selectedProject.images.length}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
