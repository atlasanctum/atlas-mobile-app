import { View, Text, Pressable } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as React from "react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onDismiss?: () => void;
}

const getToastColor = (type: ToastType, colors: any) => {
  switch (type) {
    case "success":
      return { bg: colors.success + "20", text: colors.success, icon: "checkmark.circle.fill" };
    case "error":
      return { bg: colors.error + "20", text: colors.error, icon: "xmark.circle.fill" };
    case "warning":
      return { bg: colors.warning + "20", text: colors.warning, icon: "exclamationmark.triangle.fill" };
    case "info":
    default:
      return { bg: colors.primary + "20", text: colors.primary, icon: "info.circle.fill" };
  }
};

export function Toast({
  message,
  type = "info",
  duration = 3000,
  onDismiss,
}: ToastProps) {
  const colors = useColors();
  const { bg, text, icon } = getToastColor(type, colors);
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  if (!isVisible) return null;

  return (
    <View
      className="flex-row items-center gap-3 px-4 py-3 rounded-lg mx-4 mb-4"
      style={{ backgroundColor: bg }}
    >
      <IconSymbol name={icon as any} size={20} color={text} />
      <Text className="flex-1 text-sm font-semibold" style={{ color: text }}>
        {message}
      </Text>
      <Pressable
        onPress={() => {
          setIsVisible(false);
          onDismiss?.();
        }}
        style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
      >
        <IconSymbol name="xmark" size={16} color={text} />
      </Pressable>
    </View>
  );
}

/**
 * Toast Manager Hook
 * Use this to show toasts from anywhere in your app
 */
export function useToast() {
  const [toasts, setToasts] = React.useState<Array<ToastProps & { id: string }>>([]);

  const show = React.useCallback(
    (message: string, type: ToastType = "info", duration?: number) => {
      const id = Date.now().toString();
      setToasts((prev) => [...prev, { id, message, type, duration }]);
    },
    []
  );

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = React.useCallback(
    (message: string, duration?: number) => show(message, "success", duration),
    [show]
  );

  const error = React.useCallback(
    (message: string, duration?: number) => show(message, "error", duration),
    [show]
  );

  const warning = React.useCallback(
    (message: string, duration?: number) => show(message, "warning", duration),
    [show]
  );

  const info = React.useCallback(
    (message: string, duration?: number) => show(message, "info", duration),
    [show]
  );

  return {
    toasts,
    show,
    dismiss,
    success,
    error,
    warning,
    info,
  };
}
