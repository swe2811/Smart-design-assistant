import { useState } from 'react';
import { Palette } from 'lucide-react';
import DesignForm from './components/DesignForm';
import Results from './components/Results';
import { DesignRequest, DesignResult } from './types';
import { generateColorPalettes, generateFontPairings } from './lib/designEngine';

function App() {
  const [result, setResult] = useState<DesignResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: DesignRequest) => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const palettes = generateColorPalettes(data);
    const fonts = generateFontPairings(data);

    const newResult: DesignResult = {
      request: data,
      palettes,
      fonts,
    };

    setResult(newResult);
    setIsLoading(false);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Palette size={28} className="text-gray-900" />
            <h1 className="text-2xl font-bold text-gray-900">Design Intelligence</h1>
          </div>
          <p className="text-gray-600">Generate beautiful, on-brand color palettes and fonts for your designs</p>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {result ? (
          <Results result={result} onReset={handleReset} />
        ) : (
          <DesignForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-600 text-sm">
          <p>Designed to eliminate guesswork from color and typography selection</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
