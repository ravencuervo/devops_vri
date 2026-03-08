import React from 'react';

const SectionTitle = ({ title, subtitle, centered = false }) => (
    <div className={`mb-8 sm:mb-10 ${centered ? 'text-center' : ''} reveal`}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-unap-navy mb-2 font-serif relative inline-block">
            {title}
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-unap-yellow rounded-full"></span>
        </h2>
        {subtitle && <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-2 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
    </div>

);

export default SectionTitle;
