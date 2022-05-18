import React from "react";
import { ImageBackground, View, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

export default function Resim() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/background/img/havadurumu.jpg")}
        style={{
          resizeMode: "cover",
          height: 350,
          width: 380,
          marginTop: 60,

          resizeMode: "cover",
          zIndex: 999,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
