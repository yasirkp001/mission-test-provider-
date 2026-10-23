# BYCE Gym App — Gym Owner Dashboard

A React application strictly built to satisfy the **10 core requirements** for the BYCE Gym Owner Dashboard. Built using **React** with a clean responsive layout, separated API layer, loading/empty/error states, and clear Django REST Framework integration architecture.

---

## ⚡ Requirements & Implementation Overview

| # | Requirement | Implementation |
|---|---|---|
| 1 | **Summary Cards** | 4 summary cards: **Total Members**, **Active Memberships**, **Today's Check-ins**, and **Expiring Memberships** with trend badges. |
| 2 | **Members Table** | Table displaying: **Customer Name**, **Customer ID** (`BYCE-XXXX`), **Membership Status** badge, and **Expiry Date**. |
| 3 | **Search Filter** | Instant search filter matching customer names (with clear button). |
| 4 | **Membership Status Filter** | Dropdown & quick-chip filter: `All Statuses`, `Active`, `Expiring Soon`, `Expired`, `Inactive`. |
| 5 | **REST API / Mock Data Source** | Decoupled client functions in `src/services/api.js` with clearly separated fallback mock data in `src/services/mockData.js`. |
| 6 | **Loading, Empty & Error States** | Shimmer loading skeletons, friendly empty search result state with filter reset, and error banner with retry connection button. |
| 7 | **Reusable React Components** | Modular folder structure: `components/dashboard/`, `components/common/`, `components/layout/`, and `hooks/`. |
| 8 | **Responsive Layout** | Fluid responsive design with CSS container queries transforming the table into stacked cards on mobile screens. |
| 9 | **API Layer Separation** | Clean async functions in `src/services/api.js`; components do not make raw `fetch()` calls. |
| 10 | **Django REST Framework Integration** | Full documented architecture for DRF Models, Serializers, ViewSets, URLs, and CORS. |
| ➕ | **Simple Phone Login** | Clean, fast single-screen login with mobile number and 1-tap demo credentials. |

---

## 📂 Project Structure

```
BYCE GYM APP/
├── index.html                   # HTML entry point with fonts & meta
├── package.json                 # Project configuration (React 19, Lucide Icons)
├── vite.config.js               # Vite config
├── README.md                    # Documentation & Function Explanation
├── src/
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # Main application orchestrator & auth gate
│   ├── index.css                # Royal Cobalt & Ice Cyan theme + responsive rules
│   ├── services/
│   │   ├── api.js               # Separated REST API client (functions only)
│   │   ├── phoneAuthService.js  # Mobile OTP auth & session storage
│   │   └── mockData.js          # Mock gym members data & metric calculator
│   ├── hooks/
│   │   └── useGymData.js        # Custom React hook for state, filters, and loading
│   └── components/
│       ├── auth/
│       │   └── PhoneLoginPage.jsx # Mobile number & OTP verification login portal
│       ├── layout/
│       │   └── Header.jsx       # Dashboard header, session profile & sign out
│       ├── dashboard/
│       │   ├── MetricCard.jsx   # Individual summary card
│       │   ├── MetricsGrid.jsx  # Grid of 4 summary cards
│       │   ├── MemberFilters.jsx# Search input & status dropdown
│       │   └── MembersTable.jsx # Table: Name, ID, Status, Expiry Date
│       └── common/
│           ├── StatusBadge.jsx   # Color status badge (Active, Expiring, etc.)
│           ├── LoadingSkeleton.jsx # Shimmer skeleton placeholders
│           ├── EmptyState.jsx    # Empty search/filter state
│           └── ErrorState.jsx    # Error state with retry button
```

---

## 🧠 Simple & Clear Function Explanations

