import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import {
  createUserWithEmailAndPassword
} from "firebase/auth";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { authFirebase } from "../../firebaseConfig";
export default function HomeScreen() {
  WebBrowser.maybeCompleteAuthSession();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  // connectAuthEmulator(authFirebase, "exp://192.168.23.252:8081");
  const googleLogin = () => {
    console.table(userData);
    createUserWithEmailAndPassword(
      authFirebase,
      userData.username,
      userData.password
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user,'user');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  // useEffect(() => {
  //   return () => {};
  // }, []);

  // Endpoint
  const discovery = {
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
    revocationEndpoint: "https://oauth2.googleapis.com/revoke",
  };
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId:
        "571352175491-lf01kvh1rvjntt6f4s2hnpdjdsn0molu.apps.googleusercontent.com",
      scopes: [
        "https://www.googleapis.com/auth/drive.file", // Access user's Drive files created by the app
      ],
      redirectUri: makeRedirectUri({
        scheme: "expooauth",
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
    }
  }, [response]);
  return (
    <>
      <View
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text>hessam</Text>
        <TextInput
          placeholder="email"
          value={userData.username}
          onChangeText={(value) =>
            setUserData({ ...userData, username: value })
          }
        />
        <TextInput
          placeholder="password"
          value={userData.password}
          onChangeText={(value) =>
            setUserData({ ...userData, password: value })
          }
        />

        <Button
          disabled={!request}
          title="Login"
          onPress={googleLogin}
        />
      </View>
    </>
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    //   headerImage={
    //     <Image
    //       source={require('@/assets/images/partial-react-logo.png')}
    //       style={styles.reactLogo}
    //     />
    //   }>
    //   <ThemedView style={styles.titleContainer}>
    //     <ThemedText type="title">Welcome!</ThemedText>
    //     <HelloWave />
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 1: Try it</ThemedText>
    //     <ThemedText>
    //       Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
    //       Press{' '}
    //       <ThemedText type="defaultSemiBold">
    //         {Platform.select({
    //           ios: 'cmd + d',
    //           android: 'cmd + m',
    //           web: 'F12',
    //         })}
    //       </ThemedText>{' '}
    //       to open developer tools.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 2: Explore</ThemedText>
    //     <ThemedText>
    //       {`Tap the Explore tab to learn more about what's included in this starter app.`}
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
    //     <ThemedText>
    //       {`When you're ready, run `}
    //       <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
    //       <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
    //       <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
    //       <ThemedText type="defaultSemiBold">app-example</ThemedText>.
    //     </ThemedText>
    //   </ThemedView>
    // </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
