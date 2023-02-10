import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from "react-native";

import Tts from 'react-native-tts';
import axios from "axios";

function App() : JSX.Element {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('http://192.168.1.10:3000/chatGPT');

  const speak = (msg = 'No message given') => {
    Tts.speak(msg)
  };
  
  const getData = async () => {

    const chatGPT = await axios.get(url).then((response) => {
      return response.data;
    });
    const chat = chatGPT?.aiResponse;
    setName(name);
    speak(chat);
    setText(chat);
  };

  useEffect(() => {getData()},[]);

  return (
    <View style={boxStyles.container}>
      <Text style={boxStyles.text}>{text}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUrl}
        value={url}
      />
      <Button title="Generate New Story" onPress={() => getData()} />
      <Text style={boxStyles.text}>{url}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  submitButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
});

const boxStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 23,
    lineHeight: 25,
    fontWeight: "bold",
    paddingHorizontal: 20,
    bottom: 0,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 42,
    textAlignVertical: "bottom",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
    bottom: 0,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
});



export default App;