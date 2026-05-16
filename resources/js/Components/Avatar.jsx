export default function Avatar({ src, alt = "avatar", size = "sm" }) {
    const sizeClasses = {
        'sm': 'w-8 h-8',
        'md': 'w-12 h-12',
        'lg': 'w-16 h-16',
        'xl': 'w-20 h-20',
    };
    const currentSize = sizeClasses[size] || sizeClasses['sm'];

    return (
        <div className={`${currentSize} rounded-full bg-gray-500 flex items-center justify-center overflow-hidden`}>
            <img src={src} alt={alt} className="w-full h-full object-cover rounded-full" />
        </div>
    );
}