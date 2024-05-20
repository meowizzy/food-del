import { useEffect } from 'react';
import { useLocation } from "react-router-dom";

export const usePasswordReset = (callBack) => {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("/passwordReset")) {
            callBack();
        }
    }, []);
}