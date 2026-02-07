
interface FormStep3Props {
  theme: string;
  customTheme: string;
  onChange: (theme: string, customTheme?: string) => void;
}

const themes = ['Nature / Eco', 'Minimal', 'Luxury', 'Modern', 'Vintage', 'Playful', 'Corporate', 'Futuristic'];

export default function FormStep3({ theme, customTheme, onChange }: FormStep3Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Choose a design theme</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => onChange(t)}
              className={`p-4 rounded-lg border-2 transition-all text-center font-medium ${
                theme === t
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              {t}
            </button>
          ))}
          <button
            onClick={() => onChange('Custom')}
            className={`p-4 rounded-lg border-2 transition-all text-center font-medium ${
              theme === 'Custom'
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
            }`}
          >
            Custom
          </button>
        </div>
      </div>

      {theme === 'Custom' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Describe your custom theme</label>
          <input
            type="text"
            value={customTheme}
            onChange={(e) => onChange('Custom', e.target.value)}
            placeholder="E.g., Industrial meets nature..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
          />
        </div>
      )}
    </div>
  );
}
