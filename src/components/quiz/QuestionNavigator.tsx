import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { QUESTION_MODULES } from "@/hooks/useQuizState";
import { QUESTION_STATUS_COLORS } from "./constants/colors";
import { QuestionSection } from "./components/QuestionSection";
import { useEffect, useMemo, useState } from "react";

interface QuestionResponse {
  questionId: number;
  selectedAnswer: string | null;
  isMarkedForReview: boolean;
  visited: boolean;
  isCorrect?: boolean;
}

interface QuestionNavigatorProps {
  questions: any[];
  responses: QuestionResponse[];
  currentQuestion: number;
  onQuestionSelect: (index: number) => void;
  showAnswers?: boolean;
}

export const QuestionNavigator = ({
  questions,
  responses,
  currentQuestion,
  onQuestionSelect,
  showAnswers = false,
}: QuestionNavigatorProps) => {
  // Map question index to section name for fast lookup
  const indexToSection: Record<number, string> = useMemo(() => {
    const map: Record<number, string> = {};
    questions.forEach((q, idx) => {
      map[idx] = q.question_type;
    });
    return map;
  }, [questions]);

  // Determine section for current question
  const currentSection = indexToSection[currentQuestion];

  // Opened section name state
  const [openSection, setOpenSection] = useState(currentSection);

  // Auto-open section when currentQuestion changes
  useEffect(() => {
    if (currentSection) {
      setOpenSection(currentSection);
    }
  }, [currentSection]);

  // Organize questions by section/module based on question_type, keep track of indexes
  const questionsBySection = useMemo(() => {
    return questions.reduce((acc, question, index) => {
      const section = question.question_type;
      if (!acc[section]) {
        acc[section] = [];
      }
      acc[section].push({ ...question, index });
      return acc;
    }, {} as Record<string, any[]>);
  }, [questions]);

  return (
    <Card className="w-[300px] bg-white shadow-md rounded-lg h-fit">
      <CardHeader className="bg-[#002B5B] text-white p-4 rounded-t-lg">
        <h2 className="text-lg font-bold">Question Navigator</h2>
      </CardHeader>
      
      <CardContent className="p-4">
        {QUESTION_MODULES.map((section) => {
          const sectionQuestions = questionsBySection[section] || [];
          if (sectionQuestions.length === 0) return null;

          return (
            <QuestionSection
              key={section}
              title={section}
              questions={sectionQuestions}
              responses={responses}
              currentQuestion={currentQuestion}
              showAnswers={showAnswers}
              onQuestionSelect={onQuestionSelect}
              open={openSection === section}
              onOpenChange={(open: boolean) => {
                setOpenSection(open ? section : "");
              }}
            />
          );
        })}
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-6">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${QUESTION_STATUS_COLORS.NOT_VISITED}`}></div>
            <span className="text-sm">Not Visited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${QUESTION_STATUS_COLORS.ANSWERED}`}></div>
            <span className="text-sm">Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${QUESTION_STATUS_COLORS.NOT_ANSWERED}`}></div>
            <span className="text-sm">Not Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${QUESTION_STATUS_COLORS.MARKED_FOR_REVIEW}`}></div>
            <span className="text-sm">Marked for Review</span>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-semibold mb-2">Quiz Summary</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Attempted:</span>
              <span className="font-medium">
                {responses.filter(r => r.selectedAnswer !== null).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Not Attempted:</span>
              <span className="font-medium">
                {questions.length - responses.filter(r => r.selectedAnswer !== null).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Marked for Review:</span>
              <span className="font-medium">
                {responses.filter(r => r.isMarkedForReview).length}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
