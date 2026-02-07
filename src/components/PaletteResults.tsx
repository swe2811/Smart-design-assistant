import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { ColorPalette } from '../types';

interface PaletteResultsProps {
  palettes: ColorPalette[];
}

export default function PaletteResults({ palettes }: PaletteResultsProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (_text: string, hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const copyAllPalettes = () => {
    const allColors = palettes
      .flatMap((p) => [
        `Primary: ${p.primary.color}`,
        `Secondary: ${p.secondary.color}`,
        `Accent: ${p.accent.color}`,
      ])
      .join('\n');
    navigator.clipboard.writeText(allColors);
    setCopiedColor('all');
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Color Palettes</h2>
        <button
          onClick={copyAllPalettes}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-medium transition-colors"
        >
          {copiedColor === 'all' ? <Check size={18} /> : <Copy size={18} />}
          Copy All HEX
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {palettes.map((palette, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <h3 className="px-6 py-4 bg-gray-50 font-semibold text-gray-900 border-b border-gray-200">{palette.name}</h3>

            <div className="p-6 space-y-4">
              {/* Primary - 60% */}
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Primary (60%)</p>
                    <p className="text-xs text-gray-500">{palette.primary.usage}</p>
                  </div>
                </div>
                <div
                  className="w-full h-20 rounded-lg mb-2 border border-gray-200 cursor-pointer transition-opacity hover:opacity-90"
                  style={{ backgroundColor: palette.primary.color }}
                  onClick={() => copyToClipboard('Primary', palette.primary.color)}
                />
                <div
                  className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => copyToClipboard('Primary', palette.primary.color)}
                >
                  <code className="text-sm font-mono text-gray-700">{palette.primary.color}</code>
                  {copiedColor === palette.primary.color ? (
                    <Check size={16} className="text-green-600" />
                  ) : (
                    <Copy size={16} className="text-gray-400" />
                  )}
                </div>
              </div>

              {/* Secondary - 30% */}
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Secondary (30%)</p>
                    <p className="text-xs text-gray-500">{palette.secondary.usage}</p>
                  </div>
                </div>
                <div
                  className="w-full h-20 rounded-lg mb-2 border border-gray-200 cursor-pointer transition-opacity hover:opacity-90"
                  style={{ backgroundColor: palette.secondary.color }}
                  onClick={() => copyToClipboard('Secondary', palette.secondary.color)}
                />
                <div
                  className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => copyToClipboard('Secondary', palette.secondary.color)}
                >
                  <code className="text-sm font-mono text-gray-700">{palette.secondary.color}</code>
                  {copiedColor === palette.secondary.color ? (
                    <Check size={16} className="text-green-600" />
                  ) : (
                    <Copy size={16} className="text-gray-400" />
                  )}
                </div>
              </div>

              {/* Accent - 10% */}
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Accent (10%)</p>
                    <p className="text-xs text-gray-500">{palette.accent.usage}</p>
                  </div>
                </div>
                <div
                  className="w-full h-20 rounded-lg mb-2 border border-gray-200 cursor-pointer transition-opacity hover:opacity-90"
                  style={{ backgroundColor: palette.accent.color }}
                  onClick={() => copyToClipboard('Accent', palette.accent.color)}
                />
                <div
                  className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => copyToClipboard('Accent', palette.accent.color)}
                >
                  <code className="text-sm font-mono text-gray-700">{palette.accent.color}</code>
                  {copiedColor === palette.accent.color ? (
                    <Check size={16} className="text-green-600" />
                  ) : (
                    <Copy size={16} className="text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
