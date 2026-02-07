
interface FormStep1Props {
  contentType: string;
  customType: string;
  onChange: (contentType: string, customType?: string) => void;
}

const contentTypes = ['Poster', 'Website', 'Website Ad', 'Social Media Post', 'Presentation', 'Branding / Logo'];

export default function FormStep1({ contentType, customType, onChange }: FormStep1Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">What are you creating?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {contentTypes.map((type) => (
            <button
              key={type}
              onClick={() => onChange(type)}
              className={`p-4 rounded-lg border-2 transition-all text-center font-medium ${
                contentType === type
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              {type}
            </button>
          ))}
          <button
            onClick={() => onChange('Other')}
            className={`p-4 rounded-lg border-2 transition-all text-center font-medium ${
              contentType === 'Other'
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
            }`}
          >
            Other
          </button>
        </div>
      </div>

      {contentType === 'Other' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Describe what you're creating</label>
          <input
            type="text"
            value={customType}
            onChange={(e) => onChange('Other', e.target.value)}
            placeholder="E.g., packaging, brochure, business card..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
          />
        </div>
      )}
    </div>
  );
}
