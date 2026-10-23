import React from 'react';
import { Dumbbell, RefreshCw, Bug, LogOut } from 'lucide-react';

export default function Header({
  currentUser,
  onLogout,
  isSimulatingError,
  onToggleSimulateError,
  onRefresh,
  isLoading
}) {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="brand-logo">
          <div className="brand-icon-wrapper">
            <Dumbbell className="brand-icon" size={22} />
          </div>
          <div className="brand-text-block">
            <h1 className="brand-name">BYCE <span className="brand-accent">GYM</span></h1>
            <span className="brand-tagline">Owner Dashboard</span>
          </div>
        </div>
      </div>

      <div className="header-right">
        <button
          type="button"
          className={`btn btn-toggle-error ${isSimulatingError ? 'active' : ''}`}
          onClick={onToggleSimulateError}
          title={isSimulatingError ? 'Disable error simulation' : 'Simulate API error'}
        >
          <Bug size={15} />
          <span className="btn-toggle-error-text">{isSimulatingError ? 'Simulating Error' : 'Test Error'}</span>
        </button>

        <button
          type="button"
          className={`btn btn-icon-only btn-refresh ${isLoading ? 'spinning' : ''}`}
          onClick={onRefresh}
          disabled={isLoading}
          title="Refresh data"
          aria-label="Refresh data"
        >
          <RefreshCw size={16} />
        </button>

        {currentUser && (
          <div className="user-profile-capsule">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="user-avatar"
            />
            <div className="user-meta">
              <span className="user-name">{currentUser.name}</span>
              <span className="user-role">{currentUser.phone}</span>
            </div>
            {onLogout && (
              <button
                type="button"
                className="btn-logout-icon"
                onClick={onLogout}
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut size={15} />
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
