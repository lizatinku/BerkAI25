import { View, Text, StyleSheet } from "react-native";

export default function ScamWidgetScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scam Call Playback Widget</Text>
      {/* Add Vapi playback UI or call simulation here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: '600' },
});
