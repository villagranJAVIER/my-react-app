import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export default function Banner() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success');

    useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            setType('success');
            setVisible(true);
        } else if (flash?.error) {
            setMessage(flash.error);
            setType('error');
            setVisible(true);
        }
    }, [flash?.success, flash?.error]);

    useEffect(() => {
        if (!visible) return;

        const timeout = setTimeout(() => setVisible(false), 4000);
        return () => clearTimeout(timeout);
    }, [visible]);

    if (!visible) return null;

    const isSuccess = type === 'success';

    return (
        <div
            className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg
                         text-sm font-medium transition-all duration-300 animate-slide-in
                         ${isSuccess
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
        >
            {isSuccess
                ? <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                : <XCircle className="w-5 h-5 text-red-500 shrink-0" />
            }

            <span>{message}</span>

            <button
                onClick={() => setVisible(false)}
                className="ml-2 p-0.5 rounded hover:bg-black/5 transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
