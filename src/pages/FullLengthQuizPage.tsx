import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { AlertTriangle, ChevronRight, Timer, CheckCircle, XCircle, HelpCircle, ArrowLeft } from 'lucide-react';
import { mockTests } from '@/data/mocktest2';
import { previousPapers } from '@/data/previousPapers';
import { useQuizState } from '@/hooks/useQuizState';
import { useQuizTimer } from '@/hooks/useQuizTimer';
import { QuestionNavigator } from '@/components/quiz/QuestionNavigator';
import { QuestionPanel } from '@/components/quiz/QuestionPanel';
import { QuizHeader } from '@/components/quiz/QuizHeader';
import { QuizControls } from '@/components/quiz/QuizControls';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { QUESTION_MODULES } from '@/hooks/useQuizState';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';

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
  sectionPerformance: Record<string, {
    totalQuestions: number;
    correct: number;
    incorrect: number;
    notAttempted: number;
    marks: number;
    feedback: string;
    color: string;
  }>;
}

const FullLengthQuizPage = () => {
  const { examPath, paperId } = useParams();
  const navigate = useNavigate();
  
  const {
    questions,
    responses,
    setResponses,
    currentQuestion,
    setCurrentQuestion,
    isLoading,
    error
  } = useQuizState(examPath!, paperId!);

  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [startTime] = useState<Date>(new Date());
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewQuestion, setReviewQuestion] = useState(0);

  const testTitle = useMemo(() => {
    const mockTest = mockTests.find(test => test.titleId === paperId);
    if (mockTest) return mockTest.title;
    
    const previousPaper = previousPapers.find(paper => paper.titleId === paperId);
    if (previousPaper) return previousPaper.title;
    
    return `${examPath?.toUpperCase()} Exam`;
  }, [examPath, paperId]);

  const handleSubmitQuiz = () => {
    const endTime = new Date();
    const timeDiff = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
    calculateResults(timeDiff);
    setShowSubmitDialog(false);
    setQuizSubmitted(true);
  };

  const { formattedTime, timeInSeconds } = useQuizTimer(60 * 60, () => {
    handleSubmitQuiz();
  });

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

  const calculateResults = (timeTakenInSeconds: number) => {
    if (!questions) return;

    const sectionPerformance: Record<string, {
      totalQuestions: number;
      correct: number;
      incorrect: number;
      notAttempted: number;
      marks: number;
      feedback: string;
      color: string;
    }> = {};

    QUESTION_MODULES.forEach(module => {
      sectionPerformance[module] = {
        totalQuestions: 0,
        correct: 0,
        incorrect: 0,
        notAttempted: 0,
        marks: 0,
        feedback: '',
        color: ''
      };
    });

    const evaluatedResponses = responses.map((response, index) => {
      const question = questions[index];
      const section = question.question_type;
      
      sectionPerformance[section] = sectionPerformance[section] || {
        totalQuestions: 0,
        correct: 0,
        incorrect: 0,
        notAttempted: 0,
        marks: 0,
        feedback: '',
        color: ''
      };
      
      sectionPerformance[section].totalQuestions++;
      
      if (!response.selectedAnswer) {
        sectionPerformance[section].notAttempted++;
        return response;
      }
      
      const isCorrect = response.selectedAnswer === question.correct_answer;
      
      if (isCorrect) {
        sectionPerformance[section].correct++;
        sectionPerformance[section].marks += 2;
      } else {
        sectionPerformance[section].incorrect++;
        sectionPerformance[section].marks -= 0.5;
      }
      
      return {
        ...response,
        isCorrect
      };
    });
    
    setResponses(evaluatedResponses);

    const attempted = evaluatedResponses.filter(r => r.selectedAnswer !== null).length;
    const correct = evaluatedResponses.filter(r => r.isCorrect).length;
    const incorrect = attempted - correct;
    
    const totalScore = Math.min(100, Math.round((correct * 2 - incorrect * 0.5) * 100) / 100);
    
    const accuracy = attempted ? Math.round((correct / attempted) * 100) : 0;
    const attemptRate = Math.round((attempted / questions.length) * 100);
    
    const minutes = Math.floor(timeTakenInSeconds / 60);
    const seconds = timeTakenInSeconds % 60;
    const timeTaken = `${minutes} min ${seconds} sec`;

    Object.keys(sectionPerformance).forEach(section => {
      const performance = sectionPerformance[section];
      const totalPossible = performance.totalQuestions * 2;
      const scorePercent = (performance.marks / totalPossible) * 100;
      
      if (scorePercent > 70) {
        performance.feedback = "Very good performance";
        performance.color = "text-green-600";
      } else if (scorePercent >= 50) {
        performance.feedback = "Needs revision. Work on this subject.";
        performance.color = "text-orange-500";
      } else {
        performance.feedback = "Revisit and prepare this subject thoroughly.";
        performance.color = "text-red-500";
      }
    });
    
    setQuizResults({
      totalScore,
      totalQuestions: questions.length,
      attempted,
      notAttempted: questions.length - attempted,
      correct,
      incorrect,
      accuracy,
      attemptRate,
      timeTaken,
      sectionPerformance
    });
  };

  const handleReviewQuestion = (index: number) => {
    setReviewQuestion(index);
    setReviewMode(true);
  };

  const handleBackToResults = () => {
    setReviewMode(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FEF6F1]">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="animate-pulse text-[#002B5B] text-lg">
            Loading quiz questions...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FEF6F1]">
        <Header />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] p-4">
          <AlertTriangle className="text-red-500 w-10 h-10 mb-4" />
          <div className="text-red-500 text-center max-w-md">
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p>{error}</p>
            <Button 
              variant="default" 
              className="mt-4"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#FEF6F1]">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-[#002B5B]">No questions found for this quiz.</div>
        </div>
      </div>
    );
  }

  if (quizSubmitted && quizResults && reviewMode) {
    const question = questions[reviewQuestion];
    const response = responses[reviewQuestion];
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Button 
            variant="outline"
            onClick={handleBackToResults}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Results
          </Button>
          
          <div className="flex gap-6">
            <QuestionPanel
              currentQuestionObj={question}
              currentQuestion={reviewQuestion}
              totalQuestions={questions.length}
              selectedAnswer={response?.selectedAnswer}
              onSelectAnswer={() => {}}
              showAnswers={true}
              correctAnswer={question?.correct_answer}
            />
            
            <QuestionNavigator
              questions={questions}
              responses={responses}
              currentQuestion={reviewQuestion}
              onQuestionSelect={handleReviewQuestion}
              showAnswers={true}
            />
          </div>
        </div>
      </div>
    );
  }

  if (quizSubmitted && quizResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-[#002B5B] text-white p-6">
              <h1 className="text-2xl font-bold">Quiz Results</h1>
              <p className="text-lg opacity-90">{testTitle}</p>
            </div>
            
            <div className="p-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-medium text-gray-700">Total Score</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end">
                      <span className="text-3xl font-bold text-blue-700">{quizResults.totalScore.toFixed(1)}</span>
                      <span className="ml-1 text-gray-500 mb-1">/ 100</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-medium text-gray-700">Correct Answers</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end">
                      <span className="text-3xl font-bold text-green-600">{quizResults.correct}</span>
                      <span className="ml-2 text-gray-500 mb-1">{quizResults.correct * 2} marks gained</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-100">
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-medium text-gray-700">Incorrect Answers</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end">
                      <span className="text-3xl font-bold text-red-500">{quizResults.incorrect}</span>
                      <span className="ml-2 text-gray-500 mb-1">{(quizResults.incorrect * 0.5).toFixed(1)} marks lost</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-gray-50 to-slate-50 border-gray-100">
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-medium text-gray-700">Unattempted</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end">
                      <span className="text-3xl font-bold text-gray-500">{quizResults.notAttempted}</span>
                      <span className="ml-2 text-gray-500 mb-1">questions</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <h3 className="text-xl font-semibold text-gray-800">Performance Metrics</h3>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Accuracy</span>
                        <span className="font-medium text-blue-600">{quizResults.accuracy}%</span>
                      </div>
                      <Progress value={quizResults.accuracy} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">Based on correct answers out of attempted questions</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Attempt Rate</span>
                        <span className="font-medium text-blue-600">{quizResults.attemptRate}%</span>
                      </div>
                      <Progress value={quizResults.attemptRate} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">Questions attempted out of total questions</p>
                    </div>
                    
                    <div className="flex items-center">
                      <Timer className="h-5 w-5 mr-2 text-blue-600" />
                      <div>
                        <span className="font-medium">Time Taken: </span>
                        <span>{quizResults.timeTaken}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <h3 className="text-xl font-semibold text-gray-800">Section-wise Performance</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(quizResults.sectionPerformance).map(([section, data], index) => (
                        data.totalQuestions > 0 && (
                          <div key={index} className="border-b pb-3 last:border-0">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">{section}</span>
                              <span className={`font-medium ${data.color}`}>
                                {data.marks.toFixed(1)} / {data.totalQuestions * 2}
                              </span>
                            </div>
                            <p className={`text-sm ${data.color}`}>{data.feedback}</p>
                            <div className="flex text-xs mt-1 space-x-4">
                              <span className="text-green-600">Correct: {data.correct}</span>
                              <span className="text-red-500">Incorrect: {data.incorrect}</span>
                              <span className="text-gray-500">Unattempted: {data.notAttempted}</span>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Question-wise Analysis</h3>
                
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Q.No</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {questions.map((question, index) => {
                        const response = responses[index];
                        let status;
                        let statusIcon;
                        
                        if (!response.selectedAnswer) {
                          status = "Unattempted";
                          statusIcon = <HelpCircle className="h-5 w-5 text-gray-400" />;
                        } else if (response.isCorrect) {
                          status = "Correct";
                          statusIcon = <CheckCircle className="h-5 w-5 text-green-500" />;
                        } else {
                          status = "Incorrect";
                          statusIcon = <XCircle className="h-5 w-5 text-red-500" />;
                        }
                        
                        return (
                          <tr key={index} className={response.selectedAnswer && !response.isCorrect ? "bg-red-50" : ""}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 max-w-md truncate">
                              {question.question_text}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex items-center">
                                {statusIcon}
                                <span className="ml-2">{status}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button 
                                variant="ghost" 
                                onClick={() => handleReviewQuestion(index)}
                                className="text-blue-600 hover:text-blue-800 flex items-center"
                              >
                                Review <ChevronRight className="ml-1 h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/exam-categories/${examPath}`)}
                >
                  Back to Dashboard
                </Button>
                <Button
                  variant="default"
                  onClick={() => window.location.reload()}
                >
                  Take Quiz Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const attemptedCount = responses.filter(r => r.selectedAnswer).length;
  const currentResponse = responses[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <QuizHeader
        testTitle={testTitle}
        formattedTime={formattedTime}
        attemptedCount={attemptedCount}
        totalQuestions={questions.length}
        showSubmitDialog={showSubmitDialog}
        setShowSubmitDialog={setShowSubmitDialog}
        onSubmitQuiz={handleSubmitQuiz}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-6 md:flex md:gap-6">
        <QuestionPanel
          currentQuestionObj={questions[currentQuestion]}
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          selectedAnswer={currentResponse?.selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
          isMarkedForReview={currentResponse?.isMarkedForReview || false}
          onPreviousQuestion={() => handleJumpToQuestion(currentQuestion - 1)}
          onNextQuestion={() => handleJumpToQuestion(currentQuestion + 1)}
          onClearResponse={handleClearResponse}
          onMarkForReview={handleMarkForReview}
        />
        
        <QuestionNavigator
          questions={questions}
          responses={responses}
          currentQuestion={currentQuestion}
          onQuestionSelect={handleJumpToQuestion}
        />
        
        <div className="w-full md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" className="mt-4">
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
                  onQuestionSelect={handleJumpToQuestion}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default FullLengthQuizPage;
