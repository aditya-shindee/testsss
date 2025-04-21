
import Header from "@/components/Header";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const ExamCategories = () => {
  const navigate = useNavigate();
  
  const examCategories = [
    {
      code: "SSC-CGL",
      fullName: "Staff Selection Commission – Combined Graduate Level Examination",
      bgImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000&auto=format&fit=crop",
    },
    {
      code: "SSC-CPO",
      fullName: "Staff Selection Commission – Central Police Organisation Examination",
      bgImage: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1000&auto=format&fit=crop",
    },
    {
      code: "SSC-HSC",
      fullName: "Staff Selection Commission – Higher Secondary Level Examination (CHSL)",
      bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop",
    },
    {
      code: "SSC-MTS",
      fullName: "Staff Selection Commission – Multi Tasking Staff Examination",
      bgImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  const TierSelector = ({ examType }: { examType: string }) => (
    <div className="grid grid-cols-2 gap-4 p-4">
      {[1, 2].map((tier) => (
        <button
          key={tier}
          onClick={() => navigate(`/exam-categories/${examType}-tier${tier}`)}
          className={cn(
            "relative group overflow-hidden rounded-xl p-6 transition-all duration-300",
            "bg-gradient-to-br from-[#002B5B]/80 to-[#002B5B]/60 hover:from-[#002B5B]/90 hover:to-[#002B5B]/70",
            "transform hover:scale-105",
            "border border-white/20 backdrop-blur-sm"
          )}
        >
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-2">
              Tier {tier}
            </h3>
            <p className="text-white/80 text-sm">
              Begin your {examType.toUpperCase()} Tier {tier} preparation journey
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      ))}
    </div>
  );

  const handleExamClick = (examCode: string) => {
    if (examCode === "SSC-HSC") {
      navigate("/exam-categories/ssc-hsc");
    } else if (examCode === "SSC-MTS") {
      navigate("/exam-categories/ssc-mts");
    }
  };

  return (
    <div className="min-h-screen bg-[#FEF6F1]">
      <Header />
      
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#002B5B] mb-4">
            Select Your Exam Category
          </h1>
          <p className="text-gray-600 text-lg">
            Choose from the exams below to begin your preparation journey.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4 w-full max-w-5xl mx-auto">
          {examCategories.map((exam) => {
            const isMultiTier = exam.code === "SSC-CGL" || exam.code === "SSC-CPO";

            const ExamCard = () => (
              <div className="relative h-[400px] group cursor-pointer overflow-hidden rounded-xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ 
                    backgroundImage: `url(${exam.bgImage})`,
                    filter: 'blur(2px) brightness(0.7)'
                  }}
                />
                
                <div className="relative h-full p-6 flex flex-col justify-between bg-gradient-to-t from-black/60 to-transparent">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {exam.code}
                    </h3>
                    <ArrowRight className="text-white opacity-60" />
                  </div>
                  <div>
                    <p className="text-white/90 text-sm leading-tight">
                      {exam.fullName}
                    </p>
                  </div>
                </div>
              </div>
            );

            return isMultiTier ? (
              <Dialog key={exam.code}>
                <DialogTrigger asChild>
                  <div className="cursor-pointer">
                    <ExamCard />
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] bg-[#FEF6F1] border-[#002B5B]/20">
                  <DialogTitle className="text-2xl font-bold text-[#002B5B] mb-6 text-center">
                    Select Your {exam.code} Tier
                  </DialogTitle>
                  <TierSelector examType={exam.code.toLowerCase()} />
                </DialogContent>
              </Dialog>
            ) : (
              <div key={exam.code} onClick={() => handleExamClick(exam.code)}>
                <ExamCard />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExamCategories;
