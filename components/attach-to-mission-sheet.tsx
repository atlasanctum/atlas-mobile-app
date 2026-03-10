import { ScrollView, Text, View, Pressable, FlatList } from "react-native";
import { BottomSheet } from "@/components/bottom-sheet";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as React from "react";

interface Mission {
  id: string;
  name: string;
  region: string;
  status: "On Track" | "At Risk" | "Critical";
  linkedSignals: number;
}

interface AttachToMissionSheetProps {
  isVisible: boolean;
  onClose: () => void;
  signalTitle: string;
  missions: Mission[];
  onSelectMission: (missionId: string) => void;
}

const getStatusColor = (status: Mission["status"], colors: any) => {
  switch (status) {
    case "On Track":
      return colors.success;
    case "At Risk":
      return colors.warning;
    case "Critical":
      return colors.error;
  }
};

export function AttachToMissionSheet({
  isVisible,
  onClose,
  signalTitle,
  missions,
  onSelectMission,
}: AttachToMissionSheetProps) {
  const colors = useColors();
  const [selectedMissionId, setSelectedMissionId] = React.useState<string | null>(null);

  const handleAttach = () => {
    if (selectedMissionId) {
      onSelectMission(selectedMissionId);
      onClose();
    }
  };

  const renderMissionOption = ({ item }: { item: Mission }) => {
    const statusColor = getStatusColor(item.status, colors);
    const isSelected = selectedMissionId === item.id;

    return (
      <Pressable
        onPress={() => setSelectedMissionId(item.id)}
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
        <View className="flex-row items-start justify-between mb-2">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-foreground mb-1">
              {item.name}
            </Text>
            <Text className="text-sm text-muted">
              {item.region}
            </Text>
          </View>
          {isSelected && (
            <IconSymbol name="checkmark.circle.fill" size={24} color={colors.primary} />
          )}
        </View>

        <View className="flex-row items-center justify-between pt-3 border-t" style={{ borderTopColor: colors.border }}>
          <View className="flex-row items-center gap-2">
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
          <Text className="text-xs text-muted">
            {item.linkedSignals} signals linked
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      title="Attach to Mission"
      height={0.8}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 16,
          paddingBottom: 32,
        }}
      >
        {/* Signal Context */}
        <View className="mb-6 p-4 rounded-lg" style={{ backgroundColor: colors.primary + "10" }}>
          <Text className="text-xs font-semibold text-muted mb-1">
            ATTACHING SIGNAL
          </Text>
          <Text className="text-sm font-semibold text-foreground">
            {signalTitle}
          </Text>
        </View>

        {/* Mission List */}
        <Text className="text-sm font-semibold text-foreground mb-3">
          Select a Mission
        </Text>
        <FlatList
          data={missions}
          renderItem={renderMissionOption}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          nestedScrollEnabled={true}
        />

        {/* Action Buttons */}
        <View className="flex-row gap-3 mt-6">
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
            onPress={handleAttach}
            disabled={!selectedMissionId}
            style={({ pressed }) => [
              {
                flex: 1,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: selectedMissionId ? colors.primary : colors.muted,
                opacity: pressed && selectedMissionId ? 0.8 : selectedMissionId ? 1 : 0.5,
              },
            ]}
          >
            <Text className="text-sm font-semibold text-center text-background">
              Attach Signal
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </BottomSheet>
  );
}
