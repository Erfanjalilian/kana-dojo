'use client';

import { useState } from 'react';
import { Trash2, Clock, X } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/shared/components/ui/alert-dialog';
import type { TranslationEntry } from '../types';

interface TranslationHistoryProps {
  entries: TranslationEntry[];
  onSelect: (entry: TranslationEntry) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

/**
 * Format timestamp to a readable date/time string
 */
function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString();
}

/**
 * Truncate text to a maximum length
 */
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export default function TranslationHistory({
  entries,
  onSelect,
  onDelete,
  onClearAll
}: TranslationHistoryProps) {
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  if (entries.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-8 text-[var(--secondary-color)]'>
        <Clock className='h-12 w-12 mb-4 opacity-50' />
        <p className='text-sm'>No translation history yet</p>
        <p className='text-xs mt-1'>Your translations will appear here</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      {/* Header with clear all button */}
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-medium text-[var(--main-color)]'>
          History
        </h3>
        <AlertDialog open={clearDialogOpen} onOpenChange={setClearDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              className='text-[var(--secondary-color)] hover:text-red-500'
            >
              <Trash2 className='h-4 w-4 mr-1' />
              Clear All
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className='bg-[var(--background-color)] border-[var(--border-color)]'>
            <AlertDialogHeader>
              <AlertDialogTitle className='text-[var(--main-color)]'>
                Clear Translation History?
              </AlertDialogTitle>
              <AlertDialogDescription className='text-[var(--secondary-color)]'>
                This will permanently delete all your translation history. This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className='bg-[var(--card-color)] text-[var(--main-color)] border-[var(--border-color)]'>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  onClearAll();
                  setClearDialogOpen(false);
                }}
                className='bg-red-500 text-white hover:bg-red-600'
              >
                Clear All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* History entries list */}
      <div className='flex flex-col gap-2 max-h-[400px] overflow-y-auto'>
        {entries.map(entry => (
          <div
            key={entry.id}
            className={cn(
              'group flex items-start gap-3 p-3 rounded-lg cursor-pointer',
              'bg-[var(--card-color)] border border-[var(--border-color)]',
              'hover:border-[var(--main-color)] transition-colors duration-200'
            )}
            onClick={() => onSelect(entry)}
            role='button'
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(entry);
              }
            }}
          >
            {/* Entry content */}
            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-2 mb-1'>
                <span className='text-xs px-1.5 py-0.5 rounded bg-[var(--border-color)] text-[var(--secondary-color)]'>
                  {entry.sourceLanguage === 'en' ? 'EN' : 'JA'} →{' '}
                  {entry.targetLanguage === 'en' ? 'EN' : 'JA'}
                </span>
                <span className='text-xs text-[var(--secondary-color)]'>
                  {formatTimestamp(entry.timestamp)}
                </span>
              </div>
              <p className='text-sm text-[var(--main-color)] truncate'>
                {truncateText(entry.sourceText, 50)}
              </p>
              <p className='text-xs text-[var(--secondary-color)] truncate mt-0.5'>
                → {truncateText(entry.translatedText, 50)}
              </p>
            </div>

            {/* Delete button */}
            <Button
              variant='ghost'
              size='icon'
              className={cn(
                'h-8 w-8 min-w-[44px] min-h-[44px] opacity-0 group-hover:opacity-100',
                'text-[var(--secondary-color)] hover:text-red-500',
                'transition-opacity duration-200'
              )}
              onClick={e => {
                e.stopPropagation();
                onDelete(entry.id);
              }}
              aria-label='Delete entry'
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
