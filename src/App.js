import './App.css';
import { Routes, Route } from 'react-router-dom';
import OrderBookPage from './pages/OrderBook/OrderBookPage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <div className='app'>
      <ErrorBoundary key={'uniqueKey'}>
        <Routes>
          <Route path='/' exact element={<OrderBookPage />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
