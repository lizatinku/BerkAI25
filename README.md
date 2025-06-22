# 📱 PhishFilter

**PhishFilter** is an AI-powered mobile application designed to protect users from two of the most common social engineering attack vectors: **scam calls** and **phishing emails**, with a focus on job scams targeting students and job seekers.

---

## 💫 Inspiration

Over 70% of college students actively seek jobs and internships, but nearly 1 in 3 fall for phishing emails. In the U.S., over 68 million people receive scam calls every month, resulting in billions lost to fraud annually.

Our team experienced this firsthand—one teammate was tricked into sharing their resume and phone number in a fake job offer, and another’s mother lost money to a scam call. These personal incidents were wake-up calls that inspired us to build **PhishFilter**: a mobile app that not only detects threats in real time but also **educates users** to stay safe.

---

## 🧠 What It Does

### 📞 Real-time Scam Call Detection
- Uses **Vapi** to analyze live call audio.
- Detects scam patterns mid-call and alerts users in real time.
- Gives a post-call risk summary.

### 📧 Email Phishing Detection
- Users upload or screenshot suspicious emails.
- Uses **Claude Sonnet 3.7** with OCR to find phishing signs (urgency, fake senders, etc.).
- Flags risky emails and explains why.

Includes a **Learning Hub** to help users stay informed and safe.

---

## 🛠️ Tech Stack

- **Frontend:** React Native, Tailwind CSS
- **Backend:** FastAPI (Claude API), Firebase / Supabase
- **AI Tools:** Claude Sonnet 3.7 (OCR + phishing detection), Vapi (call audio analysis)

---

## 🧩 Challenges

- Claude OCR processing delays due to prompt chaining issues.
- UI design needed several iterations for clear real-time feedback.
- Learned to fine-tune prompt usage for more accurate results.

---

## ✅ Next Steps

- Launch on iOS & Android.
- Add interactive learning simulations.
- Support text message & social media scam detection.
- Partner with schools and career centers.

---

## 🔧 Built With

- [Claude Supa 3.7](https://www.anthropic.com/)
- [Vapi](https://www.vapi.ai/)
- [React Native](https://reactnative.dev/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Firebase](https://firebase.google.com/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📄 License

MIT
