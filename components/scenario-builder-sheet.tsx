import { ScrollView, Text, View, Pressable, Switch } from "react-native";
import { BottomSheet } from "@/components/bottom-sheet";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
// Custom slider implementation using Pressable and animated values
import * as React from "react";

interface ScenarioVariable {
  id: string;
  name: string;
  description: string;
  type: "slider" | "toggle" | "stepper";
  value: number | boolean;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

interface ScenarioBuilderSheetProps {
  isVisible: boolean;
  onClose: () => void;
  scenarioTitle: string;
  variables: ScenarioVariable[];
  onVariableChange: (variableId: string, value: number | boolean) => void;
  onSimulate: () => void;
}

export function ScenarioBuilderSheet({
  isVisible,
  onClose,
  scenarioTitle,
  variables,
  onVariableChange,
  onSimulate,
}: ScenarioBuilderSheetProps) {
  const colors = useColors();
  const [localVariables, setLocalVariables] = React.useState(variables);

  const handleVariableChange = (variableId: string, value: number | boolean) => {
    setLocalVariables(
      localVariables.map((v) =>
        v.id === variableId ? { ...v, value } : v
      )
    );
    onVariableChange(variableId, value);
  };

  const renderVariable = (variable: ScenarioVariable) => {
    switch (variable.type) {
      case "slider":
        return (
          <View key={variable.id} className="mb-6 pb-6 border-b" style={{ borderBottomColor: colors.border }}>
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground mb-1">
                  {variable.name}
                </Text>
                <Text className="text-xs text-muted">
                  {variable.description}
                </Text>
              </View>
              <View className="ml-3 items-center">
                <Text className="text-lg font-bold text-primary">
                  {Math.round(variable.value as number)}
                </Text>
                {variable.unit && (
                  <Text className="text-xs text-muted">{variable.unit}</Text>
                )}
              </View>
            </View>
            {/* Custom Slider */}
            <View className="h-10 justify-center">
              <View
                className="h-1 rounded-full"
                style={{ backgroundColor: colors.border }}
              >
                <View
                  className="h-1 rounded-full"
                  style={{
                    backgroundColor: colors.primary,
                    width: `${((variable.value as number - (variable.min || 0)) / ((variable.max || 100) - (variable.min || 0))) * 100}%`,
                  }}
                />
              </View>
            </View>
            <View className="flex-row items-center justify-between mt-2">
              <Text className="text-xs text-muted">
                {variable.min || 0}
              </Text>
              <Text className="text-xs text-muted">
                {variable.max || 100}
              </Text>
            </View>
          </View>
        );

      case "toggle":
        return (
          <View key={variable.id} className="mb-6 pb-6 border-b flex-row items-center justify-between" style={{ borderBottomColor: colors.border }}>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-foreground mb-1">
                {variable.name}
              </Text>
              <Text className="text-xs text-muted">
                {variable.description}
              </Text>
            </View>
            <Switch
              value={variable.value as boolean}
              onValueChange={(value) =>
                handleVariableChange(variable.id, value)
              }
              trackColor={{ false: colors.border, true: colors.primary + "50" }}
              thumbColor={variable.value ? colors.primary : colors.muted}
            />
          </View>
        );

      case "stepper":
        return (
          <View key={variable.id} className="mb-6 pb-6 border-b" style={{ borderBottomColor: colors.border }}>
            <Text className="text-sm font-semibold text-foreground mb-3">
              {variable.name}
            </Text>
            <Text className="text-xs text-muted mb-3">
              {variable.description}
            </Text>
            <View className="flex-row items-center gap-3">
              <Pressable
                onPress={() => {
                  const newValue = Math.max((variable.value as number) - (variable.step || 1), variable.min || 0);
                  handleVariableChange(variable.id, newValue);
                }}
                style={({ pressed }) => [
                  {
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderWidth: 1,
                    items: "center",
                    justifyContent: "center",
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <IconSymbol name="minus" size={20} color={colors.foreground} />
              </Pressable>

              <View className="flex-1 items-center">
                <Text className="text-2xl font-bold text-foreground">
                  {variable.value}
                </Text>
              </View>

              <Pressable
                onPress={() => {
                  const newValue = Math.min((variable.value as number) + (variable.step || 1), variable.max || 100);
                  handleVariableChange(variable.id, newValue);
                }}
                style={({ pressed }) => [
                  {
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    backgroundColor: colors.primary,
                    items: "center",
                    justifyContent: "center",
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <IconSymbol name="plus" size={20} color={colors.background} />
              </Pressable>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      title="Scenario Builder"
      height={0.95}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 16,
          paddingBottom: 32,
        }}
      >
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-foreground mb-2">
            {scenarioTitle}
          </Text>
          <Text className="text-sm text-muted">
            Adjust variables below to model different outcomes
          </Text>
        </View>

        {/* Variables */}
        {localVariables.map((variable) => renderVariable(variable))}

        {/* Simulation Preview */}
        <View className="mb-6 p-4 rounded-lg" style={{ backgroundColor: colors.primary + "10" }}>
          <View className="flex-row items-start gap-2 mb-2">
            <IconSymbol name="info.circle.fill" size={16} color={colors.primary} />
            <View className="flex-1">
              <Text className="text-sm font-semibold text-foreground mb-1">
                Simulation Preview
              </Text>
              <Text className="text-xs text-muted">
                Your current configuration will model a scenario with moderate rainfall increase and increased funding allocation.
              </Text>
            </View>
          </View>
        </View>

        {/* Expected Outcomes */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-foreground mb-3">
            Expected Outcomes
          </Text>
          <View className="gap-2">
            {[
              { label: "Wetland area restored", value: "+2,500 hectares", color: colors.success },
              { label: "Flood risk reduction", value: "35%", color: colors.primary },
              { label: "Biodiversity improvement", value: "+18%", color: colors.success },
            ].map((outcome, idx) => (
              <View
                key={idx}
                className="flex-row items-center justify-between p-3 rounded-lg"
                style={{ backgroundColor: colors.surface }}
              >
                <Text className="text-sm text-foreground">{outcome.label}</Text>
                <Text
                  className="text-sm font-bold"
                  style={{ color: outcome.color }}
                >
                  {outcome.value}
                </Text>
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
            onPress={onSimulate}
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
              Run Simulation
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </BottomSheet>
  );
}
