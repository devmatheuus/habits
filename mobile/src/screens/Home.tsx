import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

import { DAY_SIZE, HabitDay } from '../components/HabitDay';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { api } from '../lib/axios';
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning';

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromYearStart = generateDatesFromYearBeginning();

const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFillArray =
  minimumSummaryDatesSizes - datesFromYearStart.length;

interface ISummary {
  id: string;
  date: Date;
  completed: number;
  amount: number;
}

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<ISummary[]>([]);

  const { navigate } = useNavigation();

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await api.get("summary");

      setSummary(response.data);
    } catch (error) {
      Alert.alert("Ops", "não foi possível carregar o sumário de hábitos");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, i) => (
          <Text
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            key={`${weekDay} - ${i}`}
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map((date) => {
            const dayWithHabits = summary.find((day) => {
              return dayjs(date).isSame(day.date, "day");
            });

            return (
              <HabitDay
                date={date.toString()}
                amountOfCompleted={dayWithHabits?.completed}
                amountOfHabits={dayWithHabits?.amount}
                key={date.toISOString()}
                onPress={() => navigate("habit", { date: date.toISOString() })}
              />
            );
          })}

          {amountOfDaysToFillArray > 0 &&
            Array.from({ length: amountOfDaysToFillArray }).map((_, i) => (
              <View
                key={i}
                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 h-10 w-10 opacity-40"
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};
