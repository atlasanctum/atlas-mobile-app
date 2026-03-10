import React, { createContext, useContext, useReducer, ReactNode } from "react";

export interface Signal {
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

export interface Mission {
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

export interface Scenario {
  id: string;
  title: string;
  description: string;
  region: string;
  system: string;
  recommendedPath: string;
  confidence: "Low" | "Medium" | "High";
  benefit: string;
  risk: string;
}

export interface Investigation {
  id: string;
  title: string;
  linkedSignals: number;
  hypothesis: string;
  urgency: "Low" | "Medium" | "High" | "Critical";
  taskOwners: number;
  status: "Open" | "In Progress" | "Awaiting Decision" | "Closed";
  linkedSignalIds: string[];
}

export interface Decision {
  id: string;
  proposedAction: string;
  confidence: "Low" | "Medium" | "High";
  status: "Review" | "Escalate" | "Assign";
  evidenceCount: number;
  linkedInvestigationId?: string;
}

interface AtlasState {
  signals: Signal[];
  missions: Mission[];
  scenarios: Scenario[];
  investigations: Investigation[];
  decisions: Decision[];
  selectedSignal: Signal | null;
  selectedMission: Mission | null;
  globalStatus: "Stable" | "Watch" | "Elevated" | "Critical";
}

type AtlasAction =
  | { type: "SET_SIGNALS"; payload: Signal[] }
  | { type: "SET_MISSIONS"; payload: Mission[] }
  | { type: "SET_SCENARIOS"; payload: Scenario[] }
  | { type: "SET_INVESTIGATIONS"; payload: Investigation[] }
  | { type: "SET_DECISIONS"; payload: Decision[] }
  | { type: "SELECT_SIGNAL"; payload: Signal | null }
  | { type: "SELECT_MISSION"; payload: Mission | null }
  | { type: "SET_GLOBAL_STATUS"; payload: AtlasState["globalStatus"] }
  | { type: "ATTACH_SIGNAL_TO_MISSION"; payload: { signalId: string; missionId: string } }
  | { type: "ARCHIVE_SIGNAL"; payload: string };

const initialState: AtlasState = {
  signals: [],
  missions: [],
  scenarios: [],
  investigations: [],
  decisions: [],
  selectedSignal: null,
  selectedMission: null,
  globalStatus: "Elevated",
};

function atlasReducer(state: AtlasState, action: AtlasAction): AtlasState {
  switch (action.type) {
    case "SET_SIGNALS":
      return { ...state, signals: action.payload };
    case "SET_MISSIONS":
      return { ...state, missions: action.payload };
    case "SET_SCENARIOS":
      return { ...state, scenarios: action.payload };
    case "SET_INVESTIGATIONS":
      return { ...state, investigations: action.payload };
    case "SET_DECISIONS":
      return { ...state, decisions: action.payload };
    case "SELECT_SIGNAL":
      return { ...state, selectedSignal: action.payload };
    case "SELECT_MISSION":
      return { ...state, selectedMission: action.payload };
    case "SET_GLOBAL_STATUS":
      return { ...state, globalStatus: action.payload };
    case "ATTACH_SIGNAL_TO_MISSION": {
      const { signalId, missionId } = action.payload;
      return {
        ...state,
        signals: state.signals.map((s) =>
          s.id === signalId
            ? { ...s, linkedMissions: [...s.linkedMissions, missionId] }
            : s
        ),
        missions: state.missions.map((m) =>
          m.id === missionId
            ? { ...m, linkedSignalIds: [...m.linkedSignalIds, signalId] }
            : m
        ),
      };
    }
    case "ARCHIVE_SIGNAL":
      return {
        ...state,
        signals: state.signals.filter((s) => s.id !== action.payload),
      };
    default:
      return state;
  }
}

interface AtlasContextType {
  state: AtlasState;
  dispatch: React.Dispatch<AtlasAction>;
}

const AtlasContext = createContext<AtlasContextType | undefined>(undefined);

export function AtlasProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(atlasReducer, initialState);

  return (
    <AtlasContext.Provider value={{ state, dispatch }}>
      {children}
    </AtlasContext.Provider>
  );
}

export function useAtlas() {
  const context = useContext(AtlasContext);
  if (!context) {
    throw new Error("useAtlas must be used within an AtlasProvider");
  }
  return context;
}
