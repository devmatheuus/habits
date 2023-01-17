import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, useFonts } from '@expo-google-fonts/inter';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

import { Loading } from './src/components/Loading';

const App = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  return (
    <>
      {fontsLoaded ? (
        <View style={styles.container}>
          <Text style={styles.text}>
            Open up App.tsx to start working on your app!
          </Text>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
        </View>
      ) : (
        <Loading />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090A",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontFamily: "Inter_800ExtraBold",
  },
});

export default App;
