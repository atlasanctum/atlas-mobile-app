import { ScrollView, Text, View, Pressable } from "react-native";
import { BottomSheet } from "@/components/bottom-sheet";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as React from "react";

interface SignalComparisonSheetProps {
  isVisible: boolean;
  onClose: () => void;
  signalTitle: string;
  currentValue: number;
  historicalValue: number;
  unit: string;
  changePercent: number;
  timeframe: string;
}

export function SignalComparisonSheet({
  isVisible,
  onClose,
  signalTitle,
  currentValue,
  historicalValue,
  unit,
  changePercent,
  timeframe,
}: SignalComparisonSheetProps) {
  const colors = useColors();
  const isIncreasing = changePercent > 0;
  const changeColor = isIncreasing ? colors.error : colors.success;

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      title="Compare with Baseline"
      height={0.75}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 16,
          paddingBottom: 32,
        }}
      >
        {/* Signal Title */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-foreground">
            {signalTitle}
          </Text>
          <Text className="text-sm text-muted mt-1">
            Historical comparison over {timeframe}
          </Text>
        </View>

        {/* Comparison Cards */}
        <View className="gap-4 mb-6">
          {/* Current Value */}
          <View className="p-4 rounded-lg" style={{ backgroundColor: colors.surface }}>
            <Text className="text-xs font-semibold text-muted mb-2">
              CURRENT VALUE
            </Text>
            <Text className="text-4xl font-bold text-foreground">
              {currentValue}
            </Text>
            <Text className="text-sm text-muted mt-1">
              {unit}
            </Text>
          </View>

          {/* Historical Value */}
          <View className="p-4 rounded-lg" style={{ backgroundColor: colors.surface }}>
            <Text className="text-xs font-semibold text-muted mb-2">
              HISTORICAL BASELINE
            </Text>
            <Text className="text-4xl font-bold text-muted">
              {historicalValue}
            </Text>
            <Text className="text-sm text-muted mt-1">
              {unit}
            </Text>
          </View>
        </View>

        {/* Change Indicator */}
        <View
          className="p-4 rounded-lg mb-6 flex-row items-center gap-3"
          style={{ backgroundColor: changeColor + "10" }}
        >
          <IconSymbol
            name={isIncreasing ? "exclamationmark.triangle.fill" : "checkmark.circle.fill"}
            size={24}
            color={changeColor}
          />
          <View className="flex-1">
            <Text className="text-sm font-semibold text-foreground">
              {isIncreasing ? "Increase" : "Decrease"}
            </Text>
            <Text
              className="text-2xl font-bold"
              style={{ color: changeColor }}
            >
              {isIncreasing ? "+" : ""}{changePercent}%
            </Text>
          </View>
        </View>

        {/* Analysis */}
        <View className="mb-6 pb-6 border-b" style={{ borderBottomColor: colors.border }}>
          <Text className="text-sm font-semibold text-foreground mb-3">
            Analysis
          </Text>
          {isIncreasing ? (
            <>
              <Text className="text-sm text-muted mb-3">
                Current levels are significantly higher than the historical baseline. This indicates a notable departure from normal patterns.
              </Text>
              <View className="p-3 rounded-lg" style={{ backgroundColor: colors.error + "10" }}>
                <Text className="text-sm text-foreground font-semibold mb-1">
                  ⚠️ Elevated Risk
                </Text>
                <Text className="text-xs text-muted">
                  Consider escalating this signal to relevant stakeholders and reviewing mitigation strategies.
                </Text>
              </View>
            </>
          ) : (
            <>
              <Text className="text-sm text-muted mb-3">
                Current levels are lower than the historical baseline, indicating an improvement in this metric.
              </Text>
              <View className="p-3 rounded-lg" style={{ backgroundColor: colors.success + "10" }}>
                <Text className="text-sm text-foreground font-semibold mb-1">
                  ✓ Positive Trend
                </Text>
                <Text className="text-xs text-muted">
                  Continue monitoring to ensure the trend persists.
                </Text>
              </View>
            </>
          )}
        </View>

        {/* Related Signals */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-foreground mb-3">
            Related Signals
          </Text>
          <View className="gap-2">
            {["Rainfall anomaly", "Reservoir levels", "Transport disruption"].map((signal, idx) => (
              <View
                key={idx}
                className="flex-row items-center gap-2 p-3 rounded-lg"
                style={{ backgroundColor: colors.surface }}
              >
                <IconSymbol name="checkmark.circle.fill" size={16} color={colors.primary} />
                <Text className="text-sm text-foreground">{signal}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Action Button */}
        <Pressable
          onPress={onClose}
          style={({ pressed }) => [
            {
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              backgroundColor: colors.primary,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Text className="text-sm font-semibold text-center text-background">
            Close
          </Text>
        </Pressable>
      </ScrollView>
    </BottomSheet>
  );
}
