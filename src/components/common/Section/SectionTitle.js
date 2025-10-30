import React from 'react';
import './SectionTitle.css';

const SectionTitle = ({ children, subtitle }) => {
  return (
    <div className="section-title-container">
      <h2 className="section-title">{children}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;