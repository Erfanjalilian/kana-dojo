'use client';

import { useState, useCallback } from 'react';
import { Copy, Check, Loader2 } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import type { Language } from '../types';

interface TranslatorOutputProps {
  translation: string;
  romanization?: string | null;
  targetLanguage: Language;
  isLoading: boolean;
  sourceLanguage: Language;
}

export default function TranslatorOutput({
  translation,
  romanization,
  targetLanguage,
  isLoading,
  sourceLanguage
}: TranslatorOutputProps) {
  const [copied, setCopied] = useState(false);

  // Show romanization when source is Japanese (translating from Japanese)
  const showRomanization = sourceLanguage === 'ja' && romanization;

  const handleCopy = useCallback(async () => {
    if (!translation) return;

    try {
      await navigator.clipboard.writeText(translation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  }, [translation]);

  return (
    <div className='flex flex-col gap-3 w-full'>
      {/* Language label */}
      <div className='flex items-center justify-between'>
        <span
          className={cn(
            'px-3 py-2 rounded-md text-sm font-medium',
            'bg-[var(--card-color)] border border-[var(--border-color)]',
            'text-[var(--main-color)]'
          )}
        >
          {targetLanguage === 'en' ? 'English' : '日本語'}
        </span>

        {/* Copy button */}
        {translation && !isLoading && (
          <Button
            variant='ghost'
            size='icon'
            onClick={handleCopy}
            className='h-10 w-10 min-w-[44px] min-h-[44px]'
            aria-label={copied ? 'Copied!' : 'Copy translation'}
          >
            {copied ? (
              <Check className='h-5 w-5 text-green-500' />
            ) : (
              <Copy className='h-5 w-5' />
            )}
          </Button>
        )}
      </div>

      {/* Output area */}
      <div
        className={cn(
          'w-full min-h-[200px] p-4 rounded-lg',
          'bg-[var(--card-color)] border border-[var(--border-color)]',
          'text-[var(--main-color)]',
          'relative'
        )}
      >
        {isLoading ? (
          <div className='flex items-center justify-center h-full min-h-[168px]'>
            <Loader2 className='h-8 w-8 animate-spin text-[var(--main-color)]' />
          </div>
        ) : translation ? (
          <div className='flex flex-col gap-4'>
            {/* Main translation */}
            <p className='text-lg whitespace-pre-wrap break-words'>
              {translation}
            </p>

            {/* Romanization (when translating from Japanese) */}
            {showRomanization && (
              <div className='pt-4 border-t border-[var(--border-color)]'>
                <p className='text-xs text-[var(--secondary-color)] mb-1'>
                  Romanization (Romaji)
                </p>
                <p className='text-sm text-[var(--secondary-color)] whitespace-pre-wrap break-words'>
                  {romanization}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className='text-[var(--secondary-color)] italic'>
            {targetLanguage === 'en'
              ? 'Translation will appear here...'
              : '翻訳がここに表示されます...'}
          </p>
        )}
      </div>

      {/* Copy confirmation message */}
      {copied && (
        <p className='text-sm text-green-500' role='status'>
          Copied to clipboard!
        </p>
      )}
    </div>
  );
}
