import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function ScamCall() {
  const navigation = useNavigation();
  const [status, setStatus] = useState<'ready' | 'analyzing' | 'detected'>('ready');

  useEffect(() => {
    if (status === 'analyzing') {
      const timer = setTimeout(() => {
        setStatus('detected');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={24} color="#6b4c42" />
      </TouchableOpacity>

      <Text style={styles.heading}>Scam Call Detection</Text>

      <View style={styles.box}>
        {status === 'ready' && (
          <>
            <Ionicons name="call-outline" size={48} color="#6b4c42" />
            <Text style={styles.statusText}>Ready to Analyze</Text>
            <Text style={styles.descText}>Tap the button below to start real-time analysis</Text>
            <TouchableOpacity
              onPress={() => setStatus('analyzing')}
              style={styles.actionBtn}
            >
              <Text style={styles.btnText}>Analyze Call</Text>
            </TouchableOpacity>
          </>
        )}

        {status === 'analyzing' && (
          <>
            <ActivityIndicator size="large" color="#6366f1" />
            <Text style={styles.statusText}>Analyzing Call...</Text>
            <Text style={styles.descText}>Please wait while we analyze the call patterns</Text>
            <TouchableOpacity disabled style={[styles.actionBtn, { opacity: 0.5 }]}>
              <Text style={styles.btnText}>Analyzing...</Text>
            </TouchableOpacity>
          </>
        )}

        {status === 'detected' && (
          <>
            <Ionicons name="alert-circle" size={48} color="#dc2626" />
            <Text style={[styles.statusText, { color: '#6b4c42' }]}>SCAM DETECTED</Text>
            <Text style={styles.descText}>This call shows signs of a known scam pattern</Text>

            <View style={styles.scamBox}>
              <Text style={styles.subheading}>Scam Type: IRS Tax Scam</Text>
              <Text style={[styles.descText, { textAlign: 'left' }]}>The caller is impersonating the IRS and requesting immediate payment. The IRS never calls demanding immediate payment or threatening arrest.</Text>
              <Text style={[styles.subheading, { marginTop: 10 }]}>Audio Playback:</Text>
              <View style={styles.audioRow}>
                <TouchableOpacity style={styles.audioBtn}>
                  <Ionicons name="volume-high" size={20} />
                  <Text> Scammer Voice</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.audioBtn}>
                  <Ionicons name="volume-high" size={20} />
                  <Text> Calm Explanation</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.reportBtn}>
              <Text style={styles.btnText}>View Detailed Report</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, { marginTop: 8, backgroundColor: '#f3f4f6' }]}
              onPress={() => setStatus('ready')}
            >
              <Text style={[styles.btnText, { color: '#6b4c42' }]}>Analyze Another Call</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.tipsBox}>
        <Text style={styles.tipHeading}>Quick Safety Tips</Text>
        <Text style={styles.tip}>• Never give personal information to unsolicited callers</Text>
        <Text style={styles.tip}>• Government agencies don't threaten immediate arrest</Text>
        <Text style={styles.tip}>• Hang up and call the official number directly</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb', padding: 16 },
  heading: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#6b4c42', marginBottom: 10 },
  box: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  statusText: { fontSize: 16, fontWeight: 'bold', marginTop: 12 },
  descText: { fontSize: 13, textAlign: 'center', color: '#4b5563', marginVertical: 8 },
  actionBtn: {
    backgroundColor: '#a5b4fc',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  reportBtn: {
    backgroundColor: '#6366f1',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 14,
  },
  btnText: { fontWeight: 'bold', textAlign: 'center', color: 'white' },
  scamBox: {
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 10,
    marginVertical: 12,
    width: '100%',
  },
  subheading: { fontWeight: 'bold', marginBottom: 4, color: '#6b4c42' },
  audioRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 8 },
  audioBtn: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  tipsBox: {
    backgroundColor: '#e0f2fe',
    borderRadius: 10,
    padding: 12,
  },
  tipHeading: { fontWeight: 'bold', color: '#1d4ed8', marginBottom: 6 },
  tip: { color: '#1e3a8a', fontSize: 12, marginBottom: 4 },
  backBtn: { position: 'absolute', top: 16, left: 16, zIndex: 10 },
});
