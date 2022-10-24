import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { CONVERTER_ROUTE, EXCHANGE_RATES_ROUTE } from './constants/paths';
import ConverterPage from "./pages/ConverterPage/ConverterPage";
import ExchangeRatesPage from './pages/ExchangeRatesPage/ExchangeRatesPage';
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={CONVERTER_ROUTE} element={<ConverterPage />} />
        <Route path={EXCHANGE_RATES_ROUTE} element={<ExchangeRatesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
