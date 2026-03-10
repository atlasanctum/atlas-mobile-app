import { View, Text, Pressable, Modal, Dimensions } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as React from "react";

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  height?: number;
}

export function BottomSheet({
  isVisible,
  onClose,
  title,
  children,
  height = 0.75,
}: BottomSheetProps) {
  const colors = useColors();
  const screenHeight = Dimensions.get("window").height;
  const sheetHeight = screenHeight * height;

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        onPress={onClose}
      />
      <View
        style={{
          height: sheetHeight,
          backgroundColor: colors.background,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        {/* Handle and Header */}
        <View
          className="items-center pt-3 pb-4 border-b"
          style={{ borderBottomColor: colors.border }}
        >
          {/* Drag Handle */}
          <View
            className="w-12 h-1 rounded-full mb-3"
            style={{ backgroundColor: colors.border }}
          />

          {/* Title and Close Button */}
          <View className="w-full flex-row items-center justify-between px-6">
            <Text className="text-xl font-bold text-foreground flex-1">
              {title}
            </Text>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                {
                  padding: 8,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <IconSymbol name="xmark.circle.fill" size={24} color={colors.muted} />
            </Pressable>
          </View>
        </View>

        {/* Content */}
        <View className="flex-1 overflow-hidden">
          {children}
        </View>
      </View>
    </Modal>
  );
}
