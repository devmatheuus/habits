export const generateProgressPercentage = (
  total: number,
  completed: number
) => {
  return Math.round((total / completed) * 100);
};
