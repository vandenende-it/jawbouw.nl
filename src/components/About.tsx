

import rasp from '../assets/img/diensten/rasp.webp'
import houtenHamer from '../assets/img/diensten/houten-hamer.webp'

export default function About() {
    return (
        <section id="over-ons" className="py-24 bg-primary-50 dark:bg-gray-800 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <img src={rasp} alt="" className="absolute top-20 right-0 w-80 h-auto transform rotate-45" />
                <img src={houtenHamer} alt="" className="absolute bottom-10 left-10 w-64 h-auto transform -rotate-12" />
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <div className="relative h-[500px] w-full flex items-center justify-center">
                            {/* Decorative Circles */}
                            <div className="absolute top-10 left-10 w-32 h-32 bg-primary-100 rounded-full blur-2xl opacity-60"></div>
                            <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary-200 rounded-full blur-2xl opacity-60"></div>

                            {/* Stats Graphic */}
                            <div className="relative z-10 grid grid-cols-1 gap-8">
                                <div className="bg-white dark:bg-gray-700 p-8 rounded-3xl shadow-xl transform -rotate-3 border-l-8 border-primary-600 max-w-xs mx-auto">
                                    <span className="block text-6xl font-black text-primary-600 mb-2">15+</span>
                                    <span className="text-xl font-bold text-gray-800 dark:text-white uppercase tracking-wide">Jaar Ervaring</span>
                                </div>
                                <div className="bg-primary-600 p-8 rounded-3xl shadow-xl transform rotate-3 max-w-xs mx-auto translate-x-8">
                                    <span className="block text-6xl font-black text-white mb-2">100%</span>
                                    <span className="text-xl font-bold text-primary-100 uppercase tracking-wide">Tevredenheid</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            Vakmanschap & <span className="text-primary-600">Betrouwbaarheid</span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            Met jarenlange ervaring in de bouwsector is J.A. van der Wiel uw betrouwbare partner voor elk project.
                            Wij geloven in duidelijke communicatie, eerlijke afspraken en een resultaat waar we beiden trots op kunnen zijn.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            Of het nu gaat om een kleine renovatie of een compleet nieuwbouwproject, wij benaderen elke klus met dezelfde passie en precisie.
                            Uw wensen staan centraal, en wij denken graag met u mee om tot de beste oplossing te komen.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
