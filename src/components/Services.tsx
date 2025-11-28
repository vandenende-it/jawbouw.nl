import houtenHamer from '../assets/img/afwerken.webp'
import vlinderboor from '../assets/img/gat-boren.webp'
import klauwhamer from '../assets/img/schuren.webp'
import winkelhaak from '../assets/img/vlinderboren.webp'
import handboor from '../assets/img/diensten/handboor.webp'
import nijptang from '../assets/img/diensten/nijptang.webp'

const services = [
    {
        title: 'Aanbouwen',
        description: 'U wilt uw huis uitbreiden door middel van een aanbouw? Bouwbedrijf J.A. van der Wiel Bouw & Timmerwerken is de aannemer met jarenlange ervaring in aanbouwwerkzaamheden. Wij bouwen op traditionele wijze altijd maatwerk.',
        image: houtenHamer,
        link: '#projecten',
        linkText: 'Bekijk aanbouw projecten'
    },
    {
        title: 'Renovatie',
        description: 'Voor professionele renovatiewerkzaamheden moet u bij J.A. van der Wiel Bouw & Timmerwerken zijn. Of het nu om een keukenrenovatie gaat, een badkamerrenovatie, of dat u uw hele huis wilt opknappen, wij hebben de kennis en expertise om u te helpen bij elke stap van het proces.',
        image: vlinderboor,
        link: '#projecten',
        linkText: 'Bekijk renovaties'
    },
    {
        title: 'Verbouwen',
        description: 'Wat u ook wilt laten doen aan uw huis, wij kunnen het! J.A. van der Wiel Bouw & Timmerwerken is een alleskunner onder de aannemers die garant staat voor kwalitatief hoogstaand werk. U kunt ons inschakelen voor uiteenlopende bouwprojecten en werkzaamheden in en rondom het huis.',
        image: klauwhamer,
        link: '#projecten',
        linkText: 'Bekijk verbouwingen'
    },
    {
        title: 'Onderhoud',
        description: 'Onderhoud van woningen of bedrijfspanden kost tijd. Wij helpen u graag bij het behoud van waarde en rendement. Of het nu gaat om een lekkend dak, een onderhoudsplan of volledig beheer: wij staan voor u klaar.',
        image: winkelhaak,
        link: '#contact',
        linkText: 'Neem contact op'
    },
]

export default function Services() {
    return (
        <section id="diensten" className="pt-12 pb-24 bg-primary-50 dark:bg-gray-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <img src={handboor} alt="" className="absolute top-0 left-0 w-64 h-auto transform -rotate-12" />
                <img src={nijptang} alt="" className="absolute bottom-0 right-0 w-64 h-auto transform rotate-12" />
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Onze Diensten</h2>
                    <div className="h-1 w-24 bg-primary-500 mx-auto rounded-full"></div>
                    <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Wij bieden een breed scala aan diensten voor al uw bouw- en timmerwerken.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col"
                        >
                            <div className="relative w-full aspect-[3/4] overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow min-h-[120px]">
                                    {service.description}
                                </p>
                                <a
                                    href={service.link}
                                    className="inline-flex items-center font-bold text-primary-600 hover:text-primary-700 transition-colors"
                                >
                                    {service.linkText}
                                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
