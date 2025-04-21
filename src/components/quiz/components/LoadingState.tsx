
import { QuizLayout } from '../layout/QuizLayout';

export const LoadingState = () => {
  return (
    <QuizLayout>
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="animate-pulse text-[#002B5B] text-lg">
          Loading quiz questions...
        </div>
      </div>
    </QuizLayout>
  );
};
