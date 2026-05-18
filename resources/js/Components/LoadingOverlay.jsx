import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function LoadingOverlay() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const start = router.on('start', () => setLoading(true));
        const finish = router.on('finish', () => setLoading(false));

        return () => {
            start();
            finish();
        };
    }, []);

    if (!loading) return null;

    return (
        <div className="loading-overlay">
            <div className="spinner" />
        </div>
    );
}
