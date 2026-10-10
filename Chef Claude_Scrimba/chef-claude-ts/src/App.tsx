import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Form from "./components/Form";



export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Form/>} />
        <Route path="/recipe" element={<div>Welcome to the Recipes Page!</div>} />
      </Routes>
    </BrowserRouter>
  )
}