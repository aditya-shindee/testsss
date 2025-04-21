
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface ExamCardProps {
  title: string;
  description: string;
  bgImage: string;
  onClick: () => void;
}

const ExamCard = ({ title, description, bgImage, onClick }: ExamCardProps) => (
  <div 
    onClick={onClick}
    className="relative h-[300px] group cursor-pointer overflow-hidden rounded-xl transform transition-all duration-300 hover:scale-105"
  >
    <div 
      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        filter: 'blur(2px) brightness(0.7)'
      }}
    />
    
    <div className="relative h-full p-6 flex flex-col justify-between bg-gradient-to-t from-black/60 to-transparent">
      <h3 className="text-xl font-bold text-white mb-2">
        {title}
      </h3>
      <p className="text-white/90 text-sm leading-tight">
        {description}
      </p>
    </div>
  </div>
);

const ExamLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [examTitle, setExamTitle] = useState("");
  
  useEffect(() => {
    const path = location.pathname;
    const examCode = path.split("/")[2];
    
    if (examCode === "ssc-cgl-tier1") {
      setExamTitle("SSC CGL Tier 1");
    } else if (examCode === "ssc-cgl-tier2") {
      setExamTitle("SSC CGL Tier 2");
    } else if (examCode === "ssc-cpo-tier1") {
      setExamTitle("SSC CPO Tier 1");
    } else if (examCode === "ssc-cpo-tier2") {
      setExamTitle("SSC CPO Tier 2");
    } else if (examCode === "ssc-hsc") {
      setExamTitle("SSC CHSL");
    } else if (examCode === "ssc-mts") {
      setExamTitle("SSC MTS");
    }
  }, [location.pathname]);

  const moduleWiseContent = [
    {
      title: "Quantitative Aptitude",
      description: "Practice questions module-wise to master each topic individually",
      bgImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2940&auto=format&fit=crop",
      slug: "quantitative-aptitude"
    },
    {
      title: "General Intelligence & Reasoning",
      description: "Strengthen your logical thinking with topic-wise practice",
      bgImage: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2940&auto=format&fit=crop",
      slug: "general-intelligence-reasoning"
    },
    {
      title: "English Comprehension",
      description: "Improve your language skills with focused practice sessions",
      bgImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2946&auto=format&fit=crop",
      slug: "english-comprehension"
    },
    {
      title: "General Awareness",
      description: "Stay updated with current affairs and general knowledge",
      bgImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2940&auto=format&fit=crop",
      slug: "general-awareness"
    },
  ];

  const fullLengthSeries = [
    {
      title: "Mock Test Series 2024",
      description: "Complete mock tests based on latest exam pattern",
      bgImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2940&auto=format&fit=crop",
      slug: "mock-test-series"
    },
    {
      title: "Previous Year Papers",
      description: "Practice with actual questions from past exams",
      bgImage: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2940&auto=format&fit=crop",
      slug: "previous-papers"
    },
    {
      title: "Sectional Tests",
      description: "Focus on specific sections with timed practice",
      bgImage: "https://images.unsplash.com/photo-1550592704-6c76defa9985?q=80&w=2940&auto=format&fit=crop",
      slug: "sectional-tests"
    },
    {
      title: "Custom Tests",
      description: "Create your own test paper from our question bank",
      bgImage: "https://images.unsplash.com/photo-1606326608690-4e0281b1e588?q=80&w=2940&auto=format&fit=crop",
      slug: "custom-tests"
    },
  ];

  return (
    <div className="min-h-screen bg-[#FEF6F1]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#002B5B] mb-4">
            {examTitle}
          </h1>
          <p className="text-gray-600 text-lg">
            Choose the practice method that works best for you
          </p>
        </div>
        
        <div className="space-y-16">
          {/* Module-wise Section */}
          <section>
            <h2 className="text-3xl font-bold text-[#002B5B] mb-8">Module-wise Practice</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {moduleWiseContent.map((item, index) => (
                <ExamCard
                  key={index}
                  {...item}
                  onClick={() => navigate(`${location.pathname}/${item.slug}`)}
                />
              ))}
            </div>
          </section>

          {/* Full Length Series Section */}
          <section>
            <h2 className="text-3xl font-bold text-[#002B5B] mb-8">Full Length Series</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {fullLengthSeries.map((item, index) => (
                <ExamCard
                  key={index}
                  {...item}
                  onClick={() => item.slug ? navigate(`${location.pathname}/${item.slug}`) : {}}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ExamLayout;
