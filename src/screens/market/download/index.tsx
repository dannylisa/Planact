import React, { useMemo, useState } from 'react';
import { AxiosError } from 'axios';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Button as NativeButton,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import dayjs from 'dayjs';
import { DefaultTheme } from '@/style/styled';
import useTheme, { shadow } from '@/modules/theme/hooks';
import { Button, Text, TextButton, TextInput } from '@components/materials';
import { attachSchedule } from '@/api/market/';
import { attachScheduleType } from '@/api/market/attachSchedule';
import { useUserState } from '@/modules/auth/hooks';
import { ISchedule } from '@/utils/data';
import {
  RadioButtonProps,
  RadioButton,
} from 'react-native-radio-buttons-group';
import SelectDay from './SelectDay';
import SelectInterval from './SelectInterval';
import DateTimePickerModal from '@/components/materials/DateTimePickerModal';
import { isToday, korday } from '@/utils/date';
import { useUserSchedule } from '@/modules/userSchedule/hooks';

const RADIO_PROPS: RadioButtonProps[] = [
  { label: '요일 선택', id: '0', selected: true },
  { label: '간격 선택', id: '1', selected: false },
  { label: '매일 하기', id: '2', selected: false },
];

const COLORS = [
  '#FFE4D4',
  '#eff8cc',
  '#C6F2FF',
  '#B8BCFF',
  '#9FC9C7',
  '#FFE0F2',
  '#faa5a9',
  '#343077',
  '#2a7a85',
  '#9C599E',
  '#E6759E',
  '#F89181',
  '#FFCE8F',
  '#FFEDB3',
];

const Today = new Date();
const TwoWeeksLater = dayjs().add(14, 'days').toDate();

