import { ScrollView, Text, View, Pressable, FlatList } from "react-native";
import { BottomSheet } from "@/components/bottom-sheet";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as React from "react";

interface DecisionOption {
  id: string;
  action: string;
  description: string;
  confidence: "Low" | "Medium" | "High";
  impact: "Low" | "Medium" | "High";
  timeline: string;
  risks: string[];
}

interface DecisionRoomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  signalTitle: string;
  linkedInvestigation: string;
  decisions: DecisionOption[];
  onSelectDecision: (decisionId: string) => void;
}

const getConfidenceColor = (confidence: string, colors: any) => {
  switch (confidence) {
    case "Low":
      return colors.warning;
    case "Medium":
      return colors.primary;
    case "High":
      return colors.success;
  }
};

const getImpactColor = (impact: string, colors: any) => {
  switch (impact) {
    case "Low":
      return colors.success;
    case "Medium":
      return colors.warning;
    case "High":
      return colors.error;
  }
};

export function DecisionRoomSheet({
  isVisible,
  onClose,
  signalTitle,
  linkedInvestigation,
  decisions,
  onSelectDecision,
}: DecisionRoomSheetProps) {
  const colors = useColors();
  const [selectedDecisionId, setSelectedDecisionId] = React.useState<string | null>(null);

  const renderDecisionOption = ({ item }: { item: DecisionOption }) => {
    const isSelected = selectedDecisionId === item.id;
    const confidenceColor = getConfidenceColor(item.confidence, colors);
    const impactColor = getImpactColor(item.impact, colors);

    return (
      <Pressable
        onPress={() => setSelectedDecisionId(item.id)}
        style={({ pressed }) => [
          {
            backgroundColor: isSelected ? colors.primary + "10" : colors.surface,
            borderColor: isSelected ? colors.primary : colors.border,
            borderWidth: 2,
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
              {item.action}
            </Text>
            <Text className="text-sm text-muted">
              {item.description}
            </Text>
          </View>
          {isSelected && (
            <IconSymbol name="checkmark.circle.fill" size={24} color={colors.primary} />
          )}
        </View>

        {/* Metrics */}
        <View className="flex-row gap-2 mb-3">
          <View
            className="px-2 py-1 rounded-full"
            style={{ backgroundColor: confidenceColor + "20" }}
          >
            <Text
              className="text-xs font-semibold"
              style={{ color: confidenceColor }}
            >
              {item.confidence} confidence
            </Text>
          </View>
          <View
            className="px-2 py-1 rounded-full"
            style={{ backgroundColor: impactColor + "20" }}
          >
            <Text
              className="text-xs font-semibold"
              style={{ color: impactColor }}
            >
              {item.impact} impact
            </Text>
          </View>
        </View>

        {/* Timeline */}
        <View className="flex-row items-center gap-2 mb-3 pb-3 border-b" style={{ borderBottomColor: colors.border }}>
          <IconSymbol name="clock.fill" size={14} color={colors.muted} />
          <Text className="text-xs text-muted">{item.timeline}</Text>
        </View>

        {/* Risks */}
        {item.risks.length > 0 && (
          <View>
            <Text className="text-xs font-semibold text-muted mb-2">
              Key Risks
            </Text>
            <View className="gap-1">
              {item.risks.map((risk, idx) => (
                <View key={idx} className="flex-row items-start gap-2">
                  <IconSymbol name="exclamationmark.triangle.fill" size={12} color={colors.warning} />
                  <Text className="text-xs text-muted flex-1">{risk}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      title="Decision Room"
      height={0.9}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 16,
          paddingBottom: 32,
        }}
      >
        {/* Context */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-muted mb-2">
            SIGNAL
          </Text>
          <Text className="text-xl font-bold text-foreground mb-3">
            {signalTitle}
          </Text>
          <View className="p-3 rounded-lg" style={{ backgroundColor: colors.primary + "10" }}>
            <Text className="text-xs font-semibold text-muted mb-1">
              LINKED INVESTIGATION
            </Text>
            <Text className="text-sm font-semibold text-foreground">
              {linkedInvestigation}
            </Text>
          </View>
        </View>

        {/* Decision Options */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-foreground mb-3">
            Recommended Actions
          </Text>
          <FlatList
            data={decisions}
            renderItem={renderDecisionOption}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            nestedScrollEnabled={true}
          />
        </View>

        {/* Escalation Path */}
        <View className="mb-6 pb-6 border-b" style={{ borderBottomColor: colors.border }}>
          <Text className="text-sm font-semibold text-foreground mb-3">
            Escalation Path
          </Text>
          <View className="gap-2">
            {[
              { level: "Regional Team", status: "Notified" },
              { level: "National Coordinator", status: "Pending" },
              { level: "International Partners", status: "Pending" },
            ].map((item, idx) => (
              <View
                key={idx}
                className="flex-row items-center justify-between p-3 rounded-lg"
                style={{ backgroundColor: colors.surface }}
              >
                <Text className="text-sm font-semibold text-foreground">
                  {item.level}
                </Text>
                <View
                  className="px-2 py-1 rounded-full"
                  style={{
                    backgroundColor:
                      item.status === "Notified"
                        ? colors.success + "20"
                        : colors.warning + "20",
                  }}
                >
                  <Text
                    className="text-xs font-semibold"
                    style={{
                      color:
                        item.status === "Notified"
                          ? colors.success
                          : colors.warning,
                    }}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-2">
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [
              {
                flex: 1,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text className="text-sm font-semibold text-center text-foreground">
              Cancel
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (selectedDecisionId) {
                onSelectDecision(selectedDecisionId);
                onClose();
              }
            }}
            disabled={!selectedDecisionId}
            style={({ pressed }) => [
              {
                flex: 1,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: selectedDecisionId ? colors.primary : colors.muted,
                opacity: pressed && selectedDecisionId ? 0.8 : selectedDecisionId ? 1 : 0.5,
              },
            ]}
          >
            <Text className="text-sm font-semibold text-center text-background">
              Escalate Decision
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </BottomSheet>
  );
}
