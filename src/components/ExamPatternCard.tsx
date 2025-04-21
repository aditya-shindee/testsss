
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SectionDistribution {
  section: string;
  questions: number;
  marks: number;
}

const sectionData: SectionDistribution[] = [
  {
    section: "General Intelligence and Reasoning",
    questions: 25,
    marks: 50,
  },
  {
    section: "General Awareness",
    questions: 25,
    marks: 50,
  },
  {
    section: "Quantitative Aptitude",
    questions: 25,
    marks: 50,
  },
  {
    section: "English Comprehension",
    questions: 25,
    marks: 50,
  },
];

export const ExamPatternCard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-50 rounded-xl p-6 shadow-sm mb-8">
      {/* Left Column - Test Pattern */}
      <div>
        <h3 className="font-bold text-lg mb-4">Test Pattern</h3>
        <ul className="space-y-3 text-gray-800">
          <li>• Total Questions: 100</li>
          <li>• Total Marks: 200 (2 marks per question)</li>
          <li>• Time: 60 minutes</li>
          <li>• Negative Marking: -0.50 marks for wrong answers</li>
        </ul>
      </div>

      {/* Right Column - Section Distribution */}
      <div>
        <h3 className="font-bold text-lg mb-4">Section-wise Distribution</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sections</TableHead>
              <TableHead className="text-center">Questions</TableHead>
              <TableHead className="text-center">Marks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sectionData.map((item) => (
              <TableRow key={item.section}>
                <TableCell>{item.section}</TableCell>
                <TableCell className="text-center">{item.questions}</TableCell>
                <TableCell className="text-center">{item.marks}</TableCell>
              </TableRow>
            ))}
            <TableRow className="font-bold">
              <TableCell>Total</TableCell>
              <TableCell className="text-center">100</TableCell>
              <TableCell className="text-center">200</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p className="text-sm italic text-gray-500 mt-2 pl-2">
          A cumulative time of 60 minutes for all sections
        </p>
      </div>
    </div>
  );
};
