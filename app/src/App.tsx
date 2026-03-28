import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { Landing } from './pages/Landing'
import { Home } from './pages/Home'
import { Session } from './pages/Session'
import { Journey } from './pages/Journey'
import { Calendar } from './pages/Calendar'
import { History } from './pages/History'
import { Settings } from './pages/Settings'
import { Auth } from './pages/Auth'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/session" element={<Session />} />
        <Route path="/journey/:id" element={<Journey />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
