import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QuizLayout } from '@/components/quiz/layout/QuizLayout';
import { LoadingState } from '@/components/quiz/components/LoadingState';
import { ErrorState } from '@/components/quiz/components/ErrorState';
import { QuizContent } from '@/components/quiz/components/QuizContent';
import { useQuizState } from '@/hooks/useQuizState';
import { useQuizTimer } from '@/hooks/useQuizTimer';
import { createClient } from '@supabase/supabase-js';
import { Clock, BookOpen, CheckCircle, AlertTriangle, Medal, ArrowLeft, ArrowRight, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { QuizHeader } from '@/components/quiz/QuizHeader';

const supabase = createClient(
  'https://pdssugngoavqfycfsjjq.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkc3N1Z25nb2F2cWZ5Y2ZzampxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNDc2ODksImV4cCI6MjA2MDYyMzY4OX0._Oj8XSSrleEUZl_2Q6zu0DQOFOVSV0pe9Et1qbLTn2Y'
);

interface QuizResponse {
  questionId: number;
  selectedAnswer: string | null;
  isCorrect?: boolean;
  isMarkedForReview: boolean;
}

interface QuizResults {
  totalScore: number;
  totalQuestions: number;
  attempted: number;
  notAttempted: number;
  correct: number;
  incorrect: number;
  accuracy: number;
  attemptRate: number;
  timeTaken: string;
}

const QuizPage = () => {
  const { examPath, module, unit, quizNumber } = useParams();
  const navigate = useNavigate();
  
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [startTime] = useState<Date>(new Date());

  const {
    questions,
    responses,
    setResponses,
    currentQuestion,
    setCurrentQuestion,
    isLoading,
    error
  } = useQuizState(examPath!, `${module}/${unit}/${quizNumber}`);

  const convertToUnderscoreFormat = (input) => input?.replace(/-/g, '_');
  
  const exam_path = convertToUnderscoreFormat(examPath);
  const module_path = convertToUnderscoreFormat(module);
  const unit_path = convertToUnderscoreFormat(unit);

  const formatName = (name) => {
    if (!name) return "";
    return name.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const displayModule = formatName(module);
  const displayUnit = formatName(unit);

  const handleSubmitQuiz = () => {
    const endTime = new Date();
    const timeDiff = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
    
    if (!questions) return;

    const evaluatedResponses = responses.map(response => {
      if (!response.selectedAnswer) return response;
      
      const question = questions[response.questionId];
      const isCorrect = response.selectedAnswer === question.correct_answer;
      
      return {
        ...response,
        isCorrect
      };
    });
    
    setResponses(evaluatedResponses);

    const attempted = evaluatedResponses.filter(r => r.selectedAnswer !== null).length;
    const correct = evaluatedResponses.filter(r => r.isCorrect).length;
    const incorrect = attempted - correct;
    
    const totalScore = (correct * 2) - (incorrect * 0.5);
    
    const accuracy = attempted ? Math.round((correct / attempted) * 100) : 0;
    const attemptRate = Math.round((attempted / questions.length) * 100);
    
    const minutes = Math.floor(timeDiff / 60);
    const seconds = timeDiff % 60;
    const timeTaken = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    setQuizSubmitted(true);
    setShowSubmitDialog(false);
  };

  const { formattedTime } = useQuizTimer(15 * 60, handleSubmitQuiz);

  const handleJumpToQuestion = (index: number) => {
    setResponses(prev => 
      prev.map((response, i) => 
        i === index ? { ...response, visited: true } : response
      )
    );
    setCurrentQuestion(index);
  };

  const handleSelectAnswer = (answer: string) => {
    if (quizSubmitted) return;
    setResponses(prev => 
      prev.map((response, i) => 
        i === currentQuestion 
          ? { ...response, selectedAnswer: answer } 
          : response
      )
    );
  };

  const handleClearResponse = () => {
    if (quizSubmitted) return;
    setResponses(prev => 
      prev.map((response, i) => 
        i === currentQuestion 
          ? { ...response, selectedAnswer: null } 
          : response
      )
    );
  };

  const handleMarkForReview = () => {
    if (quizSubmitted) return;
    setResponses(prev => 
      prev.map((response, i) => 
        i === currentQuestion 
          ? { ...response, isMarkedForReview: !response.isMarkedForReview } 
          : response
      )
    );
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} onGoBack={() => navigate(-1)} />;
  if (!questions || questions.length === 0) {
    return (
      <QuizLayout>
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-[#002B5B]">No questions found for this quiz.</div>
        </div>
      </QuizLayout>
    );
  }

  const attemptedCount = responses.filter(r => r.selectedAnswer).length;
  const currentResponse = responses[currentQuestion];

  return (
    <QuizLayout className="bg-gray-50">
      <QuizHeader
        testTitle={`${examPath?.toUpperCase()} Quiz`}
        formattedTime={formattedTime}
        attemptedCount={attemptedCount}
        totalQuestions={questions.length}
        showSubmitDialog={showSubmitDialog}
        setShowSubmitDialog={setShowSubmitDialog}
        onSubmitQuiz={handleSubmitQuiz}
      />
      
      <QuizContent
        questions={questions}
        responses={responses}
        currentQuestion={currentQuestion}
        onJumpToQuestion={handleJumpToQuestion}
        onSelectAnswer={handleSelectAnswer}
        onClearResponse={handleClearResponse}
        onMarkForReview={handleMarkForReview}
      />
    </QuizLayout>
  );
};

export default QuizPage;
