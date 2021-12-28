import React, { useState, useEffect } from 'react'

const useTheme = () => {
    const [theme, setTheme] = useState('light');
    const nextTheme = theme === 'light' ? 'dark' : 'light'

    useEffect(() => {
        const rootElement = window.document.documentElement;
        rootElement.classList.remove(nextTheme);
        rootElement.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme, nextTheme])

    return [nextTheme, setTheme]
}

export default useTheme
