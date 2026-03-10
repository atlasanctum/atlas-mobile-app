import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Signal, Mission, Scenario, Investigation, Decision } from "@/lib/atlas-context";

const STORAGE_KEYS = {
  SIGNALS: "atlas_signals",
  MISSIONS: "atlas_missions",
  SCENARIOS: "atlas_scenarios",
  INVESTIGATIONS: "atlas_investigations",
  DECISIONS: "atlas_decisions",
  PINNED_MISSIONS: "atlas_pinned_missions",
  USER_PREFERENCES: "atlas_user_preferences",
  INVESTIGATION_NOTES: "atlas_investigation_notes",
  LAST_SYNC: "atlas_last_sync",
};

export interface UserPreferences {
  theme: "light" | "dark" | "auto";
  notificationsEnabled: boolean;
  defaultRegion: string;
  sortBy: "severity" | "time" | "region";
}

export interface InvestigationNote {
  investigationId: string;
  notes: string;
  timestamp: number;
}

/**
 * Storage Service for Atlas
 * Handles persistence of signals, missions, investigations, and user preferences
 */
export const StorageService = {
  // Signals
  async saveSignals(signals: Signal[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SIGNALS, JSON.stringify(signals));
    } catch (error) {
      console.error("Error saving signals:", error);
    }
  },

  async getSignals(): Promise<Signal[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SIGNALS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error retrieving signals:", error);
      return [];
    }
  },

  async archiveSignal(signalId: string): Promise<void> {
    try {
      const signals = await this.getSignals();
      const filtered = signals.filter((s) => s.id !== signalId);
      await this.saveSignals(filtered);
    } catch (error) {
      console.error("Error archiving signal:", error);
    }
  },

  // Missions
  async saveMissions(missions: Mission[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(missions));
    } catch (error) {
      console.error("Error saving missions:", error);
    }
  },

  async getMissions(): Promise<Mission[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.MISSIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error retrieving missions:", error);
      return [];
    }
  },

  async pinMission(missionId: string): Promise<void> {
    try {
      const pinned = await this.getPinnedMissions();
      if (!pinned.includes(missionId)) {
        pinned.push(missionId);
        await AsyncStorage.setItem(STORAGE_KEYS.PINNED_MISSIONS, JSON.stringify(pinned));
      }
    } catch (error) {
      console.error("Error pinning mission:", error);
    }
  },

  async unpinMission(missionId: string): Promise<void> {
    try {
      const pinned = await this.getPinnedMissions();
      const filtered = pinned.filter((id) => id !== missionId);
      await AsyncStorage.setItem(STORAGE_KEYS.PINNED_MISSIONS, JSON.stringify(filtered));
    } catch (error) {
      console.error("Error unpinning mission:", error);
    }
  },

  async getPinnedMissions(): Promise<string[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.PINNED_MISSIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error retrieving pinned missions:", error);
      return [];
    }
  },

  // Scenarios
  async saveScenarios(scenarios: Scenario[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SCENARIOS, JSON.stringify(scenarios));
    } catch (error) {
      console.error("Error saving scenarios:", error);
    }
  },

  async getScenarios(): Promise<Scenario[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SCENARIOS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error retrieving scenarios:", error);
      return [];
    }
  },

  // Investigations
  async saveInvestigations(investigations: Investigation[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.INVESTIGATIONS, JSON.stringify(investigations));
    } catch (error) {
      console.error("Error saving investigations:", error);
    }
  },

  async getInvestigations(): Promise<Investigation[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.INVESTIGATIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error retrieving investigations:", error);
      return [];
    }
  },

  async saveInvestigationNote(note: InvestigationNote): Promise<void> {
    try {
      const notes = await this.getInvestigationNotes();
      const existingIndex = notes.findIndex(
        (n) => n.investigationId === note.investigationId
      );
      if (existingIndex >= 0) {
        notes[existingIndex] = note;
      } else {
        notes.push(note);
      }
      await AsyncStorage.setItem(STORAGE_KEYS.INVESTIGATION_NOTES, JSON.stringify(notes));
    } catch (error) {
      console.error("Error saving investigation note:", error);
    }
  },

  async getInvestigationNotes(): Promise<InvestigationNote[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.INVESTIGATION_NOTES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error retrieving investigation notes:", error);
      return [];
    }
  },

  // Decisions
  async saveDecisions(decisions: Decision[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.DECISIONS, JSON.stringify(decisions));
    } catch (error) {
      console.error("Error saving decisions:", error);
    }
  },

  async getDecisions(): Promise<Decision[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.DECISIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error retrieving decisions:", error);
      return [];
    }
  },

  // User Preferences
  async saveUserPreferences(preferences: UserPreferences): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
    } catch (error) {
      console.error("Error saving user preferences:", error);
    }
  },

  async getUserPreferences(): Promise<UserPreferences> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      return data
        ? JSON.parse(data)
        : {
            theme: "auto",
            notificationsEnabled: true,
            defaultRegion: "All",
            sortBy: "severity",
          };
    } catch (error) {
      console.error("Error retrieving user preferences:", error);
      return {
        theme: "auto",
        notificationsEnabled: true,
        defaultRegion: "All",
        sortBy: "severity",
      };
    }
  },

  // Sync Management
  async getLastSyncTime(): Promise<number> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.LAST_SYNC);
      return data ? parseInt(data, 10) : 0;
    } catch (error) {
      console.error("Error retrieving last sync time:", error);
      return 0;
    }
  },

  async setLastSyncTime(timestamp: number): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_SYNC, timestamp.toString());
    } catch (error) {
      console.error("Error setting last sync time:", error);
    }
  },

  // Clear all data
  async clearAllData(): Promise<void> {
    try {
      const keys = Object.values(STORAGE_KEYS);
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error("Error clearing all data:", error);
    }
  },

  // Export data for backup
  async exportAllData(): Promise<string> {
    try {
      const data = {
        signals: await this.getSignals(),
        missions: await this.getMissions(),
        scenarios: await this.getScenarios(),
        investigations: await this.getInvestigations(),
        decisions: await this.getDecisions(),
        preferences: await this.getUserPreferences(),
        exportedAt: new Date().toISOString(),
      };
      return JSON.stringify(data, null, 2);
    } catch (error) {
      console.error("Error exporting data:", error);
      return "";
    }
  },
};
