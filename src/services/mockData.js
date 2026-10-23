export const INITIAL_MEMBERS = [
  {
    id: "BYCE-1001",
    name: "Marcus Vance",
    email: "marcus.v@example.com",
    phone: "+1 (555) 234-8901",
    membershipPlan: "Gold Annual",
    status: "active", // active | expiring_soon | expired | inactive
    joinDate: "2025-01-15",
    expiryDate: "2027-01-15",
    checkInsToday: true,
    lastCheckIn: "Today, 07:15 AM",
    totalCheckIns: 142,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "BYCE-1002",
    name: "Elena Rostova",
    email: "elena.r@example.com",
    phone: "+1 (555) 345-6789",
    membershipPlan: "Platinum VIP",
    status: "active",
    joinDate: "2025-03-10",
    expiryDate: "2026-11-20",
    checkInsToday: true,
    lastCheckIn: "Today, 08:30 AM",
    totalCheckIns: 218,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "BYCE-1003",
    name: "Devon Reed",
    email: "devon.reed@example.com",
    phone: "+1 (555) 456-7890",
    membershipPlan: "Monthly Pro",
    status: "expiring_soon",
    joinDate: "2025-10-01",
    expiryDate: "2026-10-28", // Expiring in 6 days
    checkInsToday: false,
    lastCheckIn: "Yesterday, 06:45 PM",
    totalCheckIns: 67,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "BYCE-1004",
    name: "Sophia Chen",
    email: "sophia.c@example.com",
    phone: "+1 (555) 567-8901",
    membershipPlan: "Student Pass",
    status: "active",
    joinDate: "2026-02-01",
    expiryDate: "2027-02-01",
    checkInsToday: true,
    lastCheckIn: "Today, 09:10 AM",
    totalCheckIns: 84,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "BYCE-1005",
    name: "Tariq Al-Mansoor",
    email: "tariq.m@example.com",
    phone: "+1 (555) 678-9012",
    membershipPlan: "Quarterly Flex",
    status: "expiring_soon",
    joinDate: "2026-07-25",
    expiryDate: "2026-10-31", // Expiring in ~9 days
    checkInsToday: false,
    lastCheckIn: "2 days ago",
    totalCheckIns: 41,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "BYCE-1006",
    name: "Chloe Bennett",
    email: "chloe.b@example.com",
    phone: "+1 (555) 789-0123",
    membershipPlan: "Monthly Pro",
    status: "expired",
    joinDate: "2025-08-14",
    expiryDate: "2026-10-14", // Expired 8 days ago
    checkInsToday: false,
    lastCheckIn: "10 days ago",
    totalCheckIns: 53,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "BYCE-1007",
    name: "Jordan Washington",
    email: "jordan.w@example.com",
    phone: "+1 (555) 890-1234",
    membershipPlan: "Gold Annual",
    status: "active",
    joinDate: "2025-06-01",
    expiryDate: "2027-06-01",
    checkInsToday: true,
    lastCheckIn: "Today, 06:00 AM",
    totalCheckIns: 310,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "BYCE-1008",
    name: "Amara Okonjo",
    email: "amara.o@example.com",
    phone: "+1 (555) 901-2345",
    membershipPlan: "Silver Monthly",
    status: "inactive",
    joinDate: "2024-11-10",
    expiryDate: "2025-11-10",
    checkInsToday: false,
    lastCheckIn: "Over 3 months ago",
    totalCheckIns: 92,
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "BYCE-1009",
    name: "Liam O'Connor",
    email: "liam.oc@example.com",
    phone: "+1 (555) 012-3456",
    membershipPlan: "Gold Annual",
    status: "expiring_soon",
    joinDate: "2025-11-05",
    expiryDate: "2026-11-05", // Expiring in ~14 days
    checkInsToday: true,
    lastCheckIn: "Today, 10:15 AM",
    totalCheckIns: 185,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "BYCE-1010",
    name: "Zoe Kravitz-Miller",
    email: "zoe.km@example.com",
    phone: "+1 (555) 123-4567",
    membershipPlan: "Weekend Warrior",
    status: "active",
    joinDate: "2026-04-12",
    expiryDate: "2027-04-12",
    checkInsToday: false,
    lastCheckIn: "Sunday, 11:30 AM",
    totalCheckIns: 38,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "BYCE-1011",
    name: "Vikram Malhotra",
    email: "vikram.m@example.com",
    phone: "+1 (555) 234-5678",
    membershipPlan: "Platinum VIP",
    status: "active",
    joinDate: "2025-05-20",
    expiryDate: "2027-05-20",
    checkInsToday: true,
    lastCheckIn: "Today, 05:45 AM",
    totalCheckIns: 275,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "BYCE-1012",
    name: "Natasha Roman",
    email: "natasha.r@example.com",
    phone: "+1 (555) 345-6780",
    membershipPlan: "Monthly Pro",
    status: "expired",
    joinDate: "2025-09-01",
    expiryDate: "2026-10-01",
    checkInsToday: false,
    lastCheckIn: "22 days ago",
    totalCheckIns: 77,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  }
];

export function calculateMetrics(members) {
  const totalMembers = members.length;
  const activeMemberships = members.filter(m => m.status === 'active').length;
  const expiringMemberships = members.filter(m => m.status === 'expiring_soon').length;
  const todaysCheckIns = members.filter(m => m.checkInsToday).length;
  const expiredMemberships = members.filter(m => m.status === 'expired').length;

  return {
    totalMembers: {
      value: totalMembers,
      label: "Total Members",
      trend: "+12% this month",
      trendType: "positive",
      description: "Registered athlete profiles"
    },
    activeMemberships: {
      value: activeMemberships,
      label: "Active Memberships",
      trend: `${Math.round((activeMemberships / (totalMembers || 1)) * 100)}% retention rate`,
      trendType: "positive",
      description: "Current paying members"
    },
    todaysCheckIns: {
      value: todaysCheckIns,
      label: "Today's Check-ins",
      trend: "Peak hours: 06:00 - 09:00",
      trendType: "neutral",
      description: "Live gym turnstile entries"
    },
    expiringMemberships: {
      value: expiringMemberships,
      label: "Expiring Memberships",
      trend: "Action required within 14 days",
      trendType: expiringMemberships > 0 ? "warning" : "positive",
      description: "Needs renewal outreach"
    },
    // Extra insight metrics
    expiredCount: expiredMemberships
  };
}
