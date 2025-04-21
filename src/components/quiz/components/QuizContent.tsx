
import { useState } from 'react';
import { QuestionNavigator } from '../QuestionNavigator';
import { QuestionPanel } from '../QuestionPanel';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface QuizContentProps {
  questions: any[];
  responses: any[];
  currentQuestion: number;
  onJumpToQuestion: (index: number) => void;
  onSelectAnswer: (answer: string) => void;
  onClearResponse: () => void;
  onMarkForReview: () => void;
}

export const QuizContent = ({
  questions,
  responses,
  currentQuestion,
  onJumpToQuestion,
  onSelectAnswer,
  onClearResponse,
  onMarkForReview
}: QuizContentProps) => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const currentResponse = responses[currentQuestion];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:flex md:gap-6">
      <QuestionPanel
        currentQuestionObj={questions[currentQuestion]}
        currentQuestion={currentQuestion}
        totalQuestions={questions.length}
        selectedAnswer={currentResponse?.selectedAnswer}
        onSelectAnswer={onSelectAnswer}
        isMarkedForReview={currentResponse?.isMarkedForReview || false}
        onPreviousQuestion={() => onJumpToQuestion(currentQuestion - 1)}
        onNextQuestion={() => onJumpToQuestion(currentQuestion + 1)}
        onClearResponse={onClearResponse}
        onMarkForReview={onMarkForReview}
      />
      
      <QuestionNavigator
        questions={questions}
        responses={responses}
        currentQuestion={currentQuestion}
        onQuestionSelect={onJumpToQuestion}
      />
      
      <Sheet open={showMobileSidebar} onOpenChange={setShowMobileSidebar}>
        <SheetTrigger asChild>
          <Button variant="secondary" className="md:hidden mt-4">
            Questions
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] p-0">
          <div className="bg-[#002B5B] text-white p-4">
            <h2 className="text-lg font-bold">Question Navigator</h2>
          </div>
          <div className="p-4">
            <QuestionNavigator
              questions={questions}
              responses={responses}
              currentQuestion={currentQuestion}
              onQuestionSelect={(index) => {
                onJumpToQuestion(index);
                setShowMobileSidebar(false);
              }}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
