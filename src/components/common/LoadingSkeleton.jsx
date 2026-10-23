import React from 'react';

export function SummaryCardsSkeleton() {
  return (
    <div className="metrics-grid">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="metric-card skeleton-card">
          <div className="skeleton-header">
            <div className="skeleton-box skeleton-title" />
            <div className="skeleton-box skeleton-icon" />
          </div>
          <div className="skeleton-box skeleton-value" />
          <div className="skeleton-box skeleton-subtitle" />
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="table-skeleton-container">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="skeleton-row">
          <div className="skeleton-cell skeleton-avatar" />
          <div className="skeleton-cell skeleton-name-box">
            <div className="skeleton-box skeleton-text-lg" />
            <div className="skeleton-box skeleton-text-sm" />
          </div>
          <div className="skeleton-cell">
            <div className="skeleton-box skeleton-badge" />
          </div>
          <div className="skeleton-cell">
            <div className="skeleton-box skeleton-date" />
          </div>
          <div className="skeleton-cell">
            <div className="skeleton-box skeleton-btn" />
          </div>
        </div>
      ))}
    </div>
  );
}
