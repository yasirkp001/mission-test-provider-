import React from 'react';
import { AlertTriangle, RefreshCw, ServerCrash } from 'lucide-react';

export default function ErrorState({
  errorMessage,
  onRetry,
  isSimulated = false,
  onTurnOffSimulation
}) {
  return (
    <div className="error-state-wrapper">
      <div className="error-icon-circle">
        <ServerCrash className="error-icon" size={40} />
      </div>

      <h3 className="error-title">Data Fetching Failed</h3>
      
      <p className="error-description">
        {errorMessage || 'An unexpected error occurred while communicating with the REST API.'}
      </p>

      {isSimulated && (
        <div className="simulated-note">
          <AlertTriangle size={16} />
          <span>
            <strong>Simulated Error Active:</strong> You enabled simulated API failures via the header toggle.
          </span>
        </div>
      )}

      <div className="error-actions">
        <button
          type="button"
          onClick={onRetry}
          className="btn btn-primary"
        >
          <RefreshCw size={16} />
          Retry Connection
        </button>

        {isSimulated && onTurnOffSimulation && (
          <button
            type="button"
            onClick={onTurnOffSimulation}
            className="btn btn-secondary"
          >
            Disable Simulated Error
          </button>
        )}
      </div>
    </div>
  );
}
