import React from 'react';
import StatusBadge from '../common/StatusBadge';
import { Calendar, UserCheck } from 'lucide-react';

export default function MembersTable({ members, onCheckIn }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const getExpiryDaysHint = (dateStr) => {
    if (!dateStr) return null;
    const diffDays = Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return <span className="expiry-hint expired">Expired {Math.abs(diffDays)}d ago</span>;
    }
    if (diffDays <= 14) {
      return <span className="expiry-hint warning">Expires in {diffDays}d</span>;
    }
    return <span className="expiry-hint normal">{diffDays} days left</span>;
  };

  return (
    <div
      className="table-wrapper"
      role="region"
      tabIndex={0}
      aria-label="Gym Members Table"
    >
      <table className="members-table">
        <caption className="sr-only">BYCE Gym Member Directory</caption>
        <thead>
          <tr>
            <th scope="col" className="col-member">Customer Name</th>
            <th scope="col" className="col-id">Customer ID</th>
            <th scope="col" className="col-status">Membership Status</th>
            <th scope="col" className="col-expiry">Expiry Date</th>
            <th scope="col" className="col-action">Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id} className={`member-row row-status-${member.status}`}>
              <th scope="row" className="cell-member">
                <div className="member-profile-cell">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="member-avatar"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="member-name-block">
                    <span className="member-name-text">{member.name}</span>
                    <span className="member-email">{member.email}</span>
                  </div>
                </div>
              </th>

              <td className="cell-id">
                <span className="customer-id-pill">{member.id}</span>
              </td>

              <td className="cell-status">
                <StatusBadge status={member.status} />
              </td>

              <td className="cell-expiry">
                <div className="expiry-cell-content">
                  <div className="expiry-date-line">
                    <Calendar size={14} className="calendar-icon" />
                    <span>{formatDate(member.expiryDate)}</span>
                  </div>
                  {getExpiryDaysHint(member.expiryDate)}
                </div>
              </td>

              <td className="cell-actions">
                {member.checkInsToday ? (
                  <span className="checkin-badge checked-in">
                    <UserCheck size={13} />
                    <span>Checked In Today</span>
                  </span>
                ) : member.status === 'expired' ? (
                  <span className="checkin-badge not-checked">Expired</span>
                ) : (
                  <button
                    type="button"
                    className="btn btn-sm btn-action-checkin"
                    onClick={() => onCheckIn(member.id)}
                    title={`Check in ${member.name} for today`}
                  >
                    <UserCheck size={14} />
                    <span>Check In</span>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
