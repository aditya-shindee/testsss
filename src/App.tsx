
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ExamCategories from "./pages/ExamCategories";
import ExamLayout from "./pages/ExamLayout";
import ModuleUnits from "./pages/ModuleUnits";
import UnitQuizzes from "./pages/UnitQuizzes";
import QuizPage from "./pages/QuizPage";
import MockTestSeries from "./pages/MockTestSeries";
import PreviousPapers from "./pages/PreviousPapers";
import FullLengthQuizPage from "./pages/FullLengthQuizPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/exam-categories" element={<ExamCategories />} />
          
          {/* Exam layout routes */}
          <Route path="/exam-categories/ssc-cgl-tier1" element={<ExamLayout />} />
          <Route path="/exam-categories/ssc-cgl-tier2" element={<ExamLayout />} />
          <Route path="/exam-categories/ssc-cpo-tier1" element={<ExamLayout />} />
          <Route path="/exam-categories/ssc-cpo-tier2" element={<ExamLayout />} />
          <Route path="/exam-categories/ssc-hsc" element={<ExamLayout />} />
          <Route path="/exam-categories/ssc-mts" element={<ExamLayout />} />
          
          {/* Module and unit routes */}
          <Route path="/exam-categories/:examPath/:module" element={<ModuleUnits />} />
          <Route path="/exam-categories/:examPath/:module/:unit" element={<UnitQuizzes />} />
          <Route path="/exam-categories/:examPath/:module/:unit/:quizNumber/quiz" element={<QuizPage />} />
          
          {/* Mock test series route - direct to full length quiz */}
          <Route path="/exam-categories/:examPath/mock-test-series/:paperId" element={<FullLengthQuizPage />} />
          
          {/* Previous papers route - direct to full length quiz */}
          <Route path="/exam-categories/:examPath/previous-papers/:paperId" element={<FullLengthQuizPage />} />
          
          {/* Mock test and previous papers listing pages */}
          <Route path="/exam-categories/:examPath/mock-test-series" element={<MockTestSeries />} />
          <Route path="/exam-categories/:examPath/previous-papers" element={<PreviousPapers />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

