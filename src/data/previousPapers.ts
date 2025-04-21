
export interface PreviousPaper {
  id: string;
  title: string;
  titleId: string;
  duration: number;
  totalQuestions: number;
}

export const previousPapers: PreviousPaper[] = [
  {
    id: "1",
    title: "SSC CGL 2024 Tier-I Paper (09 Sept, 2024 Shift 1)",
    titleId: "ssc-cgl-2024-tier-i-paper-09-sept-2024-shift-1",
    duration: 60,
    totalQuestions: 100
  },
  {
    id: "2",
    title: "SSC CGL 2024 Tier-I Paper (09 Sept, 2024 Shift 2)",
    titleId: "ssc-cgl-2024-tier-i-paper-09-sept-2024-shift-2",
    duration: 60,
    totalQuestions: 100
  }
];
