export default function CardBox({ children, footer, className = '' }) {
    return (
        <div className={`bg-white overflow-hidden shadow-sm sm:rounded-lg flex flex-col h-full ${className}`}>
            <div className="p-6 text-gray-900 flex-grow">
                {children}
            </div>
            {footer && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 mt-auto">
                    {footer}
                </div>
            )}
        </div>
    );
}
