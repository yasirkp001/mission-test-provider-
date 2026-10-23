import React, { useState } from 'react';
import Header from './components/layout/Header';
import PhoneLoginPage from './components/auth/PhoneLoginPage';
import MetricsGrid from './components/dashboard/MetricsGrid';
import MemberFilters from './components/dashboard/MemberFilters';
import MembersTable from './components/dashboard/MembersTable';
import { SummaryCardsSkeleton, TableSkeleton } from './components/common/LoadingSkeleton';
import EmptyState from './components/common/EmptyState';
import ErrorState from './components/common/ErrorState';
import { useGymData } from './hooks/useGymData';
import { getCurrentUser, logoutUser } from './services/phoneAuthService';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());

  const {
    metrics,
    members,
    loading,
    error,
    searchQuery,
    statusFilter,
    isSimulatingError,
    handleSearchChange,
    handleStatusFilterChange,
    handleCheckInMember,
    toggleSimulateError,
    clearFilters,
    reload
  } = useGymData();

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <PhoneLoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app-container">
      <Header
        currentUser={currentUser}
        onLogout={handleLogout}
        isSimulatingError={isSimulatingError}
        onToggleSimulateError={toggleSimulateError}
        onRefresh={reload}
        isLoading={loading}
      />

      <main className="main-content">
        <header className="page-intro-header">
          <div>
            <h1 className="page-title">Gym Owner Dashboard</h1>
            <p className="page-subtitle">
              Overview of athlete memberships, live turnstile check-ins, and expiring accounts.
            </p>
          </div>
        </header>

        {loading && !metrics ? (
          <SummaryCardsSkeleton />
        ) : error && !metrics ? null : (
          <MetricsGrid metrics={metrics} />
        )}

        <section className="table-section-card" aria-label="Gym Members Directory">
          <div className="table-section-header">
            <div className="section-heading-block">
              <h2>Members Directory</h2>
              <p>Filter by status, search by customer name or ID, and monitor membership expiry dates.</p>
            </div>
          </div>

          <MemberFilters
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
            totalFiltered={members.length}
            totalUnfiltered={metrics?.totalMembers?.value || 12}
            onClearFilters={clearFilters}
          />

          {error ? (
            <ErrorState
              errorMessage={error}
              onRetry={reload}
              isSimulated={isSimulatingError}
              onTurnOffSimulation={toggleSimulateError}
            />
          ) : loading ? (
            <TableSkeleton rows={6} />
          ) : members.length === 0 ? (
            <EmptyState
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              onReset={clearFilters}
            />
          ) : (
            <MembersTable
              members={members}
              onCheckIn={handleCheckInMember}
            />
          )}
        </section>
      </main>
    </div>
  );
}
