import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#3B82F6", // Tailwind blue-500
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="phishing"
        options={{
          title: "Detect Email",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="mail-open-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="scam-call"
        options={{
          title: "Detect Call",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="call-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="scam-widget"
        options={{
          title: "Playback",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="volume-high-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="post-call"
        options={{
          title: "Report",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
