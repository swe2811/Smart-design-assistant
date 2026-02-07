import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStep3 from './FormStep3';
import FormStep4 from './FormStep4';
import { DesignRequest } from '../types';

interface DesignFormProps {
  onSubmit: (data: DesignRequest) => void;
  isLoading: boolean;
}

export default function DesignForm({ onSubmit, isLoading }: DesignFormProps) {
  const [step, setStep] = useState(1);
  const [contentType, setContentType] = useState('');
  const [customType, setCustomType] = useState('');
  const [description, setDescription] = useState('');
  const [feeling, setFeeling] = useState('');
  const [theme, setTheme] = useState('');
  const [customTheme, setCustomTheme] = useState('');
  const [stylePreferences, setStylePreferences] = useState<string[]>([]);

  const isStepValid = (): boolean => {
    switch (step) {
      case 1:
        return contentType !== '';
      case 2:
        return description.trim() !== '' && feeling.trim() !== '';
      case 3:
        return theme !== '';
      case 4:
        return stylePreferences.length > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid() && step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    if (isStepValid()) {
      const finalTheme = theme === 'Custom' ? customTheme : theme;
      const finalContentType = contentType === 'Other' ? customType : contentType;

      onSubmit({
        contentType: finalContentType,
        description,
        feeling,
        theme: finalTheme,
        stylePreferences,
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-3">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1 mx-1 rounded-full transition-colors ${
                  s <= step ? 'bg-gray-900' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center">Step {step} of 4</p>
        </div>

        {/* Form steps */}
        <div className="mb-8 min-h-96">
          {step === 1 && (
            <FormStep1
              contentType={contentType}
              customType={customType}
              onChange={(ct, custom) => {
                setContentType(ct);
                if (custom) setCustomType(custom);
              }}
            />
          )}
          {step === 2 && (
            <FormStep2
              description={description}
              feeling={feeling}
              onChange={(desc, feel) => {
                setDescription(desc);
                setFeeling(feel);
              }}
            />
          )}
          {step === 3 && (
            <FormStep3
              theme={theme}
              customTheme={customTheme}
              onChange={(t, custom) => {
                setTheme(t);
                if (custom) setCustomTheme(custom);
              }}
            />
          )}
          {step === 4 && (
            <FormStep4
              stylePreferences={stylePreferences}
              onChange={setStylePreferences}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handleBack}
            disabled={step === 1 || isLoading}
            className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
          >
            <ChevronLeft size={18} />
            Back
          </button>

          {step < 4 ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid() || isLoading}
              className="flex items-center gap-2 px-6 py-3 text-white bg-gray-900 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
            >
              Next
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid() || isLoading}
              className="flex items-center gap-2 px-6 py-3 text-white bg-gray-900 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
            >
              {isLoading ? 'Generating...' : 'Generate Design'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
