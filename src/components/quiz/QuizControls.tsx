
import { ArrowLeft, ArrowRight, RefreshCcw, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuizControlsProps {
  currentQuestion: number;
  totalQuestions: number;
  isMarkedForReview: boolean;
  hasSelectedAnswer: boolean;
  onPreviousQuestion: () => void;
  onNextQuestion: () => void;
  onClearResponse: () => void;
  onMarkForReview: () => void;
}

export const QuizControls = ({
  currentQuestion,
  totalQuestions,
  isMarkedForReview,
  hasSelectedAnswer,
  onPreviousQuestion,
  onNextQuestion,
  onClearResponse,
  onMarkForReview,
}: QuizControlsProps) => {
  return (
    <div className="grid grid-cols-4 gap-5 w-full max-w-[650px] mx-0 mt-3 mb-5">
      <Button
        variant="outline"
        onClick={onPreviousQuestion}
        disabled={currentQuestion === 0}
        className="flex items-center justify-center gap-3 border-purple-200 text-purple-700 hover:bg-purple-50 text-sm h-10 min-w-[90px]"
      >
        <ArrowLeft className="w-4 h-4" />
        Previous
      </Button>
      
      <Button
        variant="outline"
        onClick={onClearResponse}
        disabled={!hasSelectedAnswer}
        className="flex items-center justify-center gap-3 border-purple-200 text-purple-700 hover:bg-purple-50 text-sm h-10 min-w-[90px]"
      >
        <RefreshCcw className="w-4 h-4" />
        Clear Response
      </Button>
      
      <Button
        variant={isMarkedForReview ? "default" : "outline"}
        onClick={onMarkForReview}
        className={cn(
          "flex items-center justify-center gap-2 text-sm h-10 min-w-[90px]",
          isMarkedForReview 
            ? "bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-200"
            : "border-purple-200 text-purple-700 hover:bg-purple-50"
        )}
      >
        <Bookmark className="w-4 h-4" />
        {isMarkedForReview ? "Unmark" : "Marked for Review"}
      </Button>
      
      <Button
        variant="default"
        onClick={onNextQuestion}
        disabled={currentQuestion === totalQuestions - 1}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-sm h-10 min-w-[110px]"
      >
        Save & Next
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
};
