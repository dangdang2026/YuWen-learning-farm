import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import MindMap from './pages/MindMap';
import Learn from './pages/Learn';
import FarmGame from './pages/FarmGame';
import FishingGame from './pages/FishingGame';
import Collection from './pages/Collection';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-blue-50 to-sky-100">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mindmap" element={<MindMap />} />
            <Route path="/learn/:moduleId" element={<Learn />} />
            <Route path="/farm" element={<FarmGame />} />
            <Route path="/fishing" element={<FishingGame />} />
            <Route path="/collection" element={<Collection />} />
          </Routes>
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}

export default App;
