
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuizLayout } from '../layout/QuizLayout';

interface ErrorStateProps {
  error: string;
  onGoBack: () => void;
}

export const ErrorState = ({ error, onGoBack }: ErrorStateProps) => {
  return (
    <QuizLayout>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] p-4">
        <AlertTriangle className="text-red-500 w-10 h-10 mb-4" />
        <div className="text-red-500 text-center max-w-md">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <Button variant="default" className="mt-4" onClick={onGoBack}>
            Go Back
          </Button>
        </div>
      </div>
    </QuizLayout>
  );
};
