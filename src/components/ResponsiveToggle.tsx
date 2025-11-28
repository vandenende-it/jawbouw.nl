
interface ResponsiveToggleProps {
    onClick: () => void
    isOpen: boolean
}

export default function ResponsiveToggle({ onClick, isOpen }: ResponsiveToggleProps) {
    return (
        <button
            className="p-2 focus:outline-none"
            onClick={onClick}
            aria-label={isOpen ? "Sluit menu" : "Open menu"}
        >
            {isOpen ? (
                // Close Icon (X)
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            ) : (
                // Hamburger Icon
                <svg className="w-8 h-8 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            )}
        </button>
    )
}
