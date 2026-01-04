import { useState } from 'react'
import { type ColorTheme, colorOptions } from './Quiz'

interface SetupScreenProps {
  onStart: (name: string, theme: ColorTheme) => void;
}

export function SetupScreen({ onStart }: SetupScreenProps) {
  const [name, setName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState(colorOptions[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name, selectedTheme);
    }
  };

  return (
    <div className={`min-h-screen ${selectedTheme.bgPage} flex flex-col items-center justify-center p-4 ${selectedTheme.textSecondary} font-sans`}>
      <div className={`max-w-md w-full ${selectedTheme.bgCard} p-8 rounded-3xl shadow-xl border-4 ${selectedTheme.borderCard}`}>
        <h1 className={`text-4xl font-bold mb-8 text-center ${selectedTheme.textTitle}`}>Welcome to the Stone Age Quiz!</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className={`block text-xl font-semibold mb-2 ${selectedTheme.textPrimary}`}>
              What is your name?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-4 rounded-2xl border-2 ${selectedTheme.borderOption} text-xl focus:outline-none focus:ring-4 focus:ring-amber-200 transition-all`}
              placeholder="Enter your name..."
              required
            />
          </div>

          <div>
            <label className={`block text-xl font-semibold mb-3 ${selectedTheme.textPrimary}`}>
              Choose a theme:
            </label>
            <div className="grid grid-cols-2 gap-4">
              {colorOptions.map((theme) => (
                <button
                  key={theme.name}
                  type="button"
                  onClick={() => setSelectedTheme(theme)}
                  className={`p-4 rounded-2xl border-4 transition-all text-lg font-bold ${
                    selectedTheme.name === theme.name 
                      ? `${theme.borderCard} ${theme.bgScore} scale-105` 
                      : 'border-transparent bg-gray-100 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className={`w-full h-8 rounded-lg mb-2 ${theme.bgButton}`}></div>
                  {theme.name}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full ${selectedTheme.bgButton} ${selectedTheme.bgButtonHover} text-white font-bold py-4 px-8 rounded-2xl text-2xl transition-all shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={!name.trim()}
          >
            Start Quiz!
          </button>
        </form>
      </div>
    </div>
  );
}
