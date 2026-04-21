import React, { lazy, Suspense } from 'react';
import { cn } from '../lib/utils';

interface AdSlotProps {
  type: 'TopBanner' | 'InContent' | 'Sidebar' | 'MobileSticky';
  className?: string;
}

const AdPlaceholder = ({ type }: { type: string }) => (
  <div className="flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-md p-4 min-h-[100px] text-gray-400 text-sm">
    <div className="text-center">
      <p className="font-semibold uppercase tracking-wider">{type} Ad</p>
      <p className="mt-1">Environment: {import.meta.env.MODE}</p>
      {/* 
        This is where AdSense or other network code would go later.
        Example:
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      */}
    </div>
  </div>
);

export const AdSlot: React.FC<AdSlotProps> = ({ type, className }) => {
  const showAds = import.meta.env.VITE_SHOW_ADS === 'true' || import.meta.env.DEV;

  if (!showAds) return null;

  return (
    <div className={cn('ad-container my-6 mx-auto w-full max-w-4xl', className)}>
      <Suspense fallback={<div className="h-24 animate-pulse bg-gray-100 rounded-md" />}>
        <AdPlaceholder type={type} />
      </Suspense>
    </div>
  );
};
