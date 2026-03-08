import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = `px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 transform shadow-sm text-sm ${props.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'hover:-translate-y-0.5'}`;
    const variants = {
        primary: "bg-unap-blue text-white hover:bg-blue-900 shadow-unap-blue/30",
        secondary: "bg-white text-unap-blue border border-unap-blue hover:bg-blue-50",
        gold: "bg-unap-gold text-white hover:bg-yellow-600 shadow-yellow-500/30",
        danger: "bg-red-600 text-white hover:bg-red-700 shadow-red-500/30",
        ingresar: "bg-blue-600 text-white hover:bg-green-500 shadow-blue-500/30",
        outline: "bg-transparent border border-white text-white hover:bg-white/10"
    };

    if (props.href) {
        return (
            <a className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
                {children}
            </a>
        );
    }

    return (
        <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
