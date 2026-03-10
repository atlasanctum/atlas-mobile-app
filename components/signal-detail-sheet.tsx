import { ScrollView, Text, View, Pressable } from "react-native";
import { BottomSheet } from "@/components/bottom-sheet";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as React from "react";

export interface SignalDetailSheetProps {
  isVisible: boolean;
  onClose: () => void;
  signal: {
    id: string;
    title: string;
    location: string;
    category: string;
    severity: "Stable" | "Watch" | "Elevated" | "Critical";
    confidence: "Low" | "Medium" | "High";
    timeDetected: string;
    description: string;
    linkedMission?: string;
  };
}

const getSeverityColor = (severity: string, colors: any) => {
  switch (severity) {
    case "Stable":
      return colors.success;
    case "Watch":
      return colors.warning;
    case "Elevated":
      return "#FF6B35";
    case "Critical":
      return colors.error;
  }
};

export function SignalDetailSheet({
  isVisible,
  onClose,
  signal,
}: SignalDetailSheetProps) {
  const colors = useColors();
  const severityColor = getSeverityColor(signal.severity, colors);

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      title="Signal Details"
      height={0.85}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 16,
          paddingBottom: 32,
        }}
      >
        {/* Signal Title and Status */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-foreground mb-2">
            {signal.title}
          </Text>
          <View className="flex-row items-center gap-2 mb-3">
            <View
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: severityColor + "20" }}
            >
              <Text
                className="text-xs font-semibold"
                style={{ color: severityColor }}
              >
                {signal.severity}
              </Text>
            </View>
            <Text className="text-sm text-muted">{signal.location}</Text>
          </View>
          <Text className="text-sm text-muted">{signal.timeDetected}</Text>
        </View>

        {/* Description */}
        <View className="mb-6 pb-6 border-b" style={{ borderBottomColor: colors.border }}>
          <Text className="text-sm font-semibold text-foreground mb-2">
            What Changed
          </Text>
          <Text className="text-base text-muted leading-relaxed">
            {signal.description}
          </Text>
        </View>

        {/* Confidence and Category */}
        <View className="flex-row gap-4 mb-6 pb-6 border-b" style={{ borderBottomColor: colors.border }}>
          <View className="flex-1">
            <Text className="text-xs font-semibold text-muted mb-2">
              CONFIDENCE
            </Text>
            <Text className="text-lg font-bold text-foreground">
              {signal.confidence}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs font-semibold text-muted mb-2">
              CATEGORY
            </Text>
            <Text className="text-lg font-bold text-foreground">
              {signal.category}
            </Text>
          </View>
        </View>

        {/* Related Systems */}
        <View className="mb-6 pb-6 border-b" style={{ borderBottomColor: colors.border }}>
          <Text className="text-sm font-semibold text-foreground mb-3">
            Related Systems
          </Text>
          <View className="gap-2">
            {["Water Management", "Infrastructure", "Climate"].map((system) => (
              <View
                key={system}
                className="flex-row items-center gap-2 p-3 rounded-lg"
                style={{ backgroundColor: colors.surface }}
              >
                <IconSymbol name="checkmark.circle.fill" size={16} color={colors.primary} />
                <Text className="text-sm text-foreground">{system}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Historical Context */}
        <View className="mb-6 pb-6 border-b" style={{ borderBottomColor: colors.border }}>
          <Text className="text-sm font-semibold text-foreground mb-3">
            Historical Comparison
          </Text>
          <View className="p-4 rounded-lg" style={{ backgroundColor: colors.surface }}>
            <Text className="text-xs text-muted mb-2">
              Similar patterns detected in:
            </Text>
            <Text className="text-sm font-semibold text-foreground">
              2019 Drought Cycle (85% similarity)
            </Text>
            <Text className="text-xs text-muted mt-1">
              Duration: 6 months | Impact: High
            </Text>
          </View>
        </View>

        {/* Known Unknowns */}
        <View className="mb-6 pb-6 border-b" style={{ borderBottomColor: colors.border }}>
          <Text className="text-sm font-semibold text-foreground mb-3">
            Known Unknowns
          </Text>
          <View className="gap-2">
            {[
              "Incomplete rainfall telemetry in northern regions",
              "Reservoir capacity data 3 months old",
              "Transport infrastructure status uncertain",
            ].map((unknown, idx) => (
              <View
                key={idx}
                className="flex-row items-start gap-3 p-3 rounded-lg"
                style={{ backgroundColor: colors.surface }}
              >
                <IconSymbol name="exclamationmark.triangle.fill" size={16} color={colors.warning} />
                <Text className="text-sm text-muted flex-1">{unknown}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Linked Mission */}
        {signal.linkedMission && (
          <View className="mb-6 pb-6 border-b" style={{ borderBottomColor: colors.border }}>
            <Text className="text-sm font-semibold text-foreground mb-3">
              Linked Mission
            </Text>
            <Pressable
              style={({ pressed }) => [
                {
                  padding: 12,
                  borderRadius: 8,
                  backgroundColor: colors.primary + "10",
                  borderColor: colors.primary,
                  borderWidth: 1,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Text className="text-sm font-semibold text-foreground">
                {signal.linkedMission}
              </Text>
              <Text className="text-xs text-muted mt-1">
                Tap to view mission details
              </Text>
            </Pressable>
          </View>
        )}

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
              Attach to Mission
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                flex: 1,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: colors.error + "20",
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text className="text-sm font-semibold text-center" style={{ color: colors.error }}>
              Archive
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </BottomSheet>
  );
}
