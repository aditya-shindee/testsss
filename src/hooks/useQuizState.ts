
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { kebabToSnake } from '@/lib/utils';
import { toast } from 'sonner';

interface Question {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  question_type: string;
  question_sequence: number;
  explanation: string;
  quiz_sequence?: number; // Added as optional property
}

interface QuestionResponse {
  questionId: number;
  selectedAnswer: string | null;
  isMarkedForReview: boolean;
  visited: boolean;
  isCorrect?: boolean; // Add this property to fix the TypeScript errors
}

// Define standard question modules/types for SSC exams
export const QUESTION_MODULES = [
  'General Intelligence & Reasoning',
  'General Awareness',
  'Quantitative Aptitude',
  'English Comprehension'
];

export const useQuizState = (examPath: string, paperId: string) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        // Check if the route includes 'previous-papers'
        const isPreviousPapers = examPath.includes('previous-papers');
        
        // Convert exam path and paper ID to snake case for DB query
        const examPathSnake = kebabToSnake(examPath.replace('/previous-papers', '').replace('previous-papers/', ''));
        const quizSubType = kebabToSnake(paperId);
        
        console.log('Fetching questions with params:', {
          examPath: examPathSnake,
          quizSubType,
          quizType: isPreviousPapers ? 'previous_papers' : undefined
        });
        
        const query = supabase
          .from('ssc_fullquestions_master')
          .select('*')
          .eq('exam_categories', examPathSnake)
          .eq('quiz_sub_type', quizSubType);
        
        // Add quiz_type filter for previous papers
        if (isPreviousPapers) {
          query.eq('quiz_type', 'previous_papers');
        }
        
        const { data, error } = await query.order('quiz_sequence', { ascending: true });
        
        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        
        if (!data || data.length === 0) {
          toast.error('No questions found for this exam');
          setError('No questions found for this exam. Please try another one.');
          return;
        }

        console.log('Fetched questions:', data.length);
        
        // Organize questions by section/module based on question sequence
        const organizedQuestions = organizeQuestionsBySection(data);
        setQuestions(organizedQuestions);
        initializeResponses(organizedQuestions);
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Failed to load questions. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [examPath, paperId]);

  // Organize questions by section (25 per section)
  const organizeQuestionsBySection = (questions: any[]): Question[] => {
    // Sort questions by question_sequence to ensure they're in order
    const sortedQuestions = [...questions].sort((a, b) => 
      (a.question_sequence || 0) - (b.question_sequence || 0)
    );
    
    // For each question, determine the module based on its position
    return sortedQuestions.map((question, index) => {
      // Calculate which module this question belongs to (0-24 → module 1, 25-49 → module 2, etc.)
      const moduleIndex = Math.floor(index / 25);
      const moduleType = QUESTION_MODULES[moduleIndex] || "General Questions";
      
      // Return the question with the updated question_type
      return {
        ...question,
        question_type: moduleType.trim()
      };
    });
  };

  const initializeResponses = (questions: Question[]) => {
    setResponses(
      questions.map((_, index) => ({
        questionId: index,
        selectedAnswer: null,
        isMarkedForReview: false,
        visited: index === 0,
        isCorrect: undefined // Initialize isCorrect as undefined
      }))
    );
  };

  return {
    questions,
    responses,
    setResponses,
    currentQuestion,
    setCurrentQuestion,
    isLoading,
    error
  };
};
