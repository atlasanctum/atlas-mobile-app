import { View, Text, Pressable, Dimensions } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as React from "react";

interface MapSignal {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
  severity: "Stable" | "Watch" | "Elevated" | "Critical";
  category: string;
}

interface SignalMapProps {
  signals: MapSignal[];
  onSignalTap: (signal: MapSignal) => void;
  selectedCategory?: string;
}

const getSeverityColor = (severity: MapSignal["severity"], colors: any) => {
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

const normalizeCoordinate = (value: number, min: number, max: number, screenSize: number) => {
  return ((value - min) / (max - min)) * screenSize;
};

export function SignalMap({
  signals,
  onSignalTap,
  selectedCategory,
}: SignalMapProps) {
  const colors = useColors();
  const screenWidth = Dimensions.get("window").width;
  const mapHeight = 300;

  // Mock bounds for visualization
  const latMin = -10, latMax = 10;
  const lonMin = 30, lonMax = 50;

  const filteredSignals = selectedCategory && selectedCategory !== "All"
    ? signals.filter((s) => s.category === selectedCategory)
    : signals;

  return (
    <View className="mb-6 rounded-lg overflow-hidden border" style={{ borderColor: colors.border }}>
      {/* Map Container */}
      <View
        style={{
          width: screenWidth - 48,
          height: mapHeight,
          backgroundColor: colors.surface,
          position: "relative",
        }}
      >
        {/* Grid Background */}
        <View className="absolute inset-0 opacity-20">
          {Array.from({ length: 4 }).map((_, i) => (
            <View
              key={`h-${i}`}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: colors.border,
                top: `${(i + 1) * 20}%`,
              }}
            />
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <View
              key={`v-${i}`}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: 1,
                backgroundColor: colors.border,
                left: `${(i + 1) * 20}%`,
              }}
            />
          ))}
        </View>

        {/* Signal Markers */}
        {filteredSignals.map((signal) => {
          const x = normalizeCoordinate(signal.longitude, lonMin, lonMax, screenWidth - 48);
          const y = normalizeCoordinate(signal.latitude, latMin, latMax, mapHeight);
          const color = getSeverityColor(signal.severity, colors);

          return (
            <Pressable
              key={signal.id}
              onPress={() => onSignalTap(signal)}
              style={{
                position: "absolute",
                left: x - 16,
                top: y - 16,
              }}
            >
              {/* Outer Ring (Pulse) */}
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: color + "20",
                  position: "absolute",
                  inset: 0,
                }}
              />

              {/* Marker */}
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: color,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: colors.background,
                }}
              >
                <IconSymbol name="bell.fill" size={14} color={colors.background} />
              </View>

              {/* Tooltip on Hover (visible on press) */}
              <View
                style={{
                  position: "absolute",
                  bottom: 40,
                  left: -50,
                  backgroundColor: colors.foreground,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 4,
                  minWidth: 120,
                  zIndex: 10,
                }}
              >
                <Text
                  className="text-xs font-semibold"
                  style={{ color: colors.background }}
                  numberOfLines={2}
                >
                  {signal.title}
                </Text>
              </View>
            </Pressable>
          );
        })}

        {/* Coordinates Labels */}
        <View
          className="absolute bottom-2 left-2 text-xs"
          style={{ backgroundColor: colors.surface }}
        >
          <Text className="text-xs text-muted">
            {latMin}°S - {latMax}°S
          </Text>
        </View>
        <View
          className="absolute bottom-2 right-2 text-xs"
          style={{ backgroundColor: colors.surface }}
        >
          <Text className="text-xs text-muted">
            {lonMin}°E - {lonMax}°E
          </Text>
        </View>
      </View>

      {/* Legend */}
      <View className="p-3 border-t flex-row items-center gap-4" style={{ borderTopColor: colors.border }}>
        {[
          { label: "Stable", color: colors.success },
          { label: "Watch", color: colors.warning },
          { label: "Elevated", color: "#FF6B35" },
          { label: "Critical", color: colors.error },
        ].map((item) => (
          <View key={item.label} className="flex-row items-center gap-2">
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: item.color,
              }}
            />
            <Text className="text-xs text-muted">{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Info */}
      <View className="p-3 border-t bg-primary/5 flex-row items-center gap-2" style={{ borderTopColor: colors.border, backgroundColor: colors.primary + "10" }}>
        <IconSymbol name="info.circle.fill" size={14} color={colors.primary} />
        <Text className="text-xs text-muted flex-1">
          {filteredSignals.length} signal{filteredSignals.length !== 1 ? "s" : ""} in view
        </Text>
      </View>
    </View>
  );
}
