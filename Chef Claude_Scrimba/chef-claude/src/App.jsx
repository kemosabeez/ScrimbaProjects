import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "../components/Form";
import ClaudeRecipePage from "../pages/ClaudeRecipePage";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/recipe" element={<ClaudeRecipePage />} />

        </Routes>
      </BrowserRouter>

    </main>
  )
} export default App