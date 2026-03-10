import { ScrollView, Text, View, FlatList, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import * as React from "react";

interface Investigation {
  id: string;
  title: string;
  linkedSignals: number;
  hypothesis: string;
  urgency: "Low" | "Medium" | "High" | "Critical";
  taskOwners: number;
  status: "Open" | "In Progress" | "Awaiting Decision" | "Closed";
}

interface Decision {
  id: string;
  proposedAction: string;
  confidence: "Low" | "Medium" | "High";
  status: "Review" | "Escalate" | "Assign";
  evidenceCount: number;
}

const MOCK_INVESTIGATIONS: Investigation[] = [
  {
    id: "1",
    title: "Water stress anomaly root cause analysis",
    linkedSignals: 3,
    hypothesis: "Combination of rainfall shortfall and infrastructure strain",
    urgency: "Critical",
    taskOwners: 2,
    status: "In Progress",
  },
  {
    id: "2",
    title: "Food price volatility drivers",
    linkedSignals: 5,
    hypothesis: "Supply chain disruption + market speculation",
    urgency: "High",
    taskOwners: 3,
    status: "Open",
  },
  {
    id: "3",
    title: "Grid stability risk assessment",
    linkedSignals: 2,
    hypothesis: "Peak demand exceeding generation capacity",
    urgency: "Medium",
    taskOwners: 1,
    status: "Awaiting Decision",
  },
];

const MOCK_DECISIONS: Decision[] = [
  {
    id: "1",
    proposedAction: "Activate emergency water rationing protocol",
    confidence: "High",
    status: "Review",
    evidenceCount: 4,
  },
  {
    id: "2",
    proposedAction: "Deploy food price stabilization fund",
    confidence: "Medium",
    status: "Escalate",
    evidenceCount: 6,
  },
  {
    id: "3",
    proposedAction: "Initiate grid load shedding schedule",
    confidence: "High",
    status: "Assign",
    evidenceCount: 3,
  },
];

const getUrgencyColor = (urgency: Investigation["urgency"], colors: any) => {
  switch (urgency) {
    case "Low":
      return colors.success;
    case "Medium":
      return colors.warning;
    case "High":
      return "#FF6B35";
    case "Critical":
      return colors.error;
  }
};

const getStatusColor = (status: Investigation["status"], colors: any) => {
  switch (status) {
    case "Open":
      return colors.primary;
    case "In Progress":
      return colors.warning;
    case "Awaiting Decision":
      return "#FF6B35";
    case "Closed":
      return colors.success;
  }
};

export default function WorkspaceScreen() {
  const colors = useColors();
  const [activeTab, setActiveTab] = React.useState<"investigations" | "decisions">("investigations");

  const renderInvestigationCard = ({ item }: { item: Investigation }) => {
    const urgencyColor = getUrgencyColor(item.urgency, colors);
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
            <Text className="text-lg font-semibold text-foreground mb-2">
              {item.title}
            </Text>
            <View className="flex-row gap-2 mb-2">
              <View
                className="px-2 py-1 rounded-full"
                style={{ backgroundColor: urgencyColor + "20" }}
              >
                <Text
                  className="text-xs font-semibold"
                  style={{ color: urgencyColor }}
                >
                  {item.urgency}
                </Text>
              </View>
              <View
                className="px-2 py-1 rounded-full"
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
          </View>
        </View>

        <Text className="text-sm text-muted mb-3">
          {item.hypothesis}
        </Text>

        <View className="flex-row gap-4 pt-3 border-t" style={{ borderTopColor: colors.border }}>
          <View className="flex-1">
            <Text className="text-xs text-muted mb-1">Linked Signals</Text>
            <Text className="text-lg font-bold text-foreground">
              {item.linkedSignals}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-muted mb-1">Task Owners</Text>
            <Text className="text-lg font-bold text-foreground">
              {item.taskOwners}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const renderDecisionCard = ({ item }: { item: Decision }) => {
    const getActionColor = (status: Decision["status"]) => {
      switch (status) {
        case "Review":
          return colors.warning;
        case "Escalate":
          return colors.error;
        case "Assign":
          return colors.success;
      }
    };

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
            <Text className="text-lg font-semibold text-foreground mb-2">
              {item.proposedAction}
            </Text>
            <View className="flex-row gap-2">
              <View
                className="px-2 py-1 rounded-full"
                style={{ backgroundColor: colors.primary + "20" }}
              >
                <Text
                  className="text-xs font-semibold"
                  style={{ color: colors.primary }}
                >
                  {item.confidence}
                </Text>
              </View>
              <View
                className="px-2 py-1 rounded-full"
                style={{ backgroundColor: getActionColor(item.status) + "20" }}
              >
                <Text
                  className="text-xs font-semibold"
                  style={{ color: getActionColor(item.status) }}
                >
                  {item.status}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="flex-row gap-2 pt-3 border-t" style={{ borderTopColor: colors.border }}>
          <Pressable
            style={({ pressed }) => [
              {
                flex: 1,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 8,
                backgroundColor: colors.primary + "20",
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text className="text-xs font-semibold text-center" style={{ color: colors.primary }}>
              View Evidence ({item.evidenceCount})
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                flex: 1,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 8,
                backgroundColor: getActionColor(item.status) + "20",
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text
              className="text-xs font-semibold text-center"
              style={{ color: getActionColor(item.status) }}
            >
              {item.status}
            </Text>
          </Pressable>
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
            Workspace
          </Text>
          <Text className="text-sm text-muted">
            Collaboration and institutional coordination
          </Text>
        </View>

        {/* Tab Switcher */}
        <View className="flex-row px-6 pb-4 gap-2">
          <Pressable
            onPress={() => setActiveTab("investigations")}
            style={({ pressed }) => [
              {
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 8,
                backgroundColor:
                  activeTab === "investigations" ? colors.primary : colors.surface,
                borderColor: colors.border,
                borderWidth: activeTab === "investigations" ? 0 : 1,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text
              className="text-sm font-semibold text-center"
              style={{
                color:
                  activeTab === "investigations"
                    ? colors.background
                    : colors.foreground,
              }}
            >
              Investigations
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab("decisions")}
            style={({ pressed }) => [
              {
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 8,
                backgroundColor:
                  activeTab === "decisions" ? colors.primary : colors.surface,
                borderColor: colors.border,
                borderWidth: activeTab === "decisions" ? 0 : 1,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text
              className="text-sm font-semibold text-center"
              style={{
                color:
                  activeTab === "decisions"
                    ? colors.background
                    : colors.foreground,
              }}
            >
              Decisions
            </Text>
          </Pressable>
        </View>

        {/* Content */}
        {activeTab === "investigations" ? (
          <FlatList
            data={MOCK_INVESTIGATIONS}
            renderItem={renderInvestigationCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
            scrollEnabled={true}
          />
        ) : (
          <FlatList
            data={MOCK_DECISIONS}
            renderItem={renderDecisionCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
            scrollEnabled={true}
          />
        )}
      </View>
    </ScreenContainer>
  );
}
