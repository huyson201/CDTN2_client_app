import React, {useState, useEffect, useMemo} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useSelector} from 'react-redux';
import Rating from './Rating';
import {getDateFormatString} from '../../utilFunction';

const RatingItem = ({rateValue}) => {
  const currentUser = rateValue.user_info
    ? rateValue.user_info
    : useSelector(state => state.user.currentUser);
  const [data, setData] = useState({...rateValue});
  //   console.log(rateValue.user_info, 'currentUser');
  useEffect(() => {
    setData({...rateValue});
  }, [rateValue]);

  const ratingBar = useMemo(() => {
    return (
      <Rating
        size={12}
        defaultValue={data.rate_star}
        readOnly
        key={data.rate_star}
      />
    );
  }, [data]);

  const ratingComment = useMemo(() => {
    if (!data.rate_comment) return null;
    return (
      <View style={styles.comment}>
        <Text>{data.rate_comment}</Text>
      </View>
    );
  }, [data]);

  const userImg = useMemo(() => {
    return currentUser && currentUser.user_img
      ? currentUser.user_img
      : `https://ui-avatars.com/api/?name=${
          currentUser && currentUser.user_name ? currentUser.user_name : 'NaN'
        }&size=256`;
  }, [currentUser]);
  console.log(userImg);
  return (
    <View style={{marginTop: 12}}>
      <View style={styles.col}>
        <View>
          <Image style={styles.imgStyle} source={{uri: userImg}} />
        </View>
        <Text style={styles.textUserName}>
          {currentUser && currentUser.user_name ? currentUser.user_name : 'NaN'}
        </Text>
      </View>
      <View style={{...styles.col, ...styles.rate}}>
        <View style={{width: 100}}>{ratingBar}</View>
        <View style={styles.date}>
          <Text style={{color: 'rgba(0,0,0,0.5)'}}>
            {getDateFormatString(new Date(data.createdAt))}
          </Text>
        </View>
      </View>
      {ratingComment}
    </View>
  );
};
const styles = StyleSheet.create({
  col: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgStyle: {
    width: 40,
    height: 40,
    borderRadius: 60,
  },
  textUserName: {
    marginLeft: 12,
  },
  rate: {
    marginTop: 8,
  },
  date: {
    marginLeft: 12,
  },
  comment: {
    marginTop: 4,
  },
});
export default RatingItem;
