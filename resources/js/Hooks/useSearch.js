import { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';

/**
 * Custom hook for search + rows filtering via Inertia.
 *
 * @param {string} routeName  - Base route name (e.g. "users.")
 * @param {object} filters    - Current filters from the server { search, rows }
 * @param {number} debounceMs - Debounce delay in ms (default 300)
 */
export default function useSearch(routeName, filters = {}, debounceMs = 300) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [rows, setRows] = useState(filters.rows ?? 5);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeout = setTimeout(() => {
            router.get(
                route(`${routeName}index`),
                { search, rows },
                { preserveState: true, preserveScroll: true },
            );
        }, debounceMs);

        return () => clearTimeout(timeout);
    }, [search, rows]);

    return { search, setSearch, rows, setRows };
}
