import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Form from "./components/Form";
import ClaudeRecipePage from "./pages/ClaudeRecipePage";



export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Form/>} />
        <Route path="/recipe" element={<ClaudeRecipePage />} />
      </Routes>
    </BrowserRouter>
  )
}