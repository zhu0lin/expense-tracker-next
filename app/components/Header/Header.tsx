// src/components/Header/Header.tsx
import React from 'react';

/**
 * Application header with title and navigation elements
 * @param {Object} props - Component props
 * @param {string} props.title - Main application title to display in header
 * @param {string} props.subtitle - Optional subtitle or tagline for additional context
 */
interface HeaderProps {
    title: string;
    subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
    return (
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg mb-8 flex flex-col md:flex-row justify-between items-center w-full px-5 py-6 rounded-xl md:text-left text-center gap-5 md:gap-0">
            <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">{title}</h1>
                {subtitle && <p className="text-base m-0 opacity-90 text-indigo-100">{subtitle}</p>}
            </div>
            <nav className="flex gap-3 flex-wrap justify-center md:justify-end flex-col sm:flex-row">
                <button className="bg-white bg-opacity-20 border border-white border-opacity-40 text-white px-4 py-2.5 rounded-md text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-opacity-20 hover:-translate-y-0.5">Dashboard</button>
                <button className="bg-white bg-opacity-10 border border-white border-opacity-20 text-white px-4 py-2.5 rounded-md text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-opacity-20 hover:-translate-y-0.5">Analytics</button>
                <button className="bg-white bg-opacity-10 border border-white border-opacity-20 text-white px-4 py-2.5 rounded-md text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-opacity-20 hover:-translate-y-0.5">Settings</button>
            </nav>
        </header>
    );
};

export default Header;
