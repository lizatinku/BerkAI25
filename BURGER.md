Below is a reality-check on what you can do **without ever opening Xcode** and how “pure” you can stay inside JavaScript while still giving users a one-tap way to shoot a screenshot from *any* other app straight into your project.

## TL;DR — What “pure RN” really means here

* iOS will not let JavaScript alone draw UI on top of other apps or grab their pixels – sandbox rules stop you cold ([stackoverflow.com][1]).
* The closest you can get is to **piggy-back on system surfaces that *already* cross app boundaries** (Share Sheet, Siri Shortcuts, screenshot notifications).  These surfaces can be wired up almost entirely from JavaScript; a build system (Expo EAS or React Native CLI) generates the required native glue for you, so you never manually touch Xcode.
* The trade-off: a tiny native “extension” target still compiles under the hood, but config-plugin or autolinking code sets it up for you.

---

## 1  Share-Sheet Extension via Expo Config Plugin (≈ 99 % JS)

| What it gives you                                                                | “Pure” level                                        |
| -------------------------------------------------------------------------------- | --------------------------------------------------- |
| Shows **Your App** button in the iOS Share sheet of *any* app; tap → auto-upload | Write JS + JSON; Expo/EAS creates the native target |

**How it works**

1. Add the **expo-share-extension** config plugin ([github.com][2]) plus the generic App-Extension stanza in `app.json` ([docs.expo.dev][3]).
2. Run `eas build` – EAS’ cloud build generates the Share Extension target, Info.plist keys, and signing entitlements for you ([docs.expo.dev][3], [expo.dev][4]).
3. In JavaScript, register a component that receives the shared image and immediately `fetch`-uploads it. Example comes with the plugin.
4. User flow: Screenshot → long-press thumbnail → **Share … → Your App** → upload.

You never open Xcode, but a native target is created automatically at build time.

---

## 2  `react-native-share-menu` / `react-native-share-extension` (CLI, but still headless)

If you’re on bare React Native (not Expo) you can install either library - they autolink and add a template extension that you compile with `npx pod-install && npx react-native run-ios` – no hand edits in Xcode ([github.com][5], [github.com][6]).
Everything the user sees and all network logic live in JS.

---

## 3  Screenshot-Detection Hook (no extension, just listen)

iOS fires a notification when *any* screenshot is taken. Libraries such as **`react-native-screenshot-detector`** raise that event to JS ([github.com][7]).
Limitations:

* You still can’t read the bitmap – Apple only tells you *that* a screenshot happened ([stackoverflow.com][1]).
* So you must prompt the user (“Tap here to share the screenshot”) or open the Photos picker.

Still, if “one tap after the screenshot banner” is acceptable, this is 100 % JS and needs zero native targets.

---

## 4  Siri / Back-Tap Shortcut (no extension)

Using **`react-native-siri-shortcut`** you can let users add a voice or Back-Tap shortcut such as “Upload last screenshot” that launches your app with a deep-link and you upload via JS ([npmjs.com][8]).
No Share Sheet needed, but the user performs the screenshot gesture and then the shortcut trigger.

---

## 5  Why floating overlay buttons are off-limits

Any idea of a persistent button hovering over every app breaks sandbox rules; Apple rejects such APIs and they don’t exist for third-party developers ([stackoverflow.com][1]).

---

## 6  Which path is best for a hack-day?

| Option                         | Code you write | Native setup effort | User taps needed   | When to pick                      |
| ------------------------------ | -------------- | ------------------- | ------------------ | --------------------------------- |
| **Expo Share Extension**       | JS + app.json  | Auto                | 1 (Share Sheet)    | Already on Expo, want smooth CI   |
| **RN Share-Menu / -Extension** | JS             | `pod install` only  | 1                  | Bare RN project                   |
| **Screenshot detector**        | JS only        | None                | 1–2                | Accept banner tap, fastest        |
| **Siri Shortcut**              | JS only        | None                | 1 (voice/back-tap) | Voice-first flow or accessibility |

---

## 7  Next steps

1. **Pick Expo?** Add `expo-share-extension`, update `app.json`, push an EAS build; you’ll get a working Share button in under 30 min ([github.com][2], [docs.expo.dev][3]).
2. **Bare RN?** `npm i react-native-share-menu` and follow the README; autolinking plus `pod install` is all you need ([npmjs.com][9], [github.com][5]).
3. Want instant prototype? Wire `react-native-screenshot-detector` to fire an in-app modal with “Upload” that calls your existing REST endpoint ([github.com][7]).

None of these require you to open Xcode manually, yet they stay within Apple’s rules and give users a near-frictionless “screenshot → upload” experience for your Berkeley Hackathon project.

[1]: https://stackoverflow.com/questions/69377238/how-can-i-capture-screenshot-in-react-native-not-for-the-same-app?utm_source=chatgpt.com "How can I capture screenshot in react native not for the same app"
[2]: https://github.com/MaxAst/expo-share-extension?utm_source=chatgpt.com "GitHub - MaxAst/expo-share-extension: Expo config plugin for creating ..."
[3]: https://docs.expo.dev/build-reference/app-extensions/?utm_source=chatgpt.com "iOS App Extensions - Expo Documentation"
[4]: https://expo.dev/eas?utm_source=chatgpt.com "Expo Application Services (EAS)"
[5]: https://github.com/Expensify/react-native-share-menu?utm_source=chatgpt.com "GitHub - Expensify/react-native-share-menu: A module for React Native ..."
[6]: https://github.com/alinz/react-native-share-extension/blob/master/README.md?utm_source=chatgpt.com "react-native-share-extension/README.md at master - GitHub"
[7]: https://github.com/blend/react-native-screenshot-detector?utm_source=chatgpt.com "Screenshot detection in React Native (iOS only) - GitHub"
[8]: https://www.npmjs.com/package/react-native-siri-shortcut?utm_source=chatgpt.com "react-native-siri-shortcut - npm"
[9]: https://www.npmjs.com/package/react-native-share-menu?utm_source=chatgpt.com "react-native-share-menu - npm"
