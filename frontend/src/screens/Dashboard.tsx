// src/screens/Dashboard.tsx

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>🛡️ PhishFilter</Text>
        <Text style={styles.tagline}>Stay protected from scams and phishing attacks</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBoxGreen}>
          <Text style={styles.statNumber}>247</Text>
          <Text style={styles.statLabel}>Scams Blocked</Text>
        </View>
        <View style={styles.statBoxBlue}>
          <Text style={styles.statNumber}>98%</Text>
          <Text style={styles.statLabel}>Accuracy Rate</Text>
        </View>
      </View>

      {/* Tools */}
      <Text style={styles.sectionTitle}>Protection Tools</Text>
      <View style={styles.card}>
        <Ionicons name="call-outline" size={24} color="#2563eb" style={styles.cardIcon} />
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>Detect Scam Call</Text>
          <Text style={styles.cardSubtitle}>Real-time call analysis and scam detection</Text>
        </View>
        <Ionicons name="arrow-forward-circle" size={24} color="#2563eb" />
      </View>

      <View style={styles.card}>
        <Ionicons name="mail-outline" size={24} color="#8b5cf6" style={styles.cardIcon} />
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>Detect Phishing Email</Text>
          <Text style={styles.cardSubtitle}>Analyze emails for phishing attempts and threats</Text>
        </View>
        <Ionicons name="arrow-forward-circle" size={24} color="#8b5cf6" />
      </View>

      {/* Widget */}
      <View style={styles.widgetBox}>
        <Text style={styles.widgetTitle}>Control Center Widget</Text>
        <Text style={styles.widgetSubtitle}>Add PhishFilter to your Control Center for instant call protection</Text>
        <TouchableOpacity style={styles.widgetButton}>
          <Text style={styles.widgetButtonText}>View Widget</Text>
        </TouchableOpacity>
      </View>

      {/* Activity */}
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <View style={styles.activityCard}>
        <Ionicons name="call" size={20} color="#dc2626" />
        <View style={{ flex: 1 }}>
          <Text style={[styles.activityTitle, { color: '#b91c1c' }]}>Scam Detected</Text>
          <Text style={styles.activitySubtitle}>2 minutes ago</Text>
        </View>
        <View style={styles.badgeRed}>
          <Text style={styles.badgeText}>IRS Scam</Text>
        </View>
      </View>

      <View style={styles.activityCard}>
        <Ionicons name="mail" size={20} color="#059669" />
        <View style={{ flex: 1 }}>
          <Text style={[styles.activityTitle, { color: '#065f46' }]}>Email Safe</Text>
          <Text style={styles.activitySubtitle}>1 hour ago</Text>
        </View>
        <View style={styles.badgeGreen}>
          <Text style={styles.badgeText}>Verified</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb', padding: 16 },
  header: {
    backgroundColor: '#2563eb',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  logo: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  tagline: { color: 'white', fontSize: 12, marginTop: 4 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  statBoxGreen: {
    backgroundColor: '#d1fae5',
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  statBoxBlue: {
    backgroundColor: '#dbeafe',
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginLeft: 8,
    alignItems: 'center',
  },
  statNumber: { fontSize: 20, fontWeight: 'bold' },
  statLabel: { fontSize: 12, color: '#4b5563', marginTop: 4 },
  sectionTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: { marginRight: 12 },
  cardText: { flex: 1 },
  cardTitle: { fontWeight: 'bold', fontSize: 14 },
  cardSubtitle: { fontSize: 12, color: '#6b7280' },
  widgetBox: {
    backgroundColor: '#eef2ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  widgetTitle: { fontWeight: 'bold', fontSize: 14, marginBottom: 4 },
  widgetSubtitle: { fontSize: 12, color: '#4b5563', marginBottom: 12 },
  widgetButton: {
    backgroundColor: '#a5b4fc',
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  widgetButtonText: { color: 'white', fontWeight: 'bold' },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  activityTitle: { fontWeight: 'bold', fontSize: 14 },
  activitySubtitle: { fontSize: 11, color: '#6b7280' },
  badgeRed: {
    backgroundColor: '#fecaca',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeGreen: {
    backgroundColor: '#d1fae5',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111',
  },
});
