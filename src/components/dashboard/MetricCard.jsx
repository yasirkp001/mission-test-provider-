import React from 'react';
import { Users, UserCheck, Activity, AlertCircle, TrendingUp } from 'lucide-react';

export default function MetricCard({
  id,
  title,
  value,
  trend,
  trendType = 'positive',
  description
}) {
  const getIcon = () => {
    switch (id) {
      case 'totalMembers':
        return <Users className="metric-icon icon-blue" size={24} />;
      case 'activeMemberships':
        return <UserCheck className="metric-icon icon-emerald" size={24} />;
      case 'todaysCheckIns':
        return <Activity className="metric-icon icon-amber" size={24} />;
      case 'expiringMemberships':
        return <AlertCircle className="metric-icon icon-rose" size={24} />;
      default:
        return <TrendingUp className="metric-icon" size={24} />;
    }
  };

  const getTrendBadgeClass = () => {
    if (trendType === 'warning') return 'trend-warning';
    if (trendType === 'neutral') return 'trend-neutral';
    return 'trend-positive';
  };

  return (
    <div className={`metric-card metric-card-${id}`}>
      <div className="metric-card-header">
        <span className="metric-title">{title}</span>
        <div className="metric-icon-wrapper">{getIcon()}</div>
      </div>

      <div className="metric-card-body">
        <div className="metric-value-row">
          <span className="metric-value">{value ?? 0}</span>
          {trend && (
            <span className={`metric-trend-badge ${getTrendBadgeClass()}`}>
              {trend}
            </span>
          )}
        </div>
        {description && <p className="metric-description">{description}</p>}
      </div>

      <div className={`metric-accent-bar accent-${id}`} />
    </div>
  );
}
