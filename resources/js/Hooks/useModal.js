import { useState } from "react";

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(null);
    const [error, setErrorState] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const open = (payload = null) => {
        setIsOpen(true);
        setData(payload);
        setErrorState(null);
    };

    const close = () => {
        setIsOpen(false);
        setData(null);
        setErrorState(null);
        setIsLoading(false);
    };

    const toggle = () => {
        setIsOpen((prev) => !prev);
    };

    const setError = (errorMessage) => {
        setErrorState(errorMessage);
    };

    const clearError = () => {
        setErrorState(null);
    };

    return {
        // attributes
        isOpen,
        data,
        isLoading,
        error,
        // methods
        open,
        close,
        toggle,
        setLoading: setIsLoading,
        setError,
        clearError,
    };
};
