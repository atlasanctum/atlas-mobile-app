import { ScrollView, Text, View, FlatList, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import * as React from "react";

interface Mission {
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
}

const MOCK_MISSIONS: Mission[] = [
  {
    id: "1",
    name: "Wetland Restoration",
    objective: "Restore degraded watershed and improve flood resilience",
    region: "Nairobi Basin",
    status: "On Track",
    systemStress: 65,
    fundingStatus: 75,
    publicTrust: 60,
    activeRisks: 3,
    linkedSignals: 5,
  },
  {
    id: "2",
    name: "Food Security Initiative",
    objective: "Reduce food price volatility and improve supply chain resilience",
    region: "Rift Valley",
    status: "At Risk",
    systemStress: 80,
    fundingStatus: 45,
    publicTrust: 50,
    activeRisks: 7,
    linkedSignals: 8,
  },
  {
    id: "3",
    name: "Grid Stability Program",
    objective: "Increase renewable energy capacity and grid reliability",
    region: "East Africa",
    status: "On Track",
    systemStress: 72,
    fundingStatus: 82,
    publicTrust: 70,
    activeRisks: 2,
    linkedSignals: 4,
  },
  {
    id: "4",
    name: "Community Trust Building",
    objective: "Strengthen institutional credibility and public engagement",
    region: "South Sudan",
    status: "Critical",
    systemStress: 95,
    fundingStatus: 30,
    publicTrust: 25,
    activeRisks: 12,
    linkedSignals: 6,
  },
];

const getStatusColor = (status: Mission["status"], colors: any) => {
  switch (status) {
    case "On Track":
      return colors.success;
    case "At Risk":
      return colors.warning;
    case "Critical":
      return colors.error;
  }
};

const HealthBar = ({ value, color }: { value: number; color: string }) => (
  <View
    className="h-2 rounded-full overflow-hidden"
    style={{ backgroundColor: color + "20" }}
  >
    <View
      className="h-full rounded-full"
      style={{
        backgroundColor: color,
        width: `${value}%`,
      }}
    />
  </View>
);

export default function MissionsScreen() {
  const colors = useColors();

  const renderMissionCard = ({ item }: { item: Mission }) => {
    const statusColor = getStatusColor(item.status, colors);

    return (
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-foreground mb-1">
              {item.name}
            </Text>
            <Text className="text-sm text-muted">
              {item.region}
            </Text>
          </View>
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: statusColor + "20" }}
          >
            <Text
              className="text-xs font-semibold"
              style={{ color: statusColor }}
            >
              {item.status}
            </Text>
          </View>
        </View>

        <Text className="text-sm text-muted mb-4">
          {item.objective}
        </Text>

        {/* Health Metrics */}
        <View className="gap-3 mb-4 pb-4 border-b" style={{ borderBottomColor: colors.border }}>
          <View>
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-xs font-semibold text-muted">System Stress</Text>
              <Text className="text-xs text-muted">{item.systemStress}%</Text>
            </View>
            <HealthBar value={item.systemStress} color={colors.error} />
          </View>

          <View>
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-xs font-semibold text-muted">Funding Status</Text>
              <Text className="text-xs text-muted">{item.fundingStatus}%</Text>
            </View>
            <HealthBar value={item.fundingStatus} color={colors.primary} />
          </View>

          <View>
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-xs font-semibold text-muted">Public Trust</Text>
              <Text className="text-xs text-muted">{item.publicTrust}%</Text>
            </View>
            <HealthBar value={item.publicTrust} color={colors.success} />
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row gap-4">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-foreground">
              {item.activeRisks}
            </Text>
            <Text className="text-xs text-muted">Active Risks</Text>
          </View>
          <View className="flex-1">
            <Text className="text-2xl font-bold text-foreground">
              {item.linkedSignals}
            </Text>
            <Text className="text-xs text-muted">Linked Signals</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <ScreenContainer className="p-0">
      <View className="flex-1">
        {/* Header */}
        <View className="px-6 pt-4 pb-4">
          <Text className="text-3xl font-bold text-foreground mb-2">
            Missions
          </Text>
          <Text className="text-sm text-muted">
            Goal-based operational workspaces
          </Text>
        </View>

        {/* Mission List */}
        <FlatList
          data={MOCK_MISSIONS}
          renderItem={renderMissionCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
          scrollEnabled={true}
        />
      </View>
    </ScreenContainer>
  );
}
