import { RotateCcw } from 'lucide-react';
import PaletteResults from './PaletteResults';
import FontResults from './FontResults';
import { DesignResult } from '../types';

interface ResultsProps {
  result: DesignResult;
  onReset: () => void;
}

export default function Results({ result, onReset }: ResultsProps) {
  return (
    <div className="w-full">
      <div className="mb-8">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
        >
          <RotateCcw size={18} />
          Create New Design
        </button>
      </div>

      <div className="space-y-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{result.request.theme}</h1>
          <p className="text-gray-600">{result.request.description}</p>
        </div>

        <PaletteResults palettes={result.palettes} />

        <FontResults fonts={result.fonts} />
      </div>
    </div>
  );
}
