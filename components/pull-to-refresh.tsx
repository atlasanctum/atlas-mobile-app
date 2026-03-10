import { ScrollView, RefreshControl, View } from "react-native";
import { useColors } from "@/hooks/use-colors";
import * as React from "react";

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  scrollEnabled?: boolean;
}

export function PullToRefresh({
  onRefresh,
  children,
  scrollEnabled = true,
}: PullToRefreshProps) {
  const colors = useColors();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <ScrollView
      scrollEnabled={scrollEnabled}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          tintColor={colors.primary}
          progressBackgroundColor={colors.surface}
          colors={[colors.primary]}
        />
      }
    >
      {children}
    </ScrollView>
  );
}
