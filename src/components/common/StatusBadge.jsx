import React from 'react';

export default function StatusBadge({ status, showDot = true }) {
  const config = {
    active: {
      label: 'Active',
      className: 'badge-active',
      dotClass: 'dot-active'
    },
    expiring_soon: {
      label: 'Expiring Soon',
      className: 'badge-warning',
      dotClass: 'dot-warning'
    },
    expired: {
      label: 'Expired',
      className: 'badge-danger',
      dotClass: 'dot-danger'
    },
    inactive: {
      label: 'Inactive',
      className: 'badge-neutral',
      dotClass: 'dot-neutral'
    }
  };

  const current = config[status] || {
    label: status,
    className: 'badge-neutral',
    dotClass: 'dot-neutral'
  };

  return (
    <span className={`status-badge ${current.className}`}>
      {showDot && <span className={`status-dot ${current.dotClass}`} aria-hidden="true" />}
      {current.label}
    </span>
  );
}
