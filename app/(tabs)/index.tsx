import { ScrollView, Text, View, Pressable, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as React from "react";

interface BriefingCard {
  id: string;
  title: string;
  location: string;
  severity: "Stable" | "Watch" | "Elevated" | "Critical";
  description: string;
  linkedMission?: string;
}

const MOCK_BRIEFING: BriefingCard[] = [
  {
    id: "1",
    title: "Flood pressure rising in Nairobi basin",
    location: "Nairobi Basin",
    severity: "Critical",
    description: "Seasonal precipitation 40% above historical average",
    linkedMission: "Wetland Restoration",
  },
  {
    id: "2",
    title: "Food price stress in Rift Valley",
    location: "Rift Valley",
    severity: "Elevated",
    description: "Commodity prices rising faster than regional income",
    linkedMission: "Food Security Initiative",
  },
  {
    id: "3",
    title: "Grid instability probability increasing",
    location: "East Africa",
    severity: "Watch",
    description: "Peak demand approaching generation capacity",
    linkedMission: "Grid Stability Program",
  },
];

const getSeverityColor = (severity: BriefingCard["severity"], colors: any) => {
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

export default function HomeScreen() {
  const colors = useColors();

  const renderBriefingCard = ({ item }: { item: BriefingCard }) => {
    const severityColor = getSeverityColor(item.severity, colors);

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
              {item.title}
            </Text>
            <Text className="text-sm text-muted">
              {item.location}
            </Text>
          </View>
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: severityColor + "20" }}
          >
            <Text
              className="text-xs font-semibold"
              style={{ color: severityColor }}
            >
              {item.severity}
            </Text>
          </View>
        </View>

        <Text className="text-sm text-muted mb-4">
          {item.description}
        </Text>

        {item.linkedMission && (
          <View className="mb-4 p-3 rounded-lg" style={{ backgroundColor: colors.primary + "10" }}>
            <Text className="text-xs text-muted mb-1">Linked Mission</Text>
            <Text className="text-sm font-semibold text-foreground">
              {item.linkedMission}
            </Text>
          </View>
        )}

        <View className="flex-row gap-2 pt-3 border-t" style={{ borderTopColor: colors.border }}>
          <Pressable
            style={({ pressed }) => [
              {
                flex: 1,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 6,
                backgroundColor: colors.primary + "20",
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text className="text-xs font-semibold text-center" style={{ color: colors.primary }}>
              Review
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                flex: 1,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 6,
                backgroundColor: colors.warning + "20",
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text className="text-xs font-semibold text-center" style={{ color: colors.warning }}>
              Escalate
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                flex: 1,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 6,
                backgroundColor: colors.primary,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text className="text-xs font-semibold text-center text-background">
              Simulate
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
            Atlas
          </Text>
          <Text className="text-sm text-muted">
            Planetary Intelligence Briefing
          </Text>
        </View>

        {/* Planetary Status Banner */}
        <View className="mx-6 mb-4 p-4 rounded-lg" style={{ backgroundColor: colors.primary }}>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xs text-background opacity-80 mb-1">
                GLOBAL STATUS
              </Text>
              <Text className="text-2xl font-bold text-background">
                ELEVATED
              </Text>
            </View>
            <View className="items-center">
              <View
                className="w-16 h-16 rounded-full items-center justify-center"
                style={{ backgroundColor: colors.background + "20" }}
              >
                <IconSymbol name="exclamationmark.triangle.fill" size={32} color={colors.background} />
              </View>
            </View>
          </View>
          <Text className="text-xs text-background opacity-80 mt-2">
            3 critical signals, 7 at-risk missions
          </Text>
        </View>

        {/* Briefing Cards */}
        <FlatList
          data={MOCK_BRIEFING}
          renderItem={renderBriefingCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
          scrollEnabled={true}
        />
      </View>
    </ScreenContainer>
  );
}
