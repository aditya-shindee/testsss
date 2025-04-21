
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QUESTION_STATUS_COLORS } from "../constants/colors";

interface QuestionButtonProps {
  index: number;
  currentQuestion: number;
  response?: {
    selectedAnswer: string | null;
    isMarkedForReview: boolean;
    visited: boolean;
    isCorrect?: boolean;
  };
  showAnswers?: boolean;
  onClick: () => void;
}

export const QuestionButton = ({
  index,
  currentQuestion,
  response,
  showAnswers = false,
  onClick
}: QuestionButtonProps) => {
  const getQuestionStatusColor = () => {
    if (!response) return QUESTION_STATUS_COLORS.NOT_VISITED;
    
    if (showAnswers) {
      if (response.selectedAnswer && response.isCorrect) {
        return QUESTION_STATUS_COLORS.ANSWERED;
      } else if (response.selectedAnswer && !response.isCorrect) {
        return QUESTION_STATUS_COLORS.NOT_ANSWERED;
      }
      return QUESTION_STATUS_COLORS.NOT_VISITED;
    }
    
    if (response.isMarkedForReview) return QUESTION_STATUS_COLORS.MARKED_FOR_REVIEW;
    if (response.selectedAnswer) return QUESTION_STATUS_COLORS.ANSWERED;
    return QUESTION_STATUS_COLORS.NOT_VISITED;
  };

  return (
    <Button
      variant="outline"
      className={cn(
        "h-10 w-10 p-0 font-medium transition-colors",
        getQuestionStatusColor()
      )}
      onClick={onClick}
    >
      {index + 1}
    </Button>
  );
};
