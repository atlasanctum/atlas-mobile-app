# Atlas Mobile App - Components & Features Guide

## Overview

This document outlines all the critical components and features built for the Atlas planetary intelligence system mobile app.

---

## Core Components

### 1. **Swipeable Signal Card** (`components/swipeable-signal-card.tsx`)

Interactive signal cards with gesture support.

**Features:**
- Swipe right to attach signal to mission
- Swipe left to archive signal
- Long press to compare with historical baseline
- Severity color coding (Stable, Watch, Elevated, Critical)
- Confidence and time indicators

**Usage:**
```tsx
<SwipeableSignalCard
  signal={signal}
  onTap={(signal) => setSelectedSignal(signal)}
  onSwipeRight={(signal) => handleAttachToMission(signal)}
  onSwipeLeft={(signal) => handleArchive(signal)}
  onLongPress={(signal) => handleCompare(signal)}
/>
```

---

### 2. **Bottom Sheets (Modals)**

#### Signal Detail Sheet (`components/signal-detail-sheet.tsx`)
Shows comprehensive signal information including:
- Signal title, location, and severity
- Detailed description
- Confidence level and category
- Related systems
- Historical context and comparisons
- Known unknowns
- Linked missions
- Action buttons (Attach, Archive)

#### Mission Detail Sheet (`components/mission-detail-sheet.tsx`)
Displays mission information:
- Mission name, objective, and region
- Status badge (On Track, At Risk, Critical)
- Health metrics (System Stress, Funding, Public Trust)
- Linked resources (Active Risks, Signals)
- Mission timeline with events
- Action buttons (View Risks, Update Status)

#### Investigation Detail Sheet (`components/investigation-detail-sheet.tsx`)
Shows investigation workflow:
- Title and working hypothesis
- Urgency and status badges
- Linked resources (Signals, Task Owners)
- Evidence list with confidence levels
- Investigation notes
- Action buttons (Add Note, Update Status)

#### Attach to Mission Sheet (`components/attach-to-mission-sheet.tsx`)
Modal for linking signals to missions:
- Signal context display
- Mission selection with status indicators
- Linked signals count
- Confirmation buttons

#### Signal Comparison Sheet (`components/signal-comparison-sheet.tsx`)
Compare current values with historical baselines:
- Current vs historical value display
- Change percentage indicator
- Analysis and risk assessment
- Related signals
- Related signals list

#### Scenario Builder Sheet (`components/scenario-builder-sheet.tsx`)
Interactive scenario modeling:
- Variable controls (sliders, toggles, steppers)
- Real-time value updates
- Simulation preview
- Expected outcomes display
- Run Simulation button

#### Decision Room Sheet (`components/decision-room-sheet.tsx`)
Decision escalation workflow:
- Signal and investigation context
- Recommended actions with confidence/impact
- Timeline and risk information
- Escalation path tracking
- Decision selection and escalation

---

### 3. **Signal Map** (`components/signal-map.tsx`)

Regional visualization of signals:
- Interactive map with grid background
- Signal markers with severity color coding
- Severity legend
- Category filtering
- Marker tooltips on interaction
- Signal count display

**Features:**
- Tap markers to view details
- Filter by category
- Color-coded severity indicators
- Responsive layout

---

### 4. **Utility Components**

#### Loading Spinner (`components/loading-spinner.tsx`)
Animated loading indicator with customizable size and color.

#### Pull to Refresh (`components/pull-to-refresh.tsx`)
Native pull-to-refresh functionality with custom colors.

#### Toast Notifications (`components/toast.tsx`)
Non-blocking notifications with types: success, error, warning, info.

**Usage:**
```tsx
const toast = useToast();
toast.success("Signal attached to mission!");
toast.error("Failed to save investigation");
```

---

## State Management

### Atlas Context (`lib/atlas-context.tsx`)

Global state management using Context + useReducer.

**State Structure:**
```typescript
{
  signals: Signal[];
  missions: Mission[];
  scenarios: Scenario[];
  investigations: Investigation[];
  decisions: Decision[];
  selectedSignal: Signal | null;
  selectedMission: Mission | null;
  globalStatus: "Stable" | "Watch" | "Elevated" | "Critical";
}
```

**Actions:**
- `SET_SIGNALS` - Update signals list
- `SET_MISSIONS` - Update missions list
- `SET_SCENARIOS` - Update scenarios list
- `SET_INVESTIGATIONS` - Update investigations list
- `SET_DECISIONS` - Update decisions list
- `SELECT_SIGNAL` - Set selected signal
- `SELECT_MISSION` - Set selected mission
- `SET_GLOBAL_STATUS` - Update global status
- `ATTACH_SIGNAL_TO_MISSION` - Link signal to mission
- `ARCHIVE_SIGNAL` - Remove signal from list

**Usage:**
```tsx
const { state, dispatch } = useAtlas();
dispatch({ type: "SET_SIGNALS", payload: newSignals });
```

---

## Data Persistence

### Storage Service (`lib/storage-service.ts`)

AsyncStorage-based persistence layer.

**Features:**
- Save/load signals, missions, scenarios, investigations, decisions
- User preferences management
- Investigation notes storage
- Pinned missions tracking
- Last sync timestamp
- Data export for backup
- Clear all data functionality

