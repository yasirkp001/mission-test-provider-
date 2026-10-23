import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

export default function EmptyState({ searchQuery, statusFilter, onReset }) {
  const hasFilters = Boolean(searchQuery || (statusFilter && statusFilter !== 'all'));

  return (
    <div className="empty-state-wrapper">
      <div className="empty-icon-circle">
        <SearchX className="empty-icon" size={36} />
      </div>

      <h3 className="empty-title">No Gym Members Found</h3>
      
      <p className="empty-description">
        {hasFilters ? (
          <>
            No records matched your search query{' '}
            {searchQuery && <strong className="highlight-text">"{searchQuery}"</strong>}
            {statusFilter !== 'all' && (
              <>
                {' '}with status <span className="highlight-pill">{statusFilter.replace('_', ' ')}</span>
              </>
            )}
            . Try broadening your keywords or resetting filters.
          </>
        ) : (
          'There are currently no members enrolled in this system.'
        )}
      </p>

      {hasFilters && (
        <button
          type="button"
          onClick={onReset}
          className="btn btn-secondary empty-reset-btn"
        >
          <RotateCcw size={16} />
          Reset Search & Filters
        </button>
      )}
    </div>
  );
}
