
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { ArrowLeft, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExamPatternCard } from "@/components/ExamPatternCard";
import { previousPapers } from "@/data/previousPapers";

const PaperCard = ({ paper, onClick }: { paper: typeof previousPapers[0]; onClick: () => void }) => {
  return (
    <Card 
      onClick={onClick}
      className="relative h-[200px] group cursor-pointer overflow-hidden rounded-xl transform transition-all duration-300 hover:scale-105"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ 
          backgroundImage: `url(https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2940&auto=format&fit=crop)`,
          filter: 'blur(2px) brightness(0.7)'
        }}
      />
      
      <div className="relative h-full p-6 flex flex-col justify-between bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex items-center gap-4">
          <FileText className="text-white w-6 h-6" />
          <h3 className="text-lg font-medium text-white">
            {paper.title}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-white/90">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{paper.duration} minutes</span>
        </div>
      </div>
    </Card>
  );
};

const PreviousPapers = () => {
  const { examPath } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FEF6F1]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        {/* Title and Description */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#002B5B] mb-4">
            SSC CGL Tier 1 Previous Year Papers
          </h1>
          <p className="text-gray-600">
            Practice with official SSC CGL previous year question papers
          </p>
        </div>

        {/* Exam Pattern Card */}
        <ExamPatternCard />

        {/* Previous Papers Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {previousPapers.map((paper) => (
            <PaperCard
              key={paper.id}
              paper={paper}
              onClick={() => navigate(`/exam-categories/${examPath}/previous-papers/${paper.titleId}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviousPapers;
