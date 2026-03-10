import { View, Text, Pressable, Animated } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as React from "react";

interface Signal {
  id: string;
  title: string;
  location: string;
  severity: "Stable" | "Watch" | "Elevated" | "Critical";
  confidence: "Low" | "Medium" | "High";
  timeDetected: string;
  description: string;
}

interface SwipeableSignalCardProps {
  signal: Signal;
  onTap: (signal: Signal) => void;
  onSwipeRight: (signal: Signal) => void; // Attach to mission
  onSwipeLeft: (signal: Signal) => void; // Archive
  onLongPress: (signal: Signal) => void; // Compare with baseline
}

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

export function SwipeableSignalCard({
  signal,
  onTap,
  onSwipeRight,
  onSwipeLeft,
  onLongPress,
}: SwipeableSignalCardProps) {
  const colors = useColors();
  const severityColor = getSeverityColor(signal.severity, colors);
  const translateX = useSharedValue(0);
  const [isPressed, setIsPressed] = React.useState(false);

  // Swipe right gesture (attach to mission)
  const swipeRightGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX > 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd((event) => {
      if (event.translationX > 80) {
        runOnJS(onSwipeRight)(signal);
        translateX.value = withSpring(300);
        setTimeout(() => {
          translateX.value = 0;
        }, 300);
      } else {
        translateX.value = withSpring(0);
      }
    });

  // Swipe left gesture (archive)
  const swipeLeftGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd((event) => {
      if (event.translationX < -80) {
        runOnJS(onSwipeLeft)(signal);
        translateX.value = withSpring(-300);
        setTimeout(() => {
          translateX.value = 0;
        }, 300);
      } else {
        translateX.value = withSpring(0);
      }
    });

  // Long press gesture (compare with baseline)
  const longPressGesture = Gesture.LongPress()
    .minDuration(500)
    .onStart(() => {
      runOnJS(onLongPress)(signal);
    });

  const combinedGesture = Gesture.Simultaneous(
    swipeRightGesture,
    swipeLeftGesture,
    longPressGesture
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <GestureDetector gesture={combinedGesture}>
      <Reanimated.View style={animatedStyle}>
        <Pressable
          onPress={() => onTap(signal)}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          style={({ pressed }) => [
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              opacity: pressed || isPressed ? 0.7 : 1,
            },
          ]}
        >
          <View className="flex-row items-start justify-between mb-3">
            <View className="flex-1">
              <Text className="text-lg font-semibold text-foreground mb-1">
                {signal.title}
              </Text>
              <Text className="text-sm text-muted">
                {signal.location}
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
                {signal.severity}
              </Text>
            </View>
          </View>

          <Text className="text-sm text-muted mb-3">
            {signal.description}
          </Text>

          <View className="flex-row items-center justify-between pt-3 border-t" style={{ borderTopColor: colors.border }}>
            <View className="flex-row gap-4">
              <View className="flex-row items-center gap-1">
                <Text className="text-xs text-muted">Confidence:</Text>
                <Text className="text-xs font-semibold text-foreground">
                  {signal.confidence}
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Text className="text-xs text-muted">
                  {signal.timeDetected}
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

          {/* Gesture Hints */}
          <View className="mt-3 pt-3 border-t flex-row items-center justify-between" style={{ borderTopColor: colors.border }}>
            <Text className="text-xs text-muted">
              ← Swipe left to archive
            </Text>
            <Text className="text-xs text-muted">
              Swipe right to attach →
            </Text>
          </View>
        </Pressable>
      </Reanimated.View>
    </GestureDetector>
  );
}
