import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "My Blog Posts",
            headerStyle: { backgroundColor: "#f8f9fa" },
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="Post/[id]"
          options={{
            title: "Edit Post",
            headerStyle: { backgroundColor: "#f8f9fa" },
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
      </Stack>
    </>
  );
}
