import { ScrollView, Text, View, Pressable, FlatList } from "react-native";
import { BottomSheet } from "@/components/bottom-sheet";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as React from "react";

interface TimelineEvent {
  id: string;
  type: "signal" | "investigation" | "simulation" | "decision" | "action" | "outcome";
  title: string;
  description: string;
  timestamp: string;
}

interface MissionDetailSheetProps {
  isVisible: boolean;
  onClose: () => void;
  mission: {
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
  };
}

const getStatusColor = (status: string, colors: any) => {
  switch (status) {
    case "On Track":
      return colors.success;
    case "At Risk":
      return colors.warning;
    case "Critical":
      return colors.error;
  }
};

const getEventIcon = (type: TimelineEvent["type"]) => {
  switch (type) {
    case "signal":
      return "bell.fill";
    case "investigation":
      return "magnifyingglass";
    case "simulation":
      return "waveform.path.ecg";
    case "decision":
      return "checkmark.circle.fill";
    case "action":
      return "paperplane.fill";
    case "outcome":
      return "target";
  }
};

const MOCK_TIMELINE: TimelineEvent[] = [
  {
    id: "1",
    type: "signal",
    title: "Flood pressure signal detected",
    description: "Seasonal precipitation 40% above historical average",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "investigation",
    title: "Investigation opened",
    description: "Root cause analysis initiated by regional team",
    timestamp: "1.5 hours ago",
  },
  {
    id: "3",
    type: "simulation",
    title: "Scenario modeling completed",
    description: "Wetland restoration vs concrete barriers comparison",
    timestamp: "1 hour ago",
  },
  {
    id: "4",
    type: "decision",
    title: "Decision proposed",
    description: "Recommended wetland restoration approach",
    timestamp: "45 minutes ago",
  },
];

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

export function MissionDetailSheet({
  isVisible,
  onClose,
  mission,
}: MissionDetailSheetProps) {
  const colors = useColors();
  const statusColor = getStatusColor(mission.status, colors);

  const renderTimelineEvent = ({ item }: { item: TimelineEvent }) => (
    <View className="flex-row gap-3 mb-4">
      {/* Timeline Dot and Line */}
      <View className="items-center">
        <View
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: colors.primary + "20" }}
        >
          <IconSymbol name={getEventIcon(item.type) as any} size={16} color={colors.primary} />
        </View>
      </View>

      {/* Event Content */}
      <View className="flex-1 pb-4">
        <Text className="text-sm font-semibold text-foreground mb-1">
          {item.title}
        </Text>
        <Text className="text-xs text-muted mb-2">
          {item.description}
        </Text>
        <Text className="text-xs text-muted">
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      title="Mission Details"
      height={0.9}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 16,
          paddingBottom: 32,
        }}
      >
        {/* Mission Header */}
        <View className="mb-6">
          <View className="flex-row items-start justify-between mb-3">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-foreground mb-2">
                {mission.name}
              </Text>
              <Text className="text-sm text-muted">
                {mission.region}
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
                {mission.status}
              </Text>
            </View>
          </View>
          <Text className="text-sm text-muted leading-relaxed">
            {mission.objective}
          </Text>
        </View>

        {/* Health Metrics */}
        <View className="mb-6 pb-6 border-b" style={{ borderBottomColor: colors.border }}>
          <Text className="text-sm font-semibold text-foreground mb-4">
            Mission Health
          </Text>
          <View className="gap-4">
            <View>
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xs font-semibold text-muted">System Stress</Text>
                <Text className="text-xs font-bold text-foreground">{mission.systemStress}%</Text>
              </View>
              <HealthBar value={mission.systemStress} color={colors.error} />
            </View>

            <View>
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xs font-semibold text-muted">Funding Status</Text>
                <Text className="text-xs font-bold text-foreground">{mission.fundingStatus}%</Text>
              </View>
              <HealthBar value={mission.fundingStatus} color={colors.primary} />
            </View>

            <View>
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xs font-semibold text-muted">Public Trust</Text>
                <Text className="text-xs font-bold text-foreground">{mission.publicTrust}%</Text>
              </View>
              <HealthBar value={mission.publicTrust} color={colors.success} />
            </View>
          </View>
        </View>

        {/* Linked Resources */}
        <View className="mb-6 pb-6 border-b" style={{ borderBottomColor: colors.border }}>
          <Text className="text-sm font-semibold text-foreground mb-3">
            Linked Resources
          </Text>
          <View className="flex-row gap-4">
            <View className="flex-1 p-3 rounded-lg" style={{ backgroundColor: colors.surface }}>
              <Text className="text-2xl font-bold text-foreground">
                {mission.activeRisks}
              </Text>
              <Text className="text-xs text-muted">Active Risks</Text>
            </View>
            <View className="flex-1 p-3 rounded-lg" style={{ backgroundColor: colors.surface }}>
              <Text className="text-2xl font-bold text-foreground">
                {mission.linkedSignals}
              </Text>
              <Text className="text-xs text-muted">Linked Signals</Text>
            </View>
          </View>
        </View>

        {/* Timeline */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-foreground mb-4">
            Mission Timeline
          </Text>
          <FlatList
            data={MOCK_TIMELINE}
            renderItem={renderTimelineEvent}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            nestedScrollEnabled={true}
          />
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-2">
          <Pressable
            style={({ pressed }) => [
              {
                flex: 1,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: colors.primary + "20",
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text className="text-sm font-semibold text-center" style={{ color: colors.primary }}>
              View Risks
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                flex: 1,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: colors.primary,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text className="text-sm font-semibold text-center text-background">
              Update Status
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </BottomSheet>
  );
}
