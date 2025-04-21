
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface QuizHeaderProps {
  testTitle: string;
  formattedTime: string;
  attemptedCount: number;
  totalQuestions: number;
  showSubmitDialog: boolean;
  setShowSubmitDialog: (show: boolean) => void;
  onSubmitQuiz: () => void;
}

export const QuizHeader = ({
  testTitle,
  formattedTime,
  attemptedCount,
  totalQuestions,
  showSubmitDialog,
  setShowSubmitDialog,
  onSubmitQuiz,
}: QuizHeaderProps) => {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#002B5B]">
          {testTitle}
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md">
            <Clock className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-600">{formattedTime}</span>
          </div>
          <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
            <Button 
              variant="default" 
              onClick={() => setShowSubmitDialog(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Submit Quiz
            </Button>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Submit Quiz?</AlertDialogTitle>
                <AlertDialogDescription>
                  You've attempted {attemptedCount} out of {totalQuestions} questions. Are you sure you want to submit?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onSubmitQuiz}>Submit Quiz</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};
