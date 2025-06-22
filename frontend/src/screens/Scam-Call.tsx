import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

type ChatMessage = {
  role: 'user' | 'bot';
  content: string;
};
const mockChatLog: ChatMessage[] = [];

export default function ScamCall() {
  const navigation = useNavigation();
  const [chatLog, setChatLog] = useState(mockChatLog);

    const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Change to your ngrok or backend ws URL!
    ws.current = new WebSocket("wss://220b-2607-f140-400-36-a5ac-e3ab-5b36-c973.ngrok-free.app/ws");

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // If your backend sends single messages, push as new
        setChatLog((prev) => [...prev, data]);
        // If your backend sends array of messages, you can:
        // setChatLog(data);
      } catch (e) {
        console.log("Invalid message:", event.data);
      }
    };

    ws.current.onerror = (err) => {
      console.log("WebSocket error:", err);
    };

    ws.current.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#6b4c42" />
        </TouchableOpacity>
        <Text style={styles.heading}>Live Call Safety Chat</Text>

        <View style={styles.box}>
          <FlatList
            data={chatLog}
            keyExtractor={(_, idx) => idx.toString()}
            style={styles.chatList}
            contentContainerStyle={{ paddingVertical: 8 }}
            renderItem={({ item }) => (
              <View style={[
                styles.bubble,
                item.role === 'user' ? styles.userBubble : styles.aiBubble
              ]}>
                <Text style={styles.bubbleText}>{item.content}</Text>
              </View>
            )}
          />
        </View>

        <View style={styles.tipsBox}>
          <Text style={styles.tipHeading}>Quick Safety Tips</Text>
          <Text style={styles.tip}>• Never give personal information to unsolicited callers</Text>
          <Text style={styles.tip}>• Government agencies don't threaten immediate arrest</Text>
          <Text style={styles.tip}>• Hang up and call the official number directly</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb', padding: 16 },
  heading: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#6b4c42', marginBottom: 10 },
  box: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flex: 1,
  },
  chatList: {
    flex: 1,
    marginBottom: 10,
  },
  bubble: {
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: '80%',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fee2e2',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#a5b4fc',
  },
  bubbleText: {
    fontSize: 14,
    color: '#1f2937',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 4,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: '#1f2937',
  },
  sendBtn: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    padding: 8,
    marginLeft: 4,
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
