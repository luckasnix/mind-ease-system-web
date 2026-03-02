import { Brain } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-4 bg-background'>
      <div className='w-14 h-14 rounded-2xl bg-primary flex items-center justify-center animate-meditate'>
        <Brain className='w-7 h-7 text-primary-foreground' />
      </div>
    </div>
  );
}
