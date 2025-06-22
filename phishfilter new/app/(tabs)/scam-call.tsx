import { View, Text, StyleSheet } from "react-native";

export default function ScamCallScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scam Call Detection</Text>
      {/* Add transcript input + detection result here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: '600' },
});
