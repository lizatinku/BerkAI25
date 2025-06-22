import { View, Text, StyleSheet } from "react-native";

export default function PhishingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email Phishing Detection</Text>
      {/* Add your input + detection UI here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: '600' },
});
