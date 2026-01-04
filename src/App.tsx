import { useState } from 'react'
import './app.css'
import { Quiz, type ColorTheme } from './components/Quiz'
import { SetupScreen } from './components/SetupScreen'

function App() {
  const [userData, setUserData] = useState<{ name: string; theme: ColorTheme } | null>(null);

  const handleStartQuiz = (name: string, theme: ColorTheme) => {
    setUserData({ name, theme });
  };

  if (!userData) {
    return <SetupScreen onStart={handleStartQuiz} />;
  }

  return (
    <Quiz userName={userData.name} theme={userData.theme} />
  )
}

export default App
