import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning';
import { HabitDay } from './HabitDay';

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;
const amountOfDaysToFillArray: number[] = Array.from({
  length: amountOfDaysToFill,
});

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

export const SummaryTable = () => {
  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, i) => (
          <div
            key={`${weekDay} - ${i}`}
            className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center hover:text-zinc-100"
          >
            {weekDay}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date) => (
          <HabitDay key={date.toString()} />
        ))}

        {amountOfDaysToFillArray?.map((dayToFill) => (
          <div
            key={dayToFill}
            className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
          />
        ))}
      </div>
    </div>
  );
};
