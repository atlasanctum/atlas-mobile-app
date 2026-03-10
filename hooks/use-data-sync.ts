import { useCallback, useEffect, useState } from "react";
import { StorageService } from "@/lib/storage-service";
import { useAtlas } from "@/lib/atlas-context";

interface SyncStatus {
  isSyncing: boolean;
  lastSyncTime: number | null;
  error: string | null;
}

/**
 * Hook for managing data synchronization
 * Handles loading data from storage and syncing with server
 */
export function useDataSync() {
  const { state, dispatch } = useAtlas();
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isSyncing: false,
    lastSyncTime: null,
    error: null,
  });

  // Load data from storage on mount
  useEffect(() => {
    loadDataFromStorage();
  }, []);

  const loadDataFromStorage = useCallback(async () => {
    try {
      setSyncStatus((prev) => ({ ...prev, isSyncing: true, error: null }));

      const [signals, missions, scenarios, investigations, decisions, lastSync] = await Promise.all([
        StorageService.getSignals(),
        StorageService.getMissions(),
        StorageService.getScenarios(),
        StorageService.getInvestigations(),
        StorageService.getDecisions(),
        StorageService.getLastSyncTime(),
      ]);

      dispatch({ type: "SET_SIGNALS", payload: signals });
      dispatch({ type: "SET_MISSIONS", payload: missions });
      dispatch({ type: "SET_SCENARIOS", payload: scenarios });
      dispatch({ type: "SET_INVESTIGATIONS", payload: investigations });
      dispatch({ type: "SET_DECISIONS", payload: decisions });

      setSyncStatus((prev) => ({
        ...prev,
        isSyncing: false,
        lastSyncTime: lastSync,
      }));
    } catch (error) {
      setSyncStatus((prev) => ({
        ...prev,
        isSyncing: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }));
    }
  }, [dispatch]);

  const syncToStorage = useCallback(async () => {
    try {
      setSyncStatus((prev) => ({ ...prev, isSyncing: true, error: null }));

      await Promise.all([
        StorageService.saveSignals(state.signals),
        StorageService.saveMissions(state.missions),
        StorageService.saveScenarios(state.scenarios),
        StorageService.saveInvestigations(state.investigations),
        StorageService.saveDecisions(state.decisions),
        StorageService.setLastSyncTime(Date.now()),
      ]);

      setSyncStatus((prev) => ({
        ...prev,
        isSyncing: false,
        lastSyncTime: Date.now(),
      }));
    } catch (error) {
      setSyncStatus((prev) => ({
        ...prev,
        isSyncing: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }));
    }
  }, [state]);

  const syncWithServer = useCallback(async () => {
    try {
      setSyncStatus((prev) => ({ ...prev, isSyncing: true, error: null }));

      // TODO: Implement server sync logic
      // This would call your backend API to sync data
      // For now, just save to local storage
      await syncToStorage();

      setSyncStatus((prev) => ({
        ...prev,
        isSyncing: false,
        lastSyncTime: Date.now(),
      }));
    } catch (error) {
      setSyncStatus((prev) => ({
        ...prev,
        isSyncing: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }));
    }
  }, [syncToStorage]);

  const clearAllData = useCallback(async () => {
    try {
      setSyncStatus((prev) => ({ ...prev, isSyncing: true, error: null }));
      await StorageService.clearAllData();

      // Reset state
      dispatch({ type: "SET_SIGNALS", payload: [] });
      dispatch({ type: "SET_MISSIONS", payload: [] });
      dispatch({ type: "SET_SCENARIOS", payload: [] });
      dispatch({ type: "SET_INVESTIGATIONS", payload: [] });
      dispatch({ type: "SET_DECISIONS", payload: [] });

      setSyncStatus((prev) => ({
        ...prev,
        isSyncing: false,
        lastSyncTime: null,
      }));
    } catch (error) {
      setSyncStatus((prev) => ({
        ...prev,
        isSyncing: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }));
    }
  }, [dispatch]);

  return {
    syncStatus,
    loadDataFromStorage,
    syncToStorage,
    syncWithServer,
    clearAllData,
  };
}
