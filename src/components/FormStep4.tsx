
interface FormStep4Props {
  stylePreferences: string[];
  onChange: (preferences: string[]) => void;
}

const styles = ['Soft & Calm', 'Bold & Energetic', 'Elegant', 'Fun', 'Serious', 'Creative', 'Professional'];

export default function FormStep4({ stylePreferences, onChange }: FormStep4Props) {
  const toggleStyle = (style: string) => {
    if (stylePreferences.includes(style)) {
      onChange(stylePreferences.filter((s) => s !== style));
    } else {
      onChange([...stylePreferences, style]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Select your style preferences</h2>
        <p className="text-gray-600 mb-4">Choose as many as apply to your design</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => toggleStyle(style)}
              className={`p-4 rounded-lg border-2 transition-all text-center font-medium ${
                stylePreferences.includes(style)
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
