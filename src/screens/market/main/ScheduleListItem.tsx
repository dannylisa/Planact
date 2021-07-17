import React from 'react';
import { ISchedule } from '@/utils/data';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { shadow, SpecificColors } from '@modules/theme/hooks';
import { DefaultTheme } from '@/style/styled';
import { useMemo } from 'react';
import useTheme from '@/modules/theme/hooks';
import { Text } from '@components/materials';
import { AntDesign } from '@expo/vector-icons';
import { toggleScheduleLike } from '@/api/market';
import { useUserState } from '@/modules/auth/hooks';
import media from '@/style/media';

interface ScheduleListItemProps {
  schedule: ISchedule;
  onPress: () => void;
}

interface TagsProps {
  [key: string]: {
    color: string;
    content: string;
  };
}
const Tags: TagsProps = {
  free: {
    color: '#ffaaaa',
    content: 'Free',
  },
  premium: {
    color: '#6a64dd',
    content: 'Premium',
  },
  downloaded: {
    color: '#4dc583',
    content: 'Started',
  },
};
const ScheduleListItem = ({ schedule, onPress }: ScheduleListItemProps) => {
  const { id, name, description, price, user_likes, has_attached } = schedule;
  const tag = useMemo(() => {
    if (has_attached) return Tags.downloaded;
    if (price === 0) return Tags.free;
    return Tags.free;
  }, [price, has_attached]);

  const theme = useTheme();
  const { wrapper, container, triangle, tagContainer, star } = useMemo(
    () => styles(theme, tag.color),
    [theme]
  );
  const [likes, setLikes] = React.useState<boolean>(Boolean(user_likes));
  const { getToken } = useUserState();
  const toggleLikes = async () => {
    setLikes((prev) => !prev);
    const token = await getToken();
    if (!token) return;
    await toggleScheduleLike(token, id);
  };

  const { yellow } = SpecificColors;
  return (
    <View style={wrapper}>
      <TouchableOpacity style={container} onPress={onPress}>
        <View style={star}>
          <TouchableOpacity onPress={toggleLikes}>
            <AntDesign
              name={likes ? 'star' : 'staro'}
              color={yellow}
              size={22}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <Text
            bold
            headings={2}
            paddingVertical={5}
            align="left"
            content={name}
          />
          <Text
            headings={4}
            align="left"
            content={description}
          />
        </View>
      </TouchableOpacity>
      <View style={triangle} />
      <View style={tagContainer}>
        <Text headings={4} content={tag.content} />
      </View>
    </View>
  );
};

const styles = ({ content }: DefaultTheme, color: string) => {
  const backdrop = color + 'c2';
  return StyleSheet.create({
    wrapper: {
      zIndex: 0,
      marginBottom: 14,
    },
    container: {
      minHeight: 80,
      borderRadius: 5,
      width: '98.5%',
      zIndex: 2,
      paddingVertical: 12,
      paddingLeft: 20,
      paddingRight: 50,
      backgroundColor: content,
      flexDirection: 'row',
      justifyContent: 'space-between',
      ...shadow,

    },
    star: {
      justifyContent: 'center',
      width: 40,
    },
    triangle: {
      position: 'absolute',
      borderBottomColor: backdrop,
      borderLeftColor: backdrop,
      top: '2%',
      right: 0,
      borderBottomWidth: 26,
      borderLeftWidth: 17,
      borderTopRightRadius: 16,
      borderBottomLeftRadius: 22,
      borderBottomRightRadius: 22,
      zIndex: 1,
      ...shadow,
    },
    tagContainer: {
      position: 'absolute',
      top: '10%',
      right: 0,
      backgroundColor: color,
      paddingLeft: 12,
      paddingRight: 16,
      paddingVertical: 4,
      borderTopRightRadius: 2,
      borderRadius: 3,
      zIndex: 3,
      ...shadow,
    },
  });
};
export default ScheduleListItem;
