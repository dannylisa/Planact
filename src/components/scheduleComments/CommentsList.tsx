import React, { useEffect } from 'react';
import { IScheduleComment } from '@/utils/data';
import { StyleSheet, View, ViewProps } from 'react-native';
import Comment from './Comment';
import { Text } from '@components/materials';
import useTheme from '@/modules/theme/hooks';

interface ScheduleCommentsProps extends ViewProps {
  schedule_id: string;
  count_events: number;
  comments: IScheduleComment[];
  resetComments: () => Promise<void>;
}
export default function ScheduleComments({
  schedule_id,
  count_events,
  comments,
  resetComments,
  ...others
}: ScheduleCommentsProps) {
  const theme = useTheme();

  useEffect(() => {
    resetComments();
  }, [schedule_id]);

  return (
    <View {...others}>
      <Text headings={1} bold align="left" content="댓글" marginBottom={10} />
      {comments.length ? (
        comments.map((comment, idx) => (
            <Comment 
                comment={comment} 
                count_events={count_events}
                key={idx} />
        ))
      ) : (
        <>
          <Text content="등록된 댓글이 없습니다." marginVertical={8} />
          <Text content="가장 먼저 댓글을 남겨보세요!" marginBottom={12} />
        </>
      )}
    </View>
  );
}
