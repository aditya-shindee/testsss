import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizControls } from "./QuizControls";

interface QuestionPanelProps {
  currentQuestionObj: any;
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  showAnswers?: boolean;
  correctAnswer?: string;
  // Add the controls props
  isMarkedForReview?: boolean;
  onPreviousQuestion?: () => void;
  onNextQuestion?: () => void;
  onClearResponse?: () => void;
  onMarkForReview?: () => void;
}

export const QuestionPanel = ({
  currentQuestionObj,
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  showAnswers = false,
  correctAnswer,
  // Control props with defaults
  isMarkedForReview = false,
  onPreviousQuestion = () => {},
  onNextQuestion = () => {},
  onClearResponse = () => {},
  onMarkForReview = () => {},
}: QuestionPanelProps) => {
  if (!currentQuestionObj) return null;

  return (
    <div className="flex-grow mb-6 md:mb-0 w-[70%] h-full min-h-[400px] max-h-[75vh] flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full font-medium text-sm">
            {"Question " + (currentQuestion + 1) + " of " + totalQuestions}
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full font-medium text-sm">
            {currentQuestionObj.question_type}
          </Badge>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-4 grow max-h-[62vh] overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-3">
              {currentQuestionObj.question_text}
            </h2>
          </div>
          
          <RadioGroup 
            onValueChange={onSelectAnswer} 
            value={selectedAnswer || undefined}
            className="space-y-3"
            disabled={showAnswers}
          >
            {['option_a', 'option_b', 'option_c', 'option_d'].map((optionKey, idx) => (
              <div key={optionKey} className={cn(
                "flex items-center border rounded-lg p-4 transition-all",
                showAnswers && currentQuestionObj[optionKey] === correctAnswer && "border-2 border-green-500 bg-green-50",
                showAnswers && selectedAnswer === currentQuestionObj[optionKey] && selectedAnswer !== correctAnswer && "border-2 border-red-500 bg-red-50",
                !showAnswers && selectedAnswer === currentQuestionObj[optionKey] && "border-2 border-blue-500 bg-blue-50",
                !showAnswers && "border-gray-200 hover:border-gray-300"
              )}>
                <RadioGroupItem
                  value={currentQuestionObj[optionKey]}
                  id={`option-${idx}`}
                  className="mr-3"
                />
                <label htmlFor={`option-${idx}`} className="flex-grow cursor-pointer">
                  <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>
                  {currentQuestionObj[optionKey]}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      {/* Controls pinned to bottom for easier access */}
      {!showAnswers && (
        <div className="mt-4">
          <QuizControls
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
            isMarkedForReview={isMarkedForReview}
            hasSelectedAnswer={!!selectedAnswer}
            onPreviousQuestion={onPreviousQuestion}
            onNextQuestion={onNextQuestion}
            onClearResponse={onClearResponse}
            onMarkForReview={onMarkForReview}
          />
        </div>
      )}

      {showAnswers && currentQuestionObj.explanation && (
        <Collapsible className="mt-6 border border-gray-200 rounded-lg">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between p-4 font-medium">
              <span>View Explanation</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0 text-sm bg-gray-50">
            <p>{currentQuestionObj.explanation}</p>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};
