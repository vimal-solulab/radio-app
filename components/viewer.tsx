import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

export type ViewerProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function Viewer({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ViewerProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
