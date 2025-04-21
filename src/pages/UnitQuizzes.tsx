
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const QuizCard = ({ number, onClick }: { number: number; onClick: () => void }) => (
  <Card 
    onClick={onClick}
    className="relative h-[200px] group cursor-pointer overflow-hidden rounded-xl transform transition-all duration-300 hover:scale-105"
  >
    <div 
      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
      style={{ 
        backgroundImage: `url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000)`,
        filter: 'blur(2px) brightness(0.7)'
      }}
    />
    
    <div className="relative h-full p-6 flex flex-col justify-between bg-gradient-to-t from-black/60 to-transparent">
      <div className="flex items-center gap-4">
        <BookOpen className="text-white w-6 h-6" />
        <h3 className="text-lg font-medium text-white">
          Quiz {number}
        </h3>
      </div>
      <p className="text-white/90 text-sm">
        30 questions • 15 minutes
      </p>
    </div>
  </Card>
);

const UnitQuizzes = () => {
  const { examPath, module, unit } = useParams();
  const navigate = useNavigate();
  
  const formattedUnit = unit ? unit.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') : '';

  return (
    <div className="min-h-screen bg-[#FEF6F1]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-10">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          <h1 className="text-4xl font-bold text-[#002B5B] mb-4">
            {formattedUnit}
          </h1>
          <p className="text-gray-600 text-lg">
            Select a quiz to begin your practice session
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 10 }, (_, i) => (
            <QuizCard 
              key={i} 
              number={i + 1} 
              onClick={() => navigate(`/exam-categories/${examPath}/${module}/${unit}/quiz${i + 1}/quiz`)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnitQuizzes;
