import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';

export default function PhishingScreen() {
//   const [imageUri, setImageUri] = useState(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'result'>('idle');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setStatus('analyzing');

      // Simulate analysis delay
      setTimeout(() => {
        setStatus('result');
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email Phishing Detection</Text>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="email" size={22} color="#A855F7" />
          <Text style={styles.cardTitle}>  Analyze Email Content</Text>
        </View>

        <TouchableOpacity style={styles.dropBox} onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Text style={{ color: '#555' }}>Tap to upload an image</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, status !== 'idle' && styles.disabledButton]}
          disabled={status !== 'idle'}
          onPress={() => setStatus('analyzing')}
        >
          <Text style={styles.buttonText}>
            {status === 'analyzing' ? 'Analyzing...' : 'Analyze Email'}
          </Text>
        </TouchableOpacity>
      </View>

      {status === 'analyzing' && (
        <View style={styles.analyzingCard}>
          <ActivityIndicator size="large" color="#A855F7" />
          <Text style={styles.subhead}>Analyzing Email</Text>
          <Text style={styles.lightText}>
            Checking for phishing patterns and suspicious content...
          </Text>
        </View>
      )}

      {status === 'result' && (
        <>
          <View style={styles.alertCard}>
            <Entypo name="warning" size={20} color="#991B1B" />
            <Text style={styles.alertTitle}> PHISHING DETECTED</Text>
            <Text style={styles.boldText}>Confidence:</Text>
            <Text style={styles.redText}>94%</Text>
            <Text style={styles.boldText}>Type:</Text>
            <Text style={styles.redText}>Banking Phishing</Text>
            <Text style={styles.normalText}>
              This email impersonates a bank and contains suspicious links designed to steal login credentials.
            </Text>
          </View>

          <View style={styles.audioRow}>
            <Text style={styles.subhead}>Audio Explanation:</Text>
            <View style={styles.audioBtns}>
              <TouchableOpacity><Ionicons name="volume-high" size={20} color="#A855F7" /></TouchableOpacity>
              <Text style={styles.audioLabel}>Phisher Tactics</Text>
              <TouchableOpacity><Ionicons name="volume-high" size={20} color="#A855F7" /></TouchableOpacity>
              <Text style={styles.audioLabel}>Calm Explanation</Text>
            </View>
          </View>

          <View style={styles.flagBox}>
            <Text style={styles.sectionHeader}>Red Flags Identified:</Text>
            <Text style={styles.flagText}>- Urgent language creating false urgency</Text>
            <Text style={styles.flagText}>- Suspicious link that doesn't match the claimed sender</Text>
            <Text style={styles.flagText}>- Generic greeting instead of personal information</Text>
            <Text style={styles.flagText}>- Threats of account suspension</Text>
          </View>
        </>
      )}

      <View style={styles.checklistBox}>
        <Text style={styles.sectionHeader}>Email Safety Checklist</Text>
        <Text style={styles.bullet}>- Check the sender's email address carefully</Text>
        <Text style={styles.bullet}>- Hover over links to see the real destination</Text>
        <Text style={styles.bullet}>- Be wary of urgent or threatening language</Text>
        <Text style={styles.bullet}>- Contact companies directly through official channels</Text>
      </View>

      <TouchableOpacity style={styles.reanalyzeBtn} onPress={() => {
        setImageUri(null);
        setStatus('idle');
      }}>
        <Text style={styles.subhead}>Analyze Another Email</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#6B3F3F', marginVertical: 10 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 16, marginVertical: 8 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#6B3F3F' },
  dropBox: { marginVertical: 10, borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 40, alignItems: 'center' },
  image: { width: '100%', height: 200, resizeMode: 'contain' },
  button: { backgroundColor: '#A5B4FC', padding: 12, borderRadius: 12, marginTop: 12 },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  disabledButton: { opacity: 0.5 },
  subhead: { fontSize: 16, fontWeight: '600', color: '#6B3F3F', marginTop: 20, textAlign: 'center' },
  lightText: { textAlign: 'center', color: '#6B7280', fontSize: 14 },
  analyzingCard: { backgroundColor: '#fff', padding: 20, borderRadius: 16, alignItems: 'center', marginVertical: 10 },
  alertCard: { backgroundColor: '#FEE2E2', padding: 16, borderRadius: 12, marginTop: 16 },
  alertTitle: { color: '#991B1B', fontWeight: 'bold', fontSize: 16, marginVertical: 6 },
  boldText: { fontWeight: 'bold', marginTop: 6 },
  redText: { color: '#991B1B' },
  normalText: { marginTop: 8, color: '#1F2937' },
  audioRow: { marginTop: 20, alignItems: 'center' },
  audioBtns: { flexDirection: 'row', gap: 12, marginTop: 8 },
  audioLabel: { fontSize: 12, color: '#6B3F3F', marginHorizontal: 4 },
  flagBox: { backgroundColor: '#FEF3C7', borderRadius: 12, padding: 16, marginVertical: 10 },
  sectionHeader: { fontWeight: 'bold', fontSize: 16, color: '#111827' },
  flagText: { marginTop: 4, color: '#92400E' },
  checklistBox: { backgroundColor: '#EFF6FF', padding: 16, borderRadius: 12, borderColor: '#93C5FD', borderWidth: 1 },
  bullet: { color: '#1D4ED8', marginTop: 4 },
  reanalyzeBtn: { marginTop: 20, alignSelf: 'center' },
});
