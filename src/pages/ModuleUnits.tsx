
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Unit {
  title: string;
  titleId: string;
}

interface ModuleData {
  [key: string]: {
    title: string;
    units: Unit[];
  };
}

const moduleData: ModuleData = {
  "quantitative-aptitude": {
    title: "Quantitative Aptitude",
    units: [
      { title: "Number System", titleId: "number-system" },
      { title: "Simplification", titleId: "simplification" },
      { title: "HCF and LCM", titleId: "hcf-and-lcm" },
      { title: "Ratio and Proportion", titleId: "ratio-and-proportion" },
      { title: "Percentage", titleId: "percentage" },
      { title: "Profit and Loss", titleId: "profit-and-loss" },
      { title: "Simple and Compound Interest", titleId: "simple-and-compound-interest" },
      { title: "Time - Speed - Distance", titleId: "time-speed-distance" },
      { title: "Time and Work", titleId: "time-and-work" },
      { title: "Averages", titleId: "averages" },
      { title: "Mixtures amd Allegations", titleId: "mixtures-and-allegations" },
      { title: "Algebra - Basic Equations and Identities", titleId: "algebra-basic-equations-and-identities" },
      { title: "Geometry - Lines - Angles - Triangles - Circles", titleId: "geometry-lines-angles-triangles-circles" },
      { title: "Mensuration - 2D and 3D", titleId: "mensuration-2d-and-3d" },
      { title: "Trigonometry - Heights and Distances", titleId: "trigonometry-heights-and-distances" },
      { title: "Data Interpretation - Tables - Pie Charts - Bar Graphs", titleId: "data-interpretation-tables-pie-charts-bar-graphs" },
      { title: "Probability", titleId: "probability" },
      { title: "Permutation and Combination", titleId: "permutation-and-combination" }
    ]
  },
  "general-intelligence-reasoning": {
    title: "General Intelligence & Reasoning",
    units: [
      { title: "Analogy", titleId: "analogy" },
      { title: "Classification", titleId: "classification" },
      { title: "Series - Number - Alphabetic - Figure", titleId: "series-number-alphabetic-figure" },
      { title: "Coding-Decoding", titleId: "coding-decoding" },
      { title: "Blood Relations", titleId: "blood-relations" },
      { title: "Direction Sense", titleId: "direction-sense" },
      { title: "Venn Diagrams", titleId: "venn-diagrams" },
      { title: "Syllogism", titleId: "syllogism" },
      { title: "Statement and Conclusion", titleId: "statement-and-conclusion" },
      { title: "Statement and Assumption", titleId: "statement-and-assumption" },
      { title: "Seating Arrangement - Linear and Circular", titleId: "seating-arrangement-linear-and-circular" },
      { title: "Puzzles", titleId: "puzzles" },
      { title: "Data Sufficiency", titleId: "data-sufficiency" },
      { title: "Matrix-based Reasoning", titleId: "matrix-based-reasoning" },
      { title: "Non-Verbal Reasoning - Mirror - Water - Paper Folding - Embedded Figures", titleId: "non-verbal-reasoning-mirror-water-paper-folding-embedded-figures" }
    ]
  },
  "english-comprehension": {
    title: "English Comprehension",
    units: [
      { title: "Reading Comprehension", titleId: "reading-comprehension" },
      { title: "Cloze Test", titleId: "cloze-test" },
      { title: "Fill in the Blanks", titleId: "fill-in-the-blanks" },
      { title: "Error Spotting", titleId: "error-spotting" },
      { title: "Sentence Improvement", titleId: "sentence-improvement" },
      { title: "One Word Substitution", titleId: "one-word-substitution" },
      { title: "Idioms and Phrases", titleId: "idioms-and-phrases" },
      { title: "Synonyms and Antonyms", titleId: "synonyms-and-antonyms" },
      { title: "Para Jumbles", titleId: "para-jumbles" },
      { title: "Active and Passive Voice", titleId: "active-and-passive-voice" },
      { title: "Direct and Indirect Speech", titleId: "direct-and-indirect-speech" },
      { title: "Spelling Correction", titleId: "spelling-correction" }
    ]
  },
  "general-awareness": {
    title: "General Awareness",
    units: [
      { title: "History - Ancient - Medieval - Modern", titleId: "history-ancient-medieval-modern" },
      { title: "Geography - India and World", titleId: "geography-india-and-world" },
      { title: "Indian Polity and Constitution", titleId: "indian-polity-and-constitution" },
      { title: "Economics Basics - Budget - Banking", titleId: "economics-basics-budget-banking" },
      { title: "General Science - Physics - Chemistry - Biology", titleId: "general-science-physics-chemistry-biology" },
      { title: "Static GK - Books - Awards - Important Days", titleId: "static-gk-books-awards-important-days" },
      { title: "Current Affairs - National and International", titleId: "current-affairs-national-and-international" },
      { title: "Government Schemes", titleId: "government-schemes" },
      { title: "Computer Awareness", titleId: "computer-awareness" },
      { title: "Art and Culture", titleId: "art-and-culture" },
      { title: "Sports and Games", titleId: "sports-and-games" },
      { title: "Environment and Ecology", titleId: "environment-and-ecology" }
    ]
  }
};

const UnitCard = ({ title, onClick }: { title: string; onClick: () => void }) => (
  <Card 
    onClick={onClick}
    className="relative h-[200px] group cursor-pointer overflow-hidden rounded-xl transform transition-all duration-300 hover:scale-105"
  >
    <div 
      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
      style={{ 
        backgroundImage: `url(https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=1000)`,
        filter: 'blur(2px) brightness(0.7)'
      }}
    />
    
    <div className="relative h-full p-6 flex flex-col justify-between bg-gradient-to-t from-black/60 to-transparent">
      <div className="flex items-center gap-4">
        <BookOpen className="text-white w-6 h-6" />
        <h3 className="text-lg font-medium text-white">
          {title}
        </h3>
      </div>
      <p className="text-white/90 text-sm">
        10 quizzes available
      </p>
    </div>
  </Card>
);

const ModuleUnits = () => {
  const { module, examPath } = useParams();
  const navigate = useNavigate();
  const moduleInfo = module ? moduleData[module] : null;

  if (!moduleInfo) {
    return <div>Module not found</div>;
  }

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
            {moduleInfo.title}
          </h1>
          <p className="text-gray-600 text-lg">
            Each unit contains 10 quizzes with 30 questions each. Select a unit to begin.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {moduleInfo.units.map((unit, index) => (
            <UnitCard
              key={index}
              title={unit.title}
              onClick={() => navigate(`/exam-categories/${examPath}/${module}/${unit.titleId}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModuleUnits;
