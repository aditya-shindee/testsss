
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { QuestionButton } from "./QuestionButton";

interface QuestionSectionProps {
  title: string;
  questions: Array<{ index: number }>;
  responses: any[];
  currentQuestion: number;
  showAnswers?: boolean;
  onQuestionSelect: (index: number) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const QuestionSection = ({
  title,
  questions,
  responses,
  currentQuestion,
  showAnswers = false,
  onQuestionSelect,
  open = false,
  onOpenChange,
}: QuestionSectionProps) => {
  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-semibold mb-2 hover:text-blue-600">
        <span>{title}</span>
        <ChevronDown className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {questions.map((question) => (
            <QuestionButton
              key={question.index}
              index={question.index}
              currentQuestion={currentQuestion}
              response={responses[question.index]}
              showAnswers={showAnswers}
              onClick={() => onQuestionSelect(question.index)}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
