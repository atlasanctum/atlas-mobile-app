import { ScrollView, Text, View, FlatList, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { SignalDetailSheet } from "@/components/signal-detail-sheet";
import { useColors } from "@/hooks/use-colors";
import * as React from "react";

interface Signal {
  id: string;
  title: string;
  location: string;
  category: "Climate" | "Health" | "Economy" | "Infrastructure" | "Governance" | "Social trust" | "Ecosystems";
  severity: "Stable" | "Watch" | "Elevated" | "Critical";
  confidence: "Low" | "Medium" | "High";
  timeDetected: string;
  description: string;
}

const MOCK_SIGNALS: Signal[] = [
  {
    id: "1",
    title: "Water stress anomaly",
    location: "Northern Kenya",
    category: "Climate",
    severity: "Critical",
    confidence: "High",
    timeDetected: "2 hours ago",
    description: "Rainfall shortfall + reservoir decline + transport strain",
  },
  {
    id: "2",
    title: "Flood pressure rising",
    location: "Nairobi basin",
    category: "Climate",
    severity: "Elevated",
    confidence: "Medium",
    timeDetected: "4 hours ago",
    description: "Seasonal precipitation above historical average",
  },
  {
    id: "3",
    title: "Food price stress",
    location: "Rift Valley",
    category: "Economy",
    severity: "Watch",
    confidence: "High",
    timeDetected: "6 hours ago",
    description: "Commodity prices rising faster than regional income",
  },
  {
    id: "4",
    title: "Grid instability probability",
    location: "East Africa",
    category: "Infrastructure",
    severity: "Elevated",
    confidence: "Medium",
    timeDetected: "1 hour ago",
    description: "Peak demand exceeding generation capacity",
  },
  {
    id: "5",
    title: "Community trust dropping",
    location: "South Sudan",
    category: "Social trust",
    severity: "Critical",
    confidence: "Medium",
    timeDetected: "3 hours ago",
    description: "Public confidence in institutions declining",
  },
];

const CATEGORIES = ["All", "Climate", "Health", "Economy", "Infrastructure", "Governance", "Social trust", "Ecosystems"];

const getSeverityColor = (severity: Signal["severity"], colors: any) => {
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

export default function SignalsScreen() {
  const colors = useColors();
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedSignal, setSelectedSignal] = React.useState<Signal | null>(null);

  const filteredSignals = selectedCategory === "All" 
    ? MOCK_SIGNALS 
    : MOCK_SIGNALS.filter(s => s.category === selectedCategory);

  const renderSignalCard = ({ item }: { item: Signal }) => {
    const severityColor = getSeverityColor(item.severity, colors);
    return (
      <Pressable
        onPress={() => setSelectedSignal(item)}
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
            <Text className="text-sm text-muted mb-2">
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

        <Text className="text-sm text-muted mb-3">
          {item.description}
        </Text>

        <View className="flex-row items-center justify-between pt-3 border-t" style={{ borderTopColor: colors.border }}>
          <View className="flex-row gap-4">
            <View className="flex-row items-center gap-1">
              <Text className="text-xs text-muted">Confidence:</Text>
              <Text className="text-xs font-semibold text-foreground">
                {item.confidence}
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Text className="text-xs text-muted">
                {item.timeDetected}
              </Text>
            </View>
          </View>
          <View className="flex-row gap-2">
            <Pressable
              style={({ pressed }) => [
                {
                  padding: 8,
                  borderRadius: 6,
                  backgroundColor: colors.primary + "20",
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <IconSymbol name="paperplane.fill" size={16} color={colors.primary} />
            </Pressable>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <ScreenContainer className="p-0">
      <View className="flex-1">
        {/* Header */}
        <View className="px-6 pt-4 pb-3">
          <Text className="text-3xl font-bold text-foreground mb-2">
            Signals
          </Text>
          <Text className="text-sm text-muted">
            Real-time civilizational alerts
          </Text>
        </View>

        {/* Filter Rail */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, gap: 8 }}
        >
          {CATEGORIES.map((category) => (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={({ pressed }) => [
                {
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor:
                    selectedCategory === category ? colors.primary : colors.surface,
                  borderColor: colors.border,
                  borderWidth: selectedCategory === category ? 0 : 1,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Text
                className="text-sm font-semibold"
                style={{
                  color:
                    selectedCategory === category ? colors.background : colors.foreground,
                }}
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Signal Feed */}
        <FlatList
          data={filteredSignals}
          renderItem={renderSignalCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
          scrollEnabled={true}
        />
      </View>
    </ScreenContainer>
  );

  return (
    <>
      <ScreenContainer className="p-0">
        <View className="flex-1">
          {/* Header */}
          <View className="px-6 pt-4 pb-3">
            <Text className="text-3xl font-bold text-foreground mb-2">
              Signals
            </Text>
            <Text className="text-sm text-muted">
              Real-time civilizational alerts
            </Text>
          </View>

          {/* Filter Rail */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, gap: 8 }}
          >
            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={({ pressed }) => [{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor:
                    selectedCategory === category ? colors.primary : colors.surface,
                  borderColor: colors.border,
                  borderWidth: selectedCategory === category ? 0 : 1,
                  opacity: pressed ? 0.7 : 1,
                }]}
              >
                <Text
                  className="text-sm font-semibold"
                  style={{
                    color:
                      selectedCategory === category ? colors.background : colors.foreground,
                  }}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Signal Feed */}
          <FlatList
            data={filteredSignals}
            renderItem={renderSignalCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
            scrollEnabled={true}
          />
        </View>
      </ScreenContainer>
      {selectedSignal && (
        <SignalDetailSheet
          isVisible={!!selectedSignal}
          onClose={() => setSelectedSignal(null)}
          signal={selectedSignal as Signal}
        />
      )}
    </>
  );
}
