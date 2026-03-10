# Atlas Mobile App - Project TODO

## Core Navigation & Screens
- [x] Implement 5-tab bottom navigation (Home, Signals, Missions, Simulations, Workspace)
- [x] Create Home screen with planetary briefing layout
- [x] Create Signals tab with feed and map
- [x] Create Missions tab with list view
- [x] Create Simulations tab with scenario library
- [x] Create Workspace tab with investigations

## Home Screen Features
- [x] Planetary Status Banner (Stable/Watch/Elevated/Critical)
- [x] Priority Briefing Cards (card stack with swipe gestures)
- [x] Mission-Linked Alerts component
- [x] Uncertainty Snapshot display
- [x] Today's Decision Queue (Review, Escalate, Simulate, Assign buttons)
- [ ] Swipe right to attach signal to mission
- [ ] Swipe left to archive/dismiss signal
- [ ] Pull-to-refresh functionality
- [ ] Tap card to open Signal Detail sheet

## Signals Tab Features
- [x] Signal Feed (infinite list)
- [x] Signal Map with layered overlays
- [x] Filter Rail (All, Climate, Health, Economy, Infrastructure, Governance, Social trust, Ecosystems)
- [x] Signal Detail bottom sheet
- [x] Swipe gestures (right=attach, left=archive, hold=compare)
- [x] Severity color coding
- [ ] Explainability accordion
- [ ] Timeline sparkline

## Missions Tab Features
- [x] Mission List view with cards
- [x] Mission Detail screen
- [x] Mission Header with status
- [x] Mission Health Strip (system stress, funding, trust, infrastructure, policy)
- [ ] Linked Blocks (active risks, key signals, simulations, actors, decisions, changes)
- [ ] Mission Timeline (signal → investigation → simulation → decision → action → outcome)
- [ ] Cross-linked system tags
- [ ] Role-based visibility

## Simulations Tab Features
- [x] Scenario Library with pre-built scenarios
- [x] Scenario Builder with step-by-step flow
- [x] Variable Controls (sliders, toggles, steppers, policy presets)
- [ ] Simulation Results screen (narrative-first)
- [ ] Trade-offs visualization (winners/losers)
- [ ] Uncertainty bands display
- [ ] Ethical tensions callout
- [ ] Second-order effects section
- [x] Compare Scenarios side-by-side view
- [ ] "What changes if…" counterfactual lever panel

## Workspace Tab Features
- [x] Investigations list
- [x] Investigation Detail screen
- [x] Decision Room component
- [ ] Escalation Queue
- [ ] Notes & Artifacts section
- [ ] Link Signal to Investigation
- [ ] Task owner assignment
- [x] Urgency badges

## Bottom Sheets & Modals
- [x] Signal Detail sheet
- [x] Mission Detail sheet
- [x] Decision Room sheet
- [x] Attach to Mission sheet
- [x] Investigation Detail sheet
- [x] Scenario Builder modal

## State Management
- [x] Set up Context + useReducer for global state
- [x] Implement data store for signals
- [x] Implement data store for missions
- [x] Implement data store for simulations
- [x] Implement data store for investigations
- [x] AsyncStorage persistence for local data
- [x] Implement data synchronization logic

## API Integration
- [ ] Define API endpoints for signals
- [ ] Define API endpoints for missions
- [ ] Define API endpoints for simulations
- [ ] Define API endpoints for investigations
- [ ] Implement API client with error handling
- [ ] Implement real-time updates (WebSocket or polling)
- [ ] Implement data transformation/normalization

## UI/UX Polish
- [ ] Haptic feedback on button taps
- [ ] Press feedback (scale + opacity)
- [ ] Loading states for all async operations
- [ ] Empty states for lists
- [ ] Error states with retry options
- [ ] Skeleton loaders for data fetching
- [ ] Smooth transitions between screens
- [ ] Subtle animations (fade, scale)

## Styling & Theme
- [ ] Verify color tokens in theme.config.js
- [ ] Implement severity color coding (Stable/Watch/Elevated/Critical)
- [ ] Ensure dark mode support
- [ ] Test accessibility (color contrast, touch targets)
- [ ] Responsive typography
- [ ] Consistent spacing (16px base unit)

## App Branding
- [x] Generate custom app logo/icon
- [x] Update app.config.ts with app name
- [x] Set app logo URL in app.config.ts
- [x] Create splash screen icon
- [x] Create favicon
- [x] Create Android adaptive icon

## Testing & QA
- [ ] Test all user flows end-to-end
- [ ] Test swipe gestures on iOS and Android
- [ ] Test map interactions
- [ ] Test filter functionality
- [ ] Test scenario builder variables
- [ ] Test bottom sheet interactions
- [ ] Test dark mode switching
- [ ] Test on various screen sizes
- [ ] Test on actual devices (iOS + Android)

## Performance & Optimization
- [ ] Optimize list rendering with FlatList
- [ ] Implement image lazy loading
- [ ] Minimize bundle size
- [ ] Optimize animations (no janky transitions)
- [ ] Profile memory usage
- [ ] Test on low-end devices

## Documentation
- [ ] Document component API
- [ ] Document data flow architecture
- [ ] Document API integration patterns
- [ ] Create developer setup guide
- [ ] Document deployment process

## Deployment
- [ ] Create checkpoint before first delivery
- [ ] Build APK for Android
- [ ] Build IPA for iOS
- [ ] Set up CI/CD pipeline
- [ ] Configure environment variables
- [ ] Test production build
