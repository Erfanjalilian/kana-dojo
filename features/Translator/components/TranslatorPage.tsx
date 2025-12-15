'use client';

import { useEffect } from 'react';
import { ArrowLeftRight, WifiOff, Languages } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import useTranslatorStore from '../store/useTranslatorStore';
import TranslatorInput from './TranslatorInput';
import TranslatorOutput from './TranslatorOutput';
import TranslationHistory from './TranslationHistory';
import SEOContent from './SEOContent';

interface TranslatorPageProps {
  locale?: string;
}

export default function TranslatorPage({ locale = 'en' }: TranslatorPageProps) {
  const {
    sourceText,
    sourceLanguage,
    targetLanguage,
    translatedText,
    romanization,
    isLoading,
    error,
    isOffline,
    history,
    setSourceText,
    setSourceLanguage,
    swapLanguages,
    translate,
    clearInput,
    loadHistory,
    deleteFromHistory,
    clearHistory,
    restoreFromHistory
  } = useTranslatorStore();

  // Load history on mount
  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleTranslate = () => {
    if (!isOffline && sourceText.trim().length > 0) {
      translate();
    }
  };

  const handleClear = () => {
    clearInput();
  };

  return (
    <div className='flex flex-col gap-6 w-full max-w-6xl mx-auto px-4 py-6'>
      {/* Header */}
      <div className='flex items-center gap-3'>
        <Languages className='h-8 w-8 text-[var(--main-color)]' />
        <h1 className='text-3xl font-bold text-[var(--main-color)]'>
          Japanese Translator
        </h1>
      </div>

      {/* Offline indicator */}
      {isOffline && (
        <div
          className={cn(
            'flex items-center gap-2 p-3 rounded-lg',
            'bg-yellow-500/10 border border-yellow-500/30',
            'text-yellow-600 dark:text-yellow-400'
          )}
          role='alert'
        >
          <WifiOff className='h-5 w-5' />
          <span className='text-sm'>
            You are offline. Translation is unavailable until you reconnect.
          </span>
        </div>
      )}

      {/* Main translation area */}
      <div
        className={cn(
          'grid gap-4',
          'grid-cols-1 md:grid-cols-[1fr_auto_1fr]',
          'items-start'
        )}
      >
        {/* Input section */}
        <TranslatorInput
          value={sourceText}
          onChange={setSourceText}
          onTranslate={handleTranslate}
          sourceLanguage={sourceLanguage}
          onLanguageChange={setSourceLanguage}
          isLoading={isLoading}
          error={error}
          isOffline={isOffline}
        />

        {/* Swap button - centered between input and output */}
        <div className='flex items-center justify-center md:pt-12'>
          <Button
            variant='outline'
            size='icon'
            onClick={swapLanguages}
            disabled={isLoading || isOffline}
            className={cn(
              'h-12 w-12 min-w-[44px] min-h-[44px] rounded-full',
              'rotate-90 md:rotate-0'
            )}
            aria-label='Swap languages'
          >
            <ArrowLeftRight className='h-5 w-5' />
          </Button>
        </div>

        {/* Output section */}
        <TranslatorOutput
          translation={translatedText}
          romanization={romanization}
          targetLanguage={targetLanguage}
          sourceLanguage={sourceLanguage}
          isLoading={isLoading}
        />
      </div>

      {/* Translate button - mobile friendly */}
      <div className='flex justify-center'>
        <Button
          onClick={handleTranslate}
          disabled={isLoading || isOffline || sourceText.trim().length === 0}
          className='w-full md:w-auto min-w-[200px] h-12'
          size='lg'
        >
          {isLoading ? 'Translating...' : 'Translate'}
        </Button>
      </div>

      {/* History section */}
      <div className='mt-4'>
        <TranslationHistory
          entries={history}
          onSelect={restoreFromHistory}
          onDelete={deleteFromHistory}
          onClearAll={clearHistory}
        />
      </div>

      {/* SEO Content */}
      <SEOContent locale={locale} />
    </div>
  );
}
