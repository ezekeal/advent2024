export function countSafeReports(data: string, dampen = false) {
  const reports = data.split('\n').map(line => line.split(' ').map( number => parseInt(number)));
  return reports.filter(report => reportIsSafe(report, dampen)).length;
}

function reportIsSafe(report: number[], dampen = false): boolean {
  const firstDiff = report[0] - report[1]
  if (firstDiff === 0) return dampen ? reportIsSafe(report.slice(1)) : false;
  const consistentTrend = firstDiff > 0 ? isDecreasing : isIncreasing;

  for (let level = 0; level < report.length - 1; level++) {
    const a = report[level];
    const b = report[level + 1];
    const safe = consistentTrend(a, b) && isInTolerance(a, b);
    if (safe) continue;
    if (!dampen) return false;
    return checkVariants(report);
  }

  return true;
}

function checkVariants(report: number[]) {
  return report.some((_l, i, arr) => reportIsSafe([...arr.slice(0, i), ...arr.slice(i + 1)]))
}

function isInTolerance(a: number, b: number): boolean {
  const difference = Math.abs(a - b);
  return difference >= 1 && difference <= 3;
}

function isIncreasing(a: number, b: number): boolean {
  return a < b;
}

function isDecreasing(a: number, b: number): boolean {
  return a > b;
}