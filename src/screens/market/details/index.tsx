import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { DefaultTheme } from '@/style/styled';
import useTheme from '@/modules/theme/hooks';
import EventPreview from './EventPreview';
import { Button, Text, useThemedStepper } from '@components/materials';
import { getMarketScheduleEvents } from '@/api/market/';
import { useUserState } from '@/modules/auth/hooks';
import { IEvent, ISchedule } from '@/utils/data';
import { AxiosError, AxiosResponse } from 'axios';
import {
  NewScheduleComment,
  ScheduleCommentsList,
  useScheduleComments,
} from '@/components/scheduleComments';
import { useNavigation } from '@react-navigation/native';

interface EventsGroupedByDateOf {
  date: string;
  events: IEvent[];
}

export default function MarketScheduleDetails({ route }) {
  // theme
  const theme = useTheme();
  const { container, header, content, stepperWrapper, item, alreadyButton } =
    useMemo(() => styles(theme), [theme]);

  // Get Detail Data from api
  const { getToken } = useUserState();
  const schedule: ISchedule = route.params.schedule;
  const [schedulePreviewEvents, setSchedulePreviewEvents] = useState<
    EventsGroupedByDateOf[]
  >([]);
  const [stepperSize, setStepperSize] = useState<number>(3);

  // Stepper Setting
  const { StepperGetter, active } = useThemedStepper({ size: stepperSize });
  const Stepper = useMemo(() => StepperGetter(), [stepperSize, active, theme]);

  // Comment
  const { comments, createComment, resetComments } = useScheduleComments(
    schedule.id
  );

  // Initial Setting
  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (!token) return;
      await getMarketScheduleEvents(token, schedule.id)
        .then((res: AxiosResponse<EventsGroupedByDateOf[]>) => {
          setSchedulePreviewEvents(res.data);
          setStepperSize(Math.min(res.data.length, 5));
        })
        .catch((err: AxiosError) => console.log(err));
    })();
  }, [schedule]);

  // navigate
  const navigation = useNavigation()
  const onDownload = () =>
    navigation.navigate('Market/Schedule/Download/alias', { schedule });
    // navigation.push('Market/Schedule/Download', { schedule });


  /// Android
  const Wrapper =
    Platform.OS === 'android' ? KeyboardAvoidingView : SafeAreaView;

  const isAnd = Platform.OS === 'android';
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={container}>
        <View style={header}>
          <View>
            <Text 
              bold 
              headings={1} 
              align="left" 
              content={`${schedule.name}`} />
            <Text
              headings={3}
              align="left"
              marginVertical={10}
              content={schedule.description}
            />
          </View>
        </View>

        {
          !schedule.has_attached ?
          <>
          {/* Stepper */}
            <View style={stepperWrapper}>
              <Text 
                bold 
                headings={1} 
                align="left" 
                content={`플랜 ${stepperSize}일 미리보기`}
                marginBottom={16}
              />
              {Stepper}
            </View>
            <View style={content}>
              {schedulePreviewEvents.length ? (
                schedulePreviewEvents[active].events.map((event, idx) => (
                  <EventPreview event={event} key={idx} />
                ))
              ) : (
                <></>
              )}
            </View>
            <View style={item}>
              <Button
                flex={1}
                color="primary"
                content="내 캘린더에 내려받기"
                onPress={onDownload}
              />
            </View>
          </>
          :
          <View style={alreadyButton}>
            <Button
              flex={1}
              color="ghost"
              content="현재 진행중인 플랜입니다."
              disabled
            />
          </View>
        }
        
        <ScheduleCommentsList
          style={{paddingTop: 20}}
          schedule_id={schedule.id}
          count_events={schedule.count_events}
          comments={comments}
          resetComments={resetComments}
        />
        <View style={{paddingVertical: 40}}/>
      </ScrollView>
      <NewScheduleComment
        floorFixed
        createComment={createComment}
        resetComments={resetComments}
      />
    </SafeAreaView>
  );
}

const styles = ({ mainBackground }: DefaultTheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: mainBackground,
      padding: 18,
    },
    header: {
      justifyContent: 'space-between',
      marginBottom: 20
    },
    content: {
      paddingHorizontal: 16,
    },
    stepperWrapper: {
      flex: 1,
      marginBottom: 16,
    },
    item: {
      height: 55,
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    alreadyButton:{
      paddingHorizontal: 20,
    }
  });
};