**Usage:**
```tsx
import { StorageService } from "@/lib/storage-service";

// Save signals
await StorageService.saveSignals(signals);

// Load signals
const signals = await StorageService.getSignals();

// Pin mission
await StorageService.pinMission(missionId);
```

---

### Data Sync Hook (`hooks/use-data-sync.ts`)

Manages data loading and synchronization.

**Features:**
- Load data from storage on mount
- Sync state to storage
- Server sync capability (ready for API integration)
- Clear all data
- Sync status tracking

**Usage:**
```tsx
const { syncStatus, syncToStorage, syncWithServer } = useDataSync();

if (syncStatus.isSyncing) {
  return <LoadingSpinner />;
}
```

---

## Interaction Patterns

### Swipe Gestures
- **Swipe Right**: Attach signal to mission
- **Swipe Left**: Archive signal
- **Long Press**: Compare with historical baseline

### Bottom Sheets
- Tap card/row to open detail sheet
- Drag handle to dismiss
- Close button in header
- Smooth animations

### Buttons
- Primary actions: Full-width, primary color
- Secondary actions: Outlined or surface color
- Disabled state: Reduced opacity
- Press feedback: Scale 0.97 + opacity change

---

## Color Coding System

### Severity Levels
- **Stable**: Green (#22C55E)
- **Watch**: Amber (#F59E0B)
- **Elevated**: Orange (#FF6B35)
- **Critical**: Red (#EF4444)

### Status Indicators
- **On Track**: Green
- **At Risk**: Amber
- **Critical**: Red

### Confidence Levels
- **Low**: Amber
- **Medium**: Primary (Blue)
- **High**: Green

---

## Navigation Structure

```
Home (Briefing)
├── Global Status Banner
├── Priority Cards (swipeable)
├── Decision Queue
└── Linked Missions

Signals
├── Filter Rail
├── Signal Map
├── Signal Feed
└── Signal Detail Sheet

Missions
├── Mission List
├── Mission Detail Sheet
└── Mission Timeline

Simulations
├── Scenario Library
├── Scenario Builder
└── Results View

Workspace
├── Investigations
│   └── Investigation Detail
├── Decisions
│   └── Decision Room
└── Escalation Queue
```

---

## Data Models

### Signal
```typescript
{
  id: string;
  title: string;
  location: string;
  category: "Climate" | "Health" | "Economy" | "Infrastructure" | "Governance" | "Social trust" | "Ecosystems";
  severity: "Stable" | "Watch" | "Elevated" | "Critical";
  confidence: "Low" | "Medium" | "High";
  timeDetected: string;
  description: string;
  linkedMissions: string[];
}
```

### Mission
```typescript
{
  id: string;
  name: string;
  objective: string;
  region: string;
  status: "On Track" | "At Risk" | "Critical";
  systemStress: number;
  fundingStatus: number;
  publicTrust: number;
  activeRisks: number;
  linkedSignals: number;
  linkedSignalIds: string[];
}
```

### Investigation
```typescript
{
  id: string;
  title: string;
  linkedSignals: number;
  hypothesis: string;
  urgency: "Low" | "Medium" | "High" | "Critical";
  taskOwners: number;
  status: "Open" | "In Progress" | "Awaiting Decision" | "Closed";
  linkedSignalIds: string[];
}
```

### Decision
```typescript
{
  id: string;
  proposedAction: string;
  confidence: "Low" | "Medium" | "High";
  status: "Review" | "Escalate" | "Assign";
  evidenceCount: number;
  linkedInvestigationId?: string;
}
```

---

## Best Practices

### Performance
- Use FlatList for long lists (not ScrollView with .map())
- Memoize expensive computations
- Avoid creating new objects in render
- Use useCallback for event handlers

### Accessibility
- Ensure color contrast meets WCAG AA
- Use semantic icons
- Provide text labels for all buttons
- Test with screen readers

### User Experience
- Show loading states during async operations
- Provide toast feedback for actions
- Use consistent spacing (16px base unit)
- Support both light and dark modes

### Testing
- Test all gesture interactions
- Verify data persistence
- Test offline functionality
- Validate data sync

---

## Future Enhancements

1. **Backend Integration**
   - Connect to Atlas API for real data
   - Implement server-side sync
   - Add authentication

2. **Advanced Features**
   - Real-time collaboration
   - Custom alert rules
   - Data export (PDF, CSV)
   - Offline mode with sync queue

3. **Analytics**
   - Track user interactions
   - Monitor app performance
   - Collect usage patterns

4. **Notifications**
   - Push notifications for critical signals
   - In-app notification center
   - Custom notification rules

---

## Troubleshooting

### Swipe Gestures Not Working
- Ensure GestureHandlerRootView wraps the app
- Check gesture priorities
- Verify gesture handler dependencies

### Data Not Persisting
- Check AsyncStorage permissions
- Verify storage service calls
- Check for errors in console

### Performance Issues
- Profile with React DevTools
- Check for unnecessary re-renders
- Optimize list rendering

---

## Support

For issues or questions, refer to:
- Component source files in `components/`
- Hooks in `hooks/`
- State management in `lib/atlas-context.tsx`
- Storage service in `lib/storage-service.ts`
