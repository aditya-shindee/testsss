
export interface MockTestInfo {
  title: string;
  titleId: string;
}

export const getMockTestTitle = (titleId: string): MockTestInfo => {
  const mockTestTitles: Record<string, MockTestInfo> = {
    'ssc-cgl-2024-tier-i-paper-09-sept-2024-shift-1': {
      title: 'SSC CGL 2024 Tier-I Official Paper (Held On: 09 Sept, 2024 Shift 1)',
      titleId: 'ssc-cgl-2024-tier-i-paper-09-sept-2024-shift-1'
    },
    'ssc-cgl-2024-tier-i-paper-09-sept-2024-shift-2': {
      title: 'SSC CGL 2024 Tier-I Official Paper (Held On: 09 Sept, 2024 Shift 2)',
      titleId: 'ssc-cgl-2024-tier-i-paper-09-sept-2024-shift-2'
    }
  };

  return mockTestTitles[titleId] || {
    title: titleId,
    titleId: titleId
  };
};
