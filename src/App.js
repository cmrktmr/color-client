import { useState, useEffect } from "react";
import "./App.css";
import {
  initSocket,
  disconnectSocket,
  setBgColor,
  subscribeToBgColor,
  initialData,
} from "./SocketService";

function App() {
  // inputların rengi
  const [color, setColor] = useState("#000");
  // background rengi
  const [lastColor, setLastColor] = useState("#ffff");
  // username
  const [userName, setUserName] = useState("");
  //en son değişiklik yapanın ismi
  const [lastName, setLastName] = useState("KİMSESİZ");

  useEffect(() => {
    if (!userName) {
      const name = prompt("Lütfen Kullanıcı Adınızı Giriniz!");
      setUserName(name ? name : "KİMSESİZ");
    }
  }, [userName]);

  useEffect(() => {
    initSocket();
    initialData(setLastColor, setColor, setLastName);

    subscribeToBgColor((data) => {
      console.log(data);
      setLastColor(data.color);
      setColor(data.color);
      setLastName(data.name);
    });

    return () => disconnectSocket();
  }, [lastColor]);

  const handleColor = () => {
    setLastColor(color);
    setBgColor({
      color: color,
      name: userName,
    });
  };

  return (
    <div className="App" style={{ backgroundColor: lastColor }}>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <br></br>
      <button onClick={handleColor}>Rengi Değiştir </button>
<br></br>
      <div>Renk Hex kodu: {color}</div>
      <div>Son Değiştiren Kullanıcı: {lastName}</div>
    </div>
  );
}

export default App;
