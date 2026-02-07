import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { FontRecommendation } from '../types';

interface FontResultsProps {
  fonts: FontRecommendation;
}

export default function FontResults({ fonts }: FontResultsProps) {
  const [copiedFont, setCopiedFont] = useState<string | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fonts.headingFont.replace(/ /g, '+')}:wght@700&family=${fonts.bodyFont.replace(/ /g, '+')}:wght@400;600&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    setFontsLoaded(true);
  }, [fonts]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFont(text);
    setTimeout(() => setCopiedFont(null), 2000);
  };

  const copyBoth = () => {
    navigator.clipboard.writeText(`${fonts.headingFont}\n${fonts.bodyFont}`);
    setCopiedFont('both');
    setTimeout(() => setCopiedFont(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Font Recommendations</h2>
        <button
          onClick={copyBoth}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-medium transition-colors"
        >
          {copiedFont === 'both' ? <Check size={18} /> : <Copy size={18} />}
          Copy All Fonts
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Heading Font */}
        <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Heading Font</h3>

          <div
            className="border-2 border-gray-100 rounded-lg p-8 mb-6 bg-gray-50"
            style={{
              fontFamily: fontsLoaded ? `'${fonts.headingFont}', ${fonts.headingFallback}` : fonts.headingFallback,
              fontSize: '32px',
              fontWeight: 700,
              lineHeight: '1.2',
            }}
          >
            Design & Typography
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => copyToClipboard(fonts.headingFont)}>
              <div>
                <p className="font-semibold text-gray-900">{fonts.headingFont}</p>
                <p className="text-xs text-gray-500">Primary</p>
              </div>
              {copiedFont === fonts.headingFont ? (
                <Check size={16} className="text-green-600" />
              ) : (
                <Copy size={16} className="text-gray-400" />
              )}
            </div>

            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-1">Fallback</p>
              <p className="text-sm text-gray-600">{fonts.headingFallback}</p>
            </div>
          </div>
        </div>

        {/* Body Font */}
        <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Body Font</h3>

          <div
            className="border-2 border-gray-100 rounded-lg p-8 mb-6 bg-gray-50"
            style={{
              fontFamily: fontsLoaded ? `'${fonts.bodyFont}', ${fonts.bodyFallback}` : fonts.bodyFallback,
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '1.6',
            }}
          >
            The quick brown fox jumps over the lazy dog. Perfect for body text and readable content across all layouts.
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => copyToClipboard(fonts.bodyFont)}>
              <div>
                <p className="font-semibold text-gray-900">{fonts.bodyFont}</p>
                <p className="text-xs text-gray-500">Primary</p>
              </div>
              {copiedFont === fonts.bodyFont ? (
                <Check size={16} className="text-green-600" />
              ) : (
                <Copy size={16} className="text-gray-400" />
              )}
            </div>

            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-1">Fallback</p>
              <p className="text-sm text-gray-600">{fonts.bodyFallback}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
