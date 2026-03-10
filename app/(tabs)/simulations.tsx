import { ScrollView, Text, View, FlatList, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import * as React from "react";

interface Scenario {
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

const MOCK_SCENARIOS: Scenario[] = [
  {
    id: "1",
    title: "Flood barrier vs wetland restoration",
    description: "Compare concrete barriers with natural wetland restoration",
    region: "Nairobi Basin",
    system: "Water Management",
    recommendedPath: "Wetland restoration outperforms barriers over 10 years",
    confidence: "Medium",
    benefit: "Lower flood intensity, biodiversity gain, lower maintenance cost",
    risk: "Delayed short-term impact, political resistance",
  },
  {
    id: "2",
    title: "Carbon tax introduction",
    description: "Model economic impact of carbon pricing mechanism",
    region: "East Africa",
    system: "Climate Policy",
    recommendedPath: "Gradual implementation with revenue recycling",
    confidence: "High",
    benefit: "Reduced emissions, government revenue, market innovation",
    risk: "Initial economic slowdown, regressive impact on low-income",
  },
  {
    id: "3",
    title: "Food aid distribution optimization",
    description: "Optimize aid allocation across regions and populations",
    region: "Rift Valley",
    system: "Food Security",
    recommendedPath: "Dynamic allocation based on real-time stress indicators",
    confidence: "Medium",
    benefit: "Reduced food price volatility, improved targeting efficiency",
    risk: "Implementation complexity, coordination challenges",
  },
  {
    id: "4",
    title: "Grid rerouting under heat stress",
    description: "Simulate grid reconfiguration during extreme heat events",
    region: "East Africa",
    system: "Infrastructure",
    recommendedPath: "Distributed renewable integration with smart routing",
    confidence: "High",
    benefit: "Improved resilience, reduced blackout risk, cost savings",
    risk: "Technical complexity, upfront infrastructure investment",
  },
];

export default function SimulationsScreen() {
  const colors = useColors();
  const [selectedScenario, setSelectedScenario] = React.useState<string | null>(null);

  const renderScenarioCard = ({ item }: { item: Scenario }) => {
    const isSelected = selectedScenario === item.id;

    return (
      <Pressable
        onPress={() => setSelectedScenario(isSelected ? null : item.id)}
        style={({ pressed }) => [
          {
            backgroundColor: colors.surface,
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
              {item.title}
            </Text>
            <Text className="text-sm text-muted">
              {item.region} • {item.system}
            </Text>
          </View>
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: colors.primary + "20" }}
          >
            <Text
              className="text-xs font-semibold"
              style={{ color: colors.primary }}
            >
              {item.confidence}
            </Text>
          </View>
        </View>

        <Text className="text-sm text-muted mb-3">
          {item.description}
        </Text>

        {isSelected && (
          <View className="pt-4 border-t gap-3" style={{ borderTopColor: colors.border }}>
            <View>
              <Text className="text-xs font-semibold text-foreground mb-1">
                Recommended Path
              </Text>
              <Text className="text-sm text-muted">
                {item.recommendedPath}
              </Text>
            </View>

            <View>
              <Text className="text-xs font-semibold text-foreground mb-1">
                Benefits
              </Text>
              <Text className="text-sm text-muted">
                {item.benefit}
              </Text>
            </View>

            <View>
              <Text className="text-xs font-semibold text-foreground mb-1">
                Risks
              </Text>
              <Text className="text-sm text-muted">
                {item.risk}
              </Text>
            </View>

            <View className="flex-row gap-2 pt-2">
              <Pressable
                style={({ pressed }) => [
                  {
                    flex: 1,
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                    backgroundColor: colors.primary,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <Text className="text-sm font-semibold text-background text-center">
                  View Results
                </Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  {
                    flex: 1,
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderWidth: 1,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <Text className="text-sm font-semibold text-foreground text-center">
                  Customize
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <ScreenContainer className="p-0">
      <View className="flex-1">
        {/* Header */}
        <View className="px-6 pt-4 pb-4">
          <Text className="text-3xl font-bold text-foreground mb-2">
            Simulations
          </Text>
          <Text className="text-sm text-muted">
            Preview outcomes before decisions spread damage
          </Text>
        </View>

        {/* Scenario Library */}
        <FlatList
          data={MOCK_SCENARIOS}
          renderItem={renderScenarioCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
          scrollEnabled={true}
        />
      </View>
    </ScreenContainer>
  );
}
