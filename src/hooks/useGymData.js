import { useState, useEffect, useCallback } from 'react';
import {
  getSummaryMetrics,
  getMembers,
  recordCheckIn,
  setSimulateError,
  getSimulateError
} from '../services/api';

export function useGymData() {
  const [metrics, setMetrics] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isSimulatingError, setIsSimulatingError] = useState(getSimulateError());

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [fetchedMetrics, fetchedMembers] = await Promise.all([
        getSummaryMetrics(),
        getMembers({ search: searchQuery, status: statusFilter })
      ]);

      setMetrics(fetchedMetrics);
      setMembers(fetchedMembers);
    } catch (err) {
      console.error('API Fetch Error:', err);
      setError(err.message || 'Failed to fetch gym data from server.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, statusFilter]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handleCheckInMember = async (memberId) => {
    try {
      const updated = await recordCheckIn(memberId);
      
      setMembers((prev) =>
        prev.map((m) => (m.id === memberId ? updated : m))
      );

      const updatedMetrics = await getSummaryMetrics();
      setMetrics(updatedMetrics);
    } catch (err) {
      alert(`Check-in failed: ${err.message}`);
    }
  };

  const toggleSimulateError = () => {
    const nextVal = !isSimulatingError;
    setIsSimulatingError(nextVal);
    setSimulateError(nextVal);
    loadDashboardData();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
  };

  return {
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
    reload: loadDashboardData
  };
}
