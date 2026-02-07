
interface FormStep2Props {
  description: string;
  feeling: string;
  onChange: (description: string, feeling: string) => void;
}

export default function FormStep2({ description, feeling, onChange }: FormStep2Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Tell us more</h2>
        <p className="text-gray-600 mb-4">Help us understand your project better</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">What is your content about?</label>
            <textarea
              value={description}
              onChange={(e) => onChange(e.target.value, feeling)}
              placeholder="E.g., A sustainable fashion brand targeting eco-conscious millennials..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">What feeling should it convey?</label>
            <textarea
              value={feeling}
              onChange={(e) => onChange(description, e.target.value)}
              placeholder="E.g., Calm, trustworthy, and natural..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
