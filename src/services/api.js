import { INITIAL_MEMBERS, calculateMetrics } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

let localMembersState = [...INITIAL_MEMBERS];
let simulateErrorFlag = false;
let simulatedLatencyMs = 350;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getSummaryMetrics() {
  await delay(simulatedLatencyMs);

  if (simulateErrorFlag) {
    throw new Error('Failed to fetch summary metrics from server (HTTP 500: Internal Server Error)');
  }

  if (import.meta.env.VITE_USE_LIVE_API === 'true') {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/summary/`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.warn('Real API unavailable, falling back to mock metrics:', err.message);
    }
  }

  return calculateMetrics(localMembersState);
}

export async function getMembers({ search = '', status = 'all' } = {}) {
  await delay(simulatedLatencyMs);

  if (simulateErrorFlag) {
    throw new Error('Unable to connect to members database (HTTP 503: Service Unavailable)');
  }

  if (import.meta.env.VITE_USE_LIVE_API === 'true') {
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (status && status !== 'all') queryParams.append('status', status);

      const response = await fetch(`${API_BASE_URL}/members/?${queryParams.toString()}`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.warn('Real API unavailable, falling back to mock members:', err.message);
    }
  }

  return localMembersState.filter((member) => {
    const matchesSearch =
      search.trim() === '' ||
      member.name.toLowerCase().includes(search.toLowerCase().trim()) ||
      member.id.toLowerCase().includes(search.toLowerCase().trim());

    const matchesStatus =
      status === 'all' || member.status === status;

    return matchesSearch && matchesStatus;
  });
}

export async function recordCheckIn(memberId) {
  await delay(200);

  if (simulateErrorFlag) {
    throw new Error('Failed to register check-in on the turnstile server.');
  }

  const memberIndex = localMembersState.findIndex((m) => m.id === memberId);
  if (memberIndex === -1) {
    throw new Error(`Member with ID ${memberId} not found.`);
  }

  const updatedMember = {
    ...localMembersState[memberIndex],
    checkInsToday: true,
    lastCheckIn: 'Today, Just now',
    totalCheckIns: localMembersState[memberIndex].totalCheckIns + 1
  };

  localMembersState[memberIndex] = updatedMember;
  return updatedMember;
}

export async function renewMembership(memberId, additionalMonths = 12) {
  await delay(250);

  const memberIndex = localMembersState.findIndex((m) => m.id === memberId);
  if (memberIndex === -1) {
    throw new Error(`Member with ID ${memberId} not found.`);
  }

  const currentMember = localMembersState[memberIndex];
  
  const newExpiry = new Date();
  newExpiry.setMonth(newExpiry.getMonth() + additionalMonths);
  const formattedExpiry = newExpiry.toISOString().split('T')[0];

  const renewedMember = {
    ...currentMember,
    status: 'active',
    expiryDate: formattedExpiry
  };

  localMembersState[memberIndex] = renewedMember;
  return renewedMember;
}

export function setSimulateError(shouldError) {
  simulateErrorFlag = Boolean(shouldError);
}

export function getSimulateError() {
  return simulateErrorFlag;
}

export function resetMockData() {
  localMembersState = JSON.parse(JSON.stringify(INITIAL_MEMBERS));
}
