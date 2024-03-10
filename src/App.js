import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/auth/HomePage";
import ChatPage from "./Pages/auth/ChatPage";
import RegistrationSuccessful from "./Pages/auth/RegistrationSuccessful";
import VerifyEmail from "./Pages/auth/VerifyEmail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<ChatPage />} />
        <Route
          path="/registration-successful"
          element={<RegistrationSuccessful />}
        />
        <Route path="/verify" element={<VerifyEmail />} />
      </Routes>
    </div>
  );
}

export default App;