export default function MarketScheduleDetails({ route, navigation }) {
  // theme
  const theme = useTheme();
  const {
    container,
    header,
    buttonContainer,
    button,
    item,
    rowInfo,
    selectInterval,
    colorContainer,
    colorRow,
    colorItem,
    colorCircle,
    colorSelected,
  } = useMemo(() => styles(theme), [theme]);

  // Get Detail Data from Navigation
  const { getToken } = useUserState();
  const schedule: ISchedule = route.params.schedule;

  // Set alias
  const [alias, setAlias] = useState<string>(schedule.abb);

  // Radio Button Settings
  const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>(
    RADIO_PROPS.map((prop) => ({
      ...prop,
      labelStyle: {
        color: theme.text,
        fontSize: 16,
      },
    }))
  );
  const onPressRadioButton = (idx: number) =>
    setRadioButtons((prev) => {
      return prev.map((item, index) => ({ ...item, selected: index === idx }));
    });

  // Interval Settings
  const [interval, setInterval] = useState<number>(2);
  const [intervalSelectionVisible, setIntervalSelectionVisible] =
    useState<boolean>(false);
  const toggleIntervalSelectionVisible = () =>
    setIntervalSelectionVisible((prev) => !prev);

  // Color Select
  const [colorIdx, setColorIdx] = useState<number>(0);

  // DatePicker Setting
  const [date, setDate] = useState<Date>(Today);
  const [datepickerVisible, setDatepickerVisible] = useState<boolean>(false);
  const toggleDatepickerVisible = () => setDatepickerVisible((prev) => !prev);
  const [selectedDays, setSelectedDays] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const getStartEndDate = () => {
    const type: attachScheduleType = radioButtons[0].selected
      ? 'weekdays'
      : radioButtons[1].selected
      ? 'interval'
      : 'everyday';

    let start_date = dayjs(date);
    const last = schedule.duration - 1;

    switch (type) {
      case 'weekdays':
        let days = selectedDays
          .map((bool, i) => (bool ? (i + 1) % 7 : -1))
          .filter((i) => i >= 0);
        if (!days.length) return [start_date, dayjs(null)];

        while (!days.includes(start_date.day()))
          start_date = start_date.add(1, 'days');
        // 시작 날짜에 맞춰 요일 조정
        days = days.map((day) => (day - start_date.day() + 7) % 7).sort();
        const freq = days.length;
        const weeks = Math.floor(last / freq);
        const alpha = last % freq;
        return [start_date, start_date.add(weeks * 7 + days[alpha], 'days')];
      case 'interval':
        return [start_date, start_date.add(last * interval, 'days')];
      default:
        return [start_date, start_date.add(last, 'days')];
    }
  };

  const [start_date, end_date] = useMemo(
    () => getStartEndDate(),
    [date, radioButtons, interval, selectedDays]
  );

  // Use attatch api
  const { fetchUserSchedule } = useUserSchedule();
  const attach = async () => {
    const token = await getToken();
    if (!token) return;
    const type: attachScheduleType = radioButtons[0].selected
      ? 'weekdays'
      : radioButtons[1].selected
      ? 'interval'
      : 'everyday';

    if (type === 'weekdays' && selectedDays.every((i) => !i))
      return Alert.alert('요일을 선택해주세요!');

    await attachSchedule({
      type,
      token,
      alias,
      interval,
      weekdays: selectedDays,
      start_date: date,
      color: COLORS[colorIdx],
      schedule_id: schedule.id,
    })
      .then((res) => {
        Alert.alert('플랜이 다운로드 되었습니다.');
      })
      .then(() => {
        fetchUserSchedule();
      })
      .then(() => {
        navigation.push('Market/Main');
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 406)
          Alert.alert('이미 내려받은 스케줄입니다!');
        else Alert.alert(err.response?.data);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={header}>
        <Text bold headings={1} align="left" content={`${schedule.name}`} />
        <Text
          headings={3}
          align="left"
          marginVertical={10}
          content={schedule.description}
        />
      </View>
      <ScrollView style={container}>
        {/* 별명 설정 */}
        <Text
          bold
          headings={1}
          align="left"
          content="  플랜 이름 설정"
          marginBottom={3}
        />
        <TextInput underlined value={alias} onChangeText={setAlias} />

        {/* 요일 / 간격 선택 */}
        {/* <Text
          bold
          headings={1}
          align="left"
          content="  얼마나 자주 실천할 계획인가요?"
          marginTop={55}
          marginBottom={12}
        /> */}
        <View style={item}>
          {radioButtons.map((radio, idx) => (
            <RadioButton
              key={idx}
              {...radio}
              color={theme.primary.main}
              labelStyle={{ color: theme.text }}
              onPress={() => onPressRadioButton(idx)}
            />
          ))}
        </View>
        <View style={[item, selectInterval]}>
          {radioButtons[0].selected ? (
            <SelectDay
              selectedDays={selectedDays}
              setSelectedDays={setSelectedDays}
            />
          ) : (
            <></>
          )}
          {radioButtons[1].selected ? (
            <>
              <Text
                headings={1}
                content={`${interval}일마다 한 번 실천하기`}
                marginHorizontal={10}
              />
              <TextButton
                color="#5796fa"
                content={!intervalSelectionVisible ? '변경' : '완료'}
                onPress={toggleIntervalSelectionVisible}
              />
            </>
          ) : (
            <></>
          )}
          {radioButtons[2].selected ? (
            <Text headings={1} content={`매일 실천하기`} />
          ) : (
            <></>
          )}
        </View>

        {/* 시작 날짜 선택 */}
        <Text
          bold
          headings={1}
          align="left"
          content="  언제부터 실천할 계획인가요?"
          marginTop={55}
          marginBottom={6}
        />
        <View style={buttonContainer}>
          <Button
            style={button}
            color={isToday(date) ? 'primary' : 'ghost'}
            content="오늘부터 하기!"
            onPress={() => setDate(Today)}
          />
          <Button
            style={button}
            color={!isToday(date) ? 'primary' : 'ghost'}
            content={
              isToday(date)
                ? '나중에 시작할래요'
                : `${date.getMonth() + 1}월 ${date.getDate()}일 (${
                    korday[date.getDay()]
                  })부터`
            }
            onPress={toggleDatepickerVisible}
          />
        </View>
        <View>
          <View style={rowInfo}>
            <Text headings={2} color={theme.disabled} content="시작 날짜" />
            <Text
              headings={2}
              color={theme.disabled}
              content={`${start_date.format('YYYY년 M월 D일')}(${
                korday[start_date.day()]
              })`}
            />
          </View>
          <View style={rowInfo}>
            <Text
              headings={2}
              color={theme.disabled}
              content="종료 예상 날짜"
            />
            <Text
              headings={2}
              color={theme.disabled}
              content={
                end_date.isValid()
                  ? `${end_date.format('YYYY년 M월 D일')}(${
                      korday[end_date.day()]
                    })`
                  : '-'
              }
            />
          </View>
        </View>

        {/* 색깔 선택 */}
        <Text
          bold
          headings={1}
          align="left"
          content="  플래너에 표시할 색깔을 선택해주세요."
          marginTop={55}
        />
        <View style={colorContainer}>
          <View style={colorRow}>
            {COLORS.slice(0, 7).map((color, idx) => (
              <TouchableOpacity
                key={color}
                style={colorItem}
                onPress={() => setColorIdx(idx)}
              >
                <View
                  style={
                    colorIdx === idx
                      ? [colorCircle, colorSelected, { backgroundColor: color }]
                      : [colorCircle, { backgroundColor: color }]
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
          <View style={colorRow}>
            {COLORS.slice(7, 14).map((color, idx) => (
              <TouchableOpacity
                key={color}
                style={colorItem}
                onPress={() => setColorIdx(idx + 7)}
              >
                <View
                  style={
                    colorIdx === idx + 7
                      ? [colorCircle, colorSelected, { backgroundColor: color }]
                      : [colorCircle, { backgroundColor: color }]
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[item, { marginBottom: 60 }]}>
          {schedule.has_attached ? (
            <Button
              color="secondary"
              content="현재 진행중인 플랜입니다."
              disabled
            />
          ) : (
            <Button color="primary" content="다운로드" onPress={attach} />
          )}
        </View>
      </ScrollView>
      <SelectInterval
        value={interval}
        onValueChange={setInterval}
        visible={intervalSelectionVisible}
        hide={toggleIntervalSelectionVisible}
      />
      {Platform.OS === 'ios' && (
        <DateTimePickerModal
          value={date}
          onChange={setDate}
          mode="date"
          visible={datepickerVisible}
          hide={toggleDatepickerVisible}
          minimumDate={Today}
          maximumDate={TwoWeeksLater}
        />
      )}
    </SafeAreaView>
  );
}

const styles = ({
  mainBackground,
  disabled,
  primary: { main },
}: DefaultTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: mainBackground,
      paddingHorizontal: 20,
      paddingVertical: 18,
    },
    header: {
      justifyContent: 'space-between',
      padding: 18,
      backgroundColor: mainBackground,
      ...shadow,
      borderBottomColor: '#77777788',
      borderBottomWidth: 1,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginBottom: 12,
    },
    button: {
      flex: 1,
      margin: 8,
    },
    selectInterval: {
      height: 40,
    },
    selectStartDay: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    rowInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingVertical: 5,
    },
    colorContainer: {
      paddingVertical: 18,
      marginBottom: 9,
    },
    colorRow: {
      flexDirection: 'row',
    },
    colorItem: {
      flex: 1,
      paddingVertical: 7,
      paddingHorizontal: 12,
    },
    colorCircle: {
      padding: 16,
      borderRadius: 12,
      borderColor: 'transparent',
      borderWidth: 2,
    },
    colorSelected: {
      borderColor: main,
      borderWidth: 2,
    },
    item: {
      marginBottom: 6,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
