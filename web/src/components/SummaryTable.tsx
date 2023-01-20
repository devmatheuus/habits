import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { api } from '../lib/axios';
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning';
import { HabitDay } from './HabitDay';

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;
const amountOfDaysToFillArray: number[] = Array.from({
  length: amountOfDaysToFill,
});

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

interface ISummary {
  id: string;
  date: string;
  amount: number;
  completed: number;
}

export const SummaryTable = () => {
  const [summary, setSummary] = useState<ISummary[]>([]);

  useEffect(() => {
    api.get("summary").then((res) => setSummary(res.data));
  }, []);

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
        {summaryDates.map((date) => {
          const dayInSummary = summary.find((day) => {
            return dayjs(date).isSame(day.date, "day");
          });

          return (
            <HabitDay
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />
          );
        })}

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
