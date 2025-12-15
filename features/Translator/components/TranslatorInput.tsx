'use client';

import { useCallback, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';
import type { Language } from '../types';

const MAX_CHARACTERS = 5000;

interface TranslatorInputProps {
  value: string;
  onChange: (value: string) => void;
  onTranslate: () => void;
  sourceLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  isLoading: boolean;
  error?: string | null;
  isOffline?: boolean;
}

/**
 * Helper function to calculate character count
 * Exported for testing purposes
 */
export function getCharacterCount(text: string): number {
  return text.length;
}

export default function TranslatorInput({
  value,
  onChange,
  onTranslate,
  sourceLanguage,
  onLanguageChange,
  isLoading,
  error,
  isOffline = false
}: TranslatorInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const characterCount = getCharacterCount(value);
  const isOverLimit = characterCount > MAX_CHARACTERS;
  const isDisabled = isLoading || isOffline;

  // Handle keyboard shortcut (Ctrl/Cmd + Enter)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!isDisabled && !isOverLimit && value.trim().length > 0) {
          onTranslate();
        }
      }
    },
    [isDisabled, isOverLimit, value, onTranslate]
  );

  // Handle text change with character limit
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      // Allow typing but show warning when over limit
      if (newValue.length <= MAX_CHARACTERS) {
        onChange(newValue);
      }
    },
    [onChange]
  );

  // Handle clear button
  const handleClear = useCallback(() => {
    onChange('');
    textareaRef.current?.focus();
  }, [onChange]);

  // Focus textarea on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div className='flex flex-col gap-3 w-full'>
      {/* Language selector */}
      <div className='flex items-center justify-between'>
        <Select
          value={sourceLanguage}
          onValueChange={value => onLanguageChange(value as Language)}
          disabled={isDisabled}
        >
          <SelectTrigger
            className={cn(
              'w-[140px] h-10',
              'bg-[var(--card-color)] border-[var(--border-color)]',
              'text-[var(--main-color)]'
            )}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className='bg-[var(--card-color)] border-[var(--border-color)]'>
            <SelectItem value='en'>English</SelectItem>
            <SelectItem value='ja'>日本語</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear button */}
        {value.length > 0 && (
          <Button
            variant='ghost'
            size='icon'
            onClick={handleClear}
            disabled={isDisabled}
            className='h-10 w-10 min-w-[44px] min-h-[44px]'
            aria-label='Clear input'
          >
            <X className='h-5 w-5' />
          </Button>
        )}
      </div>

      {/* Text area */}
      <div className='relative'>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
          placeholder={
            sourceLanguage === 'en'
              ? 'Enter text to translate...'
              : 'テキストを入力してください...'
          }
          className={cn(
            'w-full min-h-[200px] p-4 rounded-lg resize-none',
            'bg-[var(--card-color)] border border-[var(--border-color)]',
            'text-[var(--main-color)] placeholder:text-[var(--secondary-color)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]',
            'transition-all duration-200',
            isOverLimit && 'border-red-500 focus:ring-red-500',
            isDisabled && 'opacity-60 cursor-not-allowed'
          )}
          aria-label='Source text input'
          aria-describedby='character-count'
        />

        {/* Character count */}
        <div
          id='character-count'
          className={cn(
            'absolute bottom-3 right-3 text-sm',
            isOverLimit ? 'text-red-500' : 'text-[var(--secondary-color)]'
          )}
        >
          {characterCount.toLocaleString()} / {MAX_CHARACTERS.toLocaleString()}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className='text-red-500 text-sm' role='alert'>
          {error}
        </p>
      )}

      {/* Warning for character limit */}
      {isOverLimit && (
        <p className='text-red-500 text-sm' role='alert'>
          Text exceeds maximum length of {MAX_CHARACTERS.toLocaleString()}{' '}
          characters
        </p>
      )}

      {/* Keyboard shortcut hint */}
      <p className='text-xs text-[var(--secondary-color)]'>
        Press Ctrl+Enter (⌘+Enter on Mac) to translate
      </p>
    </div>
  );
}
