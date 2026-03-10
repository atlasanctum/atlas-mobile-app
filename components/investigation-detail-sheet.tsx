import { ScrollView, Text, View, Pressable, FlatList } from "react-native";
import { BottomSheet } from "@/components/bottom-sheet";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as React from "react";

interface Evidence {
  id: string;
  type: "signal" | "document" | "interview" | "data";
  title: string;
  description: string;
  confidence: "Low" | "Medium" | "High";
}

interface InvestigationDetailSheetProps {
  isVisible: boolean;
  onClose: () => void;
  investigation: {
    id: string;
    title: string;
    hypothesis: string;
    urgency: "Low" | "Medium" | "High" | "Critical";
    status: "Open" | "In Progress" | "Awaiting Decision" | "Closed";
    linkedSignals: number;
    taskOwners: number;
  };
}

const getUrgencyColor = (urgency: string, colors: any) => {
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

const getStatusColor = (status: string, colors: any) => {
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

const getEvidenceIcon = (type: Evidence["type"]) => {
  switch (type) {
    case "signal":
      return "bell.fill";
    case "document":
      return "paperplane.fill";
    case "interview":
      return "person.2.fill";
    case "data":
      return "waveform.path.ecg";
  }
};

const MOCK_EVIDENCE: Evidence[] = [
  {
    id: "1",
    type: "signal",
    title: "Water stress anomaly signal",
    description: "Detected 2 hours ago in Northern Kenya region",
    confidence: "High",
  },
  {
    id: "2",
    type: "data",
    title: "Rainfall telemetry data",
    description: "40% above historical average for the season",
    confidence: "Medium",
  },
  {
    id: "3",
    type: "interview",
    title: "Regional coordinator interview",
    description: "Confirmed transport strain and reservoir decline",
    confidence: "High",
  },
];

export function InvestigationDetailSheet({
  isVisible,
  onClose,
  investigation,
}: InvestigationDetailSheetProps) {
  const colors = useColors();
  const urgencyColor = getUrgencyColor(investigation.urgency, colors);
  const statusColor = getStatusColor(investigation.status, colors);

  const renderEvidence = ({ item }: { item: Evidence }) => (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: 12,
          padding: 12,
          marginBottom: 10,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View className="flex-row items-start gap-3">
        <View
          className="w-8 h-8 rounded-full items-center justify-center"
          style={{ backgroundColor: colors.primary + "20" }}
        >
          <IconSymbol name={getEvidenceIcon(item.type) as any} size={14} color={colors.primary} />
        </View>
        <View className="flex-1">
          <Text className="text-sm font-semibold text-foreground mb-1">
            {item.title}
          </Text>
          <Text className="text-xs text-muted mb-2">
            {item.description}
          </Text>
          <View className="flex-row items-center gap-2">
            <View
              className="px-2 py-1 rounded-full"
              style={{ backgroundColor: colors.primary + "10" }}
            >
              <Text className="text-xs font-semibold" style={{ color: colors.primary }}>
                {item.confidence}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      title="Investigation Details"
      height={0.9}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 16,
          paddingBottom: 32,
        }}
      >
        {/* Investigation Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-foreground mb-3">
            {investigation.title}
          </Text>
          <View className="flex-row gap-2 mb-3">
            <View
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: urgencyColor + "20" }}
            >
              <Text
                className="text-xs font-semibold"
                style={{ color: urgencyColor }}
              >
                {investigation.urgency}
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
                {investigation.status}
              </Text>
            </View>
          </View>
        </View>

        {/* Hypothesis */}
        <View className="mb-6 pb-6 border-b" style={{ borderBottomColor: colors.border }}>
          <Text className="text-sm font-semibold text-foreground mb-2">
            Working Hypothesis
          </Text>
          <View className="p-4 rounded-lg" style={{ backgroundColor: colors.primary + "10" }}>
            <Text className="text-sm text-foreground leading-relaxed">
              {investigation.hypothesis}
            </Text>
          </View>
        </View>

        {/* Resources */}
        <View className="mb-6 pb-6 border-b" style={{ borderBottomColor: colors.border }}>
          <Text className="text-sm font-semibold text-foreground mb-3">
            Resources
          </Text>
          <View className="flex-row gap-4">
            <View className="flex-1 p-3 rounded-lg" style={{ backgroundColor: colors.surface }}>
              <Text className="text-2xl font-bold text-foreground">
                {investigation.linkedSignals}
              </Text>
              <Text className="text-xs text-muted">Linked Signals</Text>
            </View>
            <View className="flex-1 p-3 rounded-lg" style={{ backgroundColor: colors.surface }}>
              <Text className="text-2xl font-bold text-foreground">
                {investigation.taskOwners}
              </Text>
              <Text className="text-xs text-muted">Task Owners</Text>
            </View>
          </View>
        </View>

        {/* Evidence */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-foreground mb-3">
            Evidence ({MOCK_EVIDENCE.length})
          </Text>
          <FlatList
            data={MOCK_EVIDENCE}
            renderItem={renderEvidence}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            nestedScrollEnabled={true}
          />
        </View>

        {/* Notes Section */}
        <View className="mb-6 pb-6 border-b" style={{ borderBottomColor: colors.border }}>
          <Text className="text-sm font-semibold text-foreground mb-3">
            Investigation Notes
          </Text>
          <View className="p-4 rounded-lg" style={{ backgroundColor: colors.surface }}>
            <Text className="text-sm text-muted leading-relaxed">
              Regional team confirmed transport strain and reservoir decline. Rainfall telemetry shows 40% above historical average. Recommend cross-checking with satellite imagery for validation.
            </Text>
          </View>
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
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text className="text-sm font-semibold text-center text-foreground">
              Add Note
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
