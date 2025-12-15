'use client';

import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  HelpCircle,
  Info
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface SEOContentProps {
  locale?: string;
}

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = false
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className='border border-[var(--border-color)] rounded-lg overflow-hidden'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between p-4',
          'bg-[var(--card-color)] hover:bg-[var(--border-color)]',
          'text-[var(--main-color)] transition-colors duration-200'
        )}
        aria-expanded={isOpen}
      >
        <span className='flex items-center gap-2 font-medium'>
          {icon}
          {title}
        </span>
        {isOpen ? (
          <ChevronUp className='h-5 w-5' />
        ) : (
          <ChevronDown className='h-5 w-5' />
        )}
      </button>
      {isOpen && (
        <div className='p-4 bg-[var(--background-color)] text-[var(--secondary-color)]'>
          {children}
        </div>
      )}
    </div>
  );
}

export default function SEOContent({ locale = 'en' }: SEOContentProps) {
  return (
    <section
      className='flex flex-col gap-4 mt-8'
      aria-label='Educational content'
    >
      <h2 className='text-2xl font-semibold text-[var(--main-color)]'>
        Japanese Translation Guide
      </h2>

      <CollapsibleSection
        title='How to Use the Japanese Translator'
        icon={<BookOpen className='h-5 w-5' />}
        defaultOpen={true}
      >
        <div className='space-y-4 text-sm'>
          <p>
            Our free Japanese translator makes it easy to translate text between
            English and Japanese. Here&apos;s how to get started:
          </p>
          <ol className='list-decimal list-inside space-y-2 ml-2'>
            <li>Enter your text in the input field on the left</li>
            <li>Select your source language (English or Japanese)</li>
            <li>Click the translate button or press Ctrl+Enter</li>
            <li>
              View your translation with romanization (romaji) for Japanese text
            </li>
            <li>Copy the translation or save it to your history</li>
          </ol>
          <p>
            <strong>Pro tip:</strong> Use the swap button to quickly reverse the
            translation direction and translate the output back.
          </p>
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        title='About Japanese Writing Systems'
        icon={<Info className='h-5 w-5' />}
      >
        <div className='space-y-4 text-sm'>
          <p>
            Japanese uses three main writing systems, often combined in the same
            text:
          </p>
          <ul className='list-disc list-inside space-y-2 ml-2'>
            <li>
              <strong>Hiragana (ひらがな)</strong> - A phonetic syllabary used
              for native Japanese words, grammatical elements, and furigana
              readings
            </li>
            <li>
              <strong>Katakana (カタカナ)</strong> - A phonetic syllabary
              primarily used for foreign loanwords, onomatopoeia, and emphasis
            </li>
            <li>
              <strong>Kanji (漢字)</strong> - Chinese characters adapted for
              Japanese, representing meanings and concepts. There are over 2,000
              commonly used kanji
            </li>
          </ul>
          <p>
            Our translator handles all three writing systems and provides
            romanization (romaji) to help you read Japanese text using the Latin
            alphabet.
          </p>
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        title='Frequently Asked Questions'
        icon={<HelpCircle className='h-5 w-5' />}
      >
        <div className='space-y-4 text-sm'>
          <div>
            <h4 className='font-medium text-[var(--main-color)] mb-1'>
              Is this Japanese translator free?
            </h4>
            <p>
              Yes! Our Japanese translator is completely free to use with no
              registration required. Translate as much text as you need.
            </p>
          </div>
          <div>
            <h4 className='font-medium text-[var(--main-color)] mb-1'>
              How accurate is the translation?
            </h4>
            <p>
              Our translator uses Google Cloud Translation API, one of the most
              accurate machine translation services available. While no machine
              translation is perfect, it provides high-quality translations for
              most everyday use cases.
            </p>
          </div>
          <div>
            <h4 className='font-medium text-[var(--main-color)] mb-1'>
              What is romanization (romaji)?
            </h4>
            <p>
              Romanization, or romaji, is the representation of Japanese text
              using the Latin alphabet. It helps non-Japanese speakers read and
              pronounce Japanese words. Our translator automatically provides
              romanization for Japanese text.
            </p>
          </div>
          <div>
            <h4 className='font-medium text-[var(--main-color)] mb-1'>
              Is my translation history saved?
            </h4>
            <p>
              Yes, your translation history is saved locally in your browser.
              This means your translations are private and only accessible on
              your device. You can clear your history at any time.
            </p>
          </div>
          <div>
            <h4 className='font-medium text-[var(--main-color)] mb-1'>
              What is the maximum text length?
            </h4>
            <p>
              You can translate up to 5,000 characters at a time. For longer
              texts, we recommend breaking them into smaller sections.
            </p>
          </div>
        </div>
      </CollapsibleSection>
    </section>
  );
}