### 1. API Service Layer (`src/services/api.js`)
* **`getSummaryMetrics()`**
  * *What it does*: Fetches the 4 summary statistics (Total Members, Active Memberships, Today's Check-ins, Expiring Memberships).
  * *DRF mapping*: Maps to `GET /api/dashboard/summary/`.
* **`getMembers({ search, status })`**
  * *What it does*: Fetches gym members filtered by customer name search and status query.
  * *DRF mapping*: Maps to `GET /api/members/?search=<name>&status=<status>`.
* **`recordCheckIn(memberId)`**
  * *What it does*: Marks a member as checked in for today and updates their visit count.
  * *DRF mapping*: Maps to `POST /api/members/<id>/check_in/`.
* **`setSimulateError(boolean)` & `getSimulateError()`**
  * *What it does*: Toggles a simulated API failure to easily test and verify Requirement #6 (Error State).

### 2. Custom React Hook (`src/hooks/useGymData.js`)
* **`loadDashboardData()`**
  * *What it does*: Runs `getSummaryMetrics()` and `getMembers()` together using `Promise.all()`. Manages `loading = true` while fetching and catches any errors.
* **`handleSearchChange(query)`**
  * *What it does*: Updates the search query when the user types in the search input.
* **`handleStatusFilterChange(status)`**
  * *What it does*: Updates the membership status filter when the user changes the dropdown or clicks a status chip.
* **`handleCheckInMember(memberId)`**
  * *What it does*: Calls `recordCheckIn(memberId)`, updates the member's check-in status in the table, and increments "Today's Check-ins" count.
* **`toggleSimulateError()`**
  * *What it does*: Flips the error simulation flag and re-fetches to show the Error State with retry button.
* **`clearFilters()`**
  * *What it does*: Clears search text and resets the status dropdown to `'all'`.

---

## 🐍 Django REST Framework (DRF) Integration Guide

Here is how the React frontend integrates with a Django REST Framework backend:

### 1. Database Model (`models.py`)
```python
from django.db import models
from django.utils import timezone

class Member(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('expiring_soon', 'Expiring Soon'),
        ('expired', 'Expired'),
        ('inactive', 'Inactive'),
    ]

    customer_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=150)
    email = models.EmailField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    expiry_date = models.DateField()
    last_check_in = models.DateTimeField(null=True, blank=True)
    total_check_ins = models.PositiveIntegerField(default=0)
    avatar_url = models.URLField(blank=True)

    def __str__(self):
        return f"{self.customer_id} - {self.name}"
```

### 2. DRF Serializer (`serializers.py`)
```python
from rest_framework import serializers
from django.utils import timezone
from .models import Member

class MemberSerializer(serializers.ModelSerializer):
    # Maps Django snake_case fields to React frontend properties
    id = serializers.CharField(source='customer_id')
    expiryDate = serializers.DateField(source='expiry_date')
    avatar = serializers.URLField(source='avatar_url')
    checkInsToday = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = ['id', 'name', 'email', 'status', 'expiryDate', 'avatar', 'checkInsToday']

    def get_checkInsToday(self, obj):
        if not obj.last_check_in:
            return False
        return obj.last_check_in.date() == timezone.now().date()
```

### 3. DRF ViewSets & Summary View (`views.py`)
```python
from rest_framework import viewsets, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from .models import Member
from .serializers import MemberSerializer

class MemberViewSet(viewsets.ModelViewSet):
    """
    GET /api/members/?search=Marcus&status=active
    """
    queryset = Member.objects.all().order_by('-id')
    serializer_class = MemberSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['status']
    search_fields = ['name', 'customer_id']

    @action(detail=True, methods=['post'])
    def check_in(self, request, pk=None):
        """POST /api/members/<id>/check_in/"""
        member = self.get_object()
        member.last_check_in = timezone.now()
        member.total_check_ins += 1
        member.save()
        return Response(MemberSerializer(member).data)

class DashboardSummaryAPIView(APIView):
    """
    GET /api/dashboard/summary/
    """
    def get(self, request):
        today = timezone.now().date()
        total = Member.objects.count()
        active = Member.objects.filter(status='active').count()
        expiring = Member.objects.filter(status='expiring_soon').count()
        checkins_today = Member.objects.filter(last_check_in__date=today).count()

        return Response({
            "totalMembers": {"value": total, "label": "Total Members", "trend": "+12% this month"},
            "activeMemberships": {"value": active, "label": "Active Memberships", "trend": "High retention"},
            "todaysCheckIns": {"value": checkins_today, "label": "Today's Check-ins", "trend": "Live count"},
            "expiringMemberships": {"value": expiring, "label": "Expiring Memberships", "trend": "Action required"}
        })
```

### 4. URL Routes (`urls.py`)
```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MemberViewSet, DashboardSummaryAPIView

router = DefaultRouter()
router.register(r'members', MemberViewSet, basename='member')

urlpatterns = [
    path('dashboard/summary/', DashboardSummaryAPIView.as_view(), name='dashboard-summary'),
    path('', include(router.urls)),
]
```

### 5. CORS Setup (`settings.py`)
```python
INSTALLED_APPS = [
    ...,
    'corsheaders',
    'rest_framework',
    'django_filters',
    'gym_app',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Top of middleware
    'django.middleware.common.CommonMiddleware',
    ...,
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```
