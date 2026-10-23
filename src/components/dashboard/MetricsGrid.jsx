import React from 'react';
import MetricCard from './MetricCard';

export default function MetricsGrid({ metrics }) {
  if (!metrics) return null;

  const cards = [
    {
      id: 'totalMembers',
      title: metrics.totalMembers?.label || 'Total Members',
      value: metrics.totalMembers?.value,
      trend: metrics.totalMembers?.trend,
      trendType: metrics.totalMembers?.trendType,
      description: metrics.totalMembers?.description
    },
    {
      id: 'activeMemberships',
      title: metrics.activeMemberships?.label || 'Active Memberships',
      value: metrics.activeMemberships?.value,
      trend: metrics.activeMemberships?.trend,
      trendType: metrics.activeMemberships?.trendType,
      description: metrics.activeMemberships?.description
    },
    {
      id: 'todaysCheckIns',
      title: metrics.todaysCheckIns?.label || "Today's Check-ins",
      value: metrics.todaysCheckIns?.value,
      trend: metrics.todaysCheckIns?.trend,
      trendType: metrics.todaysCheckIns?.trendType,
      description: metrics.todaysCheckIns?.description
    },
    {
      id: 'expiringMemberships',
      title: metrics.expiringMemberships?.label || 'Expiring Memberships',
      value: metrics.expiringMemberships?.value,
      trend: metrics.expiringMemberships?.trend,
      trendType: metrics.expiringMemberships?.trendType,
      description: metrics.expiringMemberships?.description
    }
  ];

  return (
    <section className="metrics-grid">
      {cards.map((card) => (
        <MetricCard
          key={card.id}
          id={card.id}
          title={card.title}
          value={card.value}
          trend={card.trend}
          trendType={card.trendType}
          description={card.description}
        />
      ))}
    </section>
  );
}
