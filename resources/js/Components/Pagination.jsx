import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (links.length <= 3) return null;

    return (
        <div className="flex flex-wrap items-center justify-center gap-1 mt-6 mb-2">
            {links.map((link, index) => {
                const isActive = link.active;
                const isNull = link.url === null;

                if (isNull) {
                    return (
                        <div
                            key={index}
                            className="px-4 py-2 text-sm text-gray-400 border border-gray-200 rounded-md cursor-not-allowed bg-gray-50"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                }

                return (
                    <Link
                        key={index}
                        href={link.url}
                        className={`px-4 py-2 text-sm rounded-md border transition-colors ${isActive
                                ? 'bg-gray-800 text-white border-gray-800 font-bold'
                                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            })}
        </div>
    );
}
