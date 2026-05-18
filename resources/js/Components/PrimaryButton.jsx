export default function PrimaryButton({
    className = '',
    disabled,
    color = 'gray',
    children,
    ...props
}) {
    const colorVariants = {
        'white': 'bg-white hover:bg-gray-100 text-black focus:bg-gray-100 focus:ring-gray-100 focus:ring-offset-0 active:bg-gray-100 border border-gray-400',
        'black': 'bg-gray-800 hover:bg-gray-700 text-white focus:bg-gray-700 focus:ring-gray-500 active:bg-gray-900',
        'gray': 'bg-gray-800 hover:bg-gray-700 text-white focus:bg-gray-700 focus:ring-gray-500 active:bg-gray-900',
        'red': 'bg-red-800 hover:bg-red-700 text-white focus:bg-red-700 focus:ring-red-500 active:bg-red-900',
        'green': 'bg-green-800 hover:bg-green-700 text-white focus:bg-green-700 focus:ring-green-500 active:bg-green-900',
        'blue': 'bg-blue-800 hover:bg-blue-700 text-white focus:bg-blue-700 focus:ring-blue-500 active:bg-blue-900',
        'yellow': 'bg-yellow-800 hover:bg-yellow-700 text-white focus:bg-yellow-700 focus:ring-yellow-500 active:bg-yellow-900',
        'purple': 'bg-purple-800 hover:bg-purple-700 text-white focus:bg-purple-700 focus:ring-purple-500 active:bg-purple-900',
        'pink': 'bg-pink-800 hover:bg-pink-700 text-white focus:bg-pink-700 focus:ring-pink-500 active:bg-pink-900',
        'contrast': 'bg-white hover:bg-gray-50 text-gray-900 focus:bg-gray-50 focus:ring-gray-50 focus:ring-offset-0 active:bg-gray-100',
    };

    const baseClasses = 'inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';

    const colorClasses = colorVariants[color] || colorVariants['gray'];

    const disabledClasses = disabled ? 'opacity-25 cursor-not-allowed' : '';

    return (
        <button
            {...props}
            disabled={disabled}
            className={`${baseClasses} ${colorClasses} ${disabledClasses} ${className}`.trim()}
        >
            {children}
        </button>
    );
}
