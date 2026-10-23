import React from 'react';
import { Search, X, Filter, RotateCcw } from 'lucide-react';

export default function MemberFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  totalFiltered,
  totalUnfiltered,
  onClearFilters
}) {
  const isFiltered = Boolean(searchQuery || (statusFilter && statusFilter !== 'all'));

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'expiring_soon', label: 'Expiring Soon' },
    { value: 'expired', label: 'Expired' },
    { value: 'inactive', label: 'Inactive' }
  ];

  return (
    <div className="filters-container">
      <div className="filters-primary-row">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={18} />
          <input
            id="member-search-input"
            type="text"
            className="search-input"
            placeholder="Search by customer name or ID..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search members by customer name or ID"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onSearchChange('')}
              aria-label="Clear search query"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="status-select-wrapper">
          <Filter className="filter-select-icon" size={16} />
          <select
            id="member-status-filter"
            className="status-select"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            aria-label="Filter members by membership status"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {isFiltered && (
          <button
            type="button"
            className="btn btn-ghost reset-filter-btn"
            onClick={onClearFilters}
            title="Reset filters"
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="status-chips-bar" role="tablist" aria-label="Quick status filter">
        {statusOptions.map((opt) => {
          const isActive = statusFilter === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`status-chip ${isActive ? 'active' : ''}`}
              onClick={() => onStatusFilterChange(opt.value)}
            >
              {opt.label}
            </button>
          );
        })}
        <span className="results-counter">
          Showing <strong>{totalFiltered}</strong> of {totalUnfiltered} members
        </span>
      </div>
    </div>
  );
}
