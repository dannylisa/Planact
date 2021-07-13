import { DefaultTheme } from '@/style/styled';
import { GroupedEvent, IUserSchedule, IUserEvent } from '@/utils/data';
import { korday } from '@/utils/date';
import React, { useState, useEffect } from 'react';
import { Text } from '@components/materials';
import { View, StyleSheet } from 'react-native';
import ToggleEventList from './ToggleEventList';
import { useDailyList } from '@/modules/userDailyList/hooks';
import useTheme from '@/modules/theme/hooks';
import { useUserSchedule } from '@/modules/userSchedule/hooks';

const groupBySchedule = (
  schedules: IUserSchedule[],
  events: IUserEvent[]
): GroupedEvent[] => {
  if (!events.length) return [];

  const res: { [key: string]: GroupedEvent } = {};

  schedules.forEach((schedule) => {
    res[schedule.schedule.id] = {
      schedule,
      events: [],
    };
  });

  events.forEach((event) => {
    res[event.event.schedule].events.push(event);
  });
  events.sort((a, b) => +a.event.seq - +b.event.seq);
  return Object.values(res).filter(({ events }) => events.length > 0);
};

function DailyView() {
  const theme = useTheme();
  const { getSelectedDaily, selected } = useDailyList();
  const { schedules } = useUserSchedule();
  const { date, events } = getSelectedDaily();

  const { container, title } = React.useMemo(() => styles(theme), [theme]);
  const [groupedEvents, setGroupedEvents] = useState<GroupedEvent[]>([]);

  useEffect(() => {
    const aggregated = groupBySchedule(schedules, [...events]);
    setGroupedEvents(aggregated);
  }, [date]);
  return (
    <View style={container}>
      <View style={title}>
        <Text
          bold
          headings={2}
          content={date.format(`M월 D일 ${korday[date.day()]}요일`)}
        />
      </View>
      {groupedEvents.map(({ schedule, events }, idx) => (
        <ToggleEventList schedule={schedule} events={events} key={idx} />
      ))}
    </View>
  );
}

const styles = (theme: DefaultTheme) => {
  const { mainBackground } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: mainBackground,
      padding: 5,
      paddingHorizontal: 10,
    },
    title: {
      height: 36,
      marginTop: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default DailyView;
