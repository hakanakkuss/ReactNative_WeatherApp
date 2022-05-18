import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  ActivityIndicator,
} from "react-native";

import axios from "axios";
import Resim from "./Resim";
export default function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState();

  const changeBackground = (deger) => {
    if (deger === "Clouds") {
      return require("./assets/background/img/cloudy.jpg");
    } else if (deger === "Clear") {
      return require("./assets/background/img/sunny.png");
    } else if (deger === "Rain") {
      return require("./assets/background/img/rainy.png");
    } else if (deger === "Snow") {
      return require("./assets/background/img/snow.png");
    } else if (deger === "Thunderstorm") {
      return require("./assets/background/img/thunderstorm.jpg");
    }
  };

  const api = {
    key: "01e2720492119e131a4184fd70964adf",
    baseUrl: "https://api.openweathermap.org/data/2.5/",
  };

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput(""); //geç tuşuna basıldıktan sonra input'un içi boşaltılsın demek
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
    })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((e) => console.dir(e))
      .finally(() => setLoading(false));
  }, [api.key, input]);

  return (
    <View style={styles.root}>
      <ImageBackground
        source={`${changeBackground(data?.weather[0].main)}`}
        resizeMode="cover"
        style={styles.image}
      >
        <View>
          <TextInput
            placeholder="Enter city name and press return..."
            onChangeText={(text) => setInput(text)} //TextInput'un içindeki text değiştiğinde Input state'ini yazılan text ile güncelle demek
            value={input}
            placeholderTextColor={"#000"}
            style={styles.textInput}
            onSubmitEditing={fetchDataHandler} //klavyeden geç tuşuna basıldığında bu fonk çalışacak demek
          />
          {loading && ( //loading true ise içeriyi çalıştırır
            <View>
              <ActivityIndicator size={"large"} color="#fff" />
            </View>
          )}
          {data !== null ? (
            <View style={styles.infoView}>
              <Text style={styles.cityCountryText}>
                {`${data?.name},${data?.sys?.country}`}
              </Text>
              <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
              <Text style={styles.tempText}>{`${Math.round(
                data?.main?.temp
              )} C°`}</Text>
              <Text style={styles.tempText}>{`${data?.weather[0]?.main}`}</Text>

              <Text style={styles.minMaxText}>{`Min ${Math.round(
                data?.main?.temp_min
              )} C° / Max ${Math.round(data?.main?.temp_max)}`}</Text>
            </View>
          ) : (
            <Resim
              style={{
                resizeMode: "cover",
                height: 100,
                width: 200,
                resizeMode: "cover",
              }}
            >
              <View style={styles.infoView}>
                <Text style={styles.tempText}>
                  Hava durumunu öğrenmek istediğiniz konumu giriniz.
                </Text>
              </View>
            </Resim>
          )}

          {/* {input === "İstanbul" && ( //inputun değeri istanbul ise alttaki text çalışır değilse çalışmaz
            <View>
              <Text>Şehir İstanbul seçildi.</Text>
            </View>
          )} */}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    flex: 1,
    flexDirection: "column",
  },
  textInput: {
    borderBottomWidth: 2,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 50,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
    fontSize: 17,
    borderBottomColor: "#df8e00",
    zIndex: 999,
  },
  infoView: {
    alignItems: "center",
  },
  cityCountryText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  dateText: {
    color: "#fff",
    fontSize: 22,
    marginVertical: 10,
  },
  tempText: {
    fontSize: 45,
    color: "#fff",
    marginVertical: 10,
  },
  minMaxText: {
    fontSize: 22,
    color: "#fff",
    marginVertical: 10,
    fontWeight: "500",
  },
});
