import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BLUE1, DARK_GRAY} from '../src/values/color';
import hotelApi from '../api/hotelApi';
import RatingItem from '../src/components/rate/RatingItem';

const ListRatingScreen = ({route, navigation}) => {
  const {hotelName, hotelId} = route.params;
  const [loading, setLoading] = useState(true);
  const [listRates, setListRates] = useState([]);
  const handleClickBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await hotelApi.getRates(hotelId, {
          sort: 'updatedAt:desc',
        });
        setListRates(res.data.data.rows);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
    setLoading(false);
    return () => {
      setListRates([]);
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={DARK_GRAY} />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.toolbar}>
        {/* exit bottom */}
        <TouchableWithoutFeedback onPress={handleClickBack}>
          <Icon name="arrow-left" size={24} color={'rgba(0,0,0,.5)'} />
        </TouchableWithoutFeedback>
        {/* title */}
        <View style={styles.toolbarTitleBox}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.toolbarHotelName}>
            {hotelName ? hotelName : 'Caption Hotel'}
          </Text>
          <Text style={styles.toolbarHint}>
            Danh sách xếp hạng khách sạn này
          </Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 18}}>
        <FlatList
          data={listRates}
          renderItem={({item}) => {
            // console.log(item.user_info)
            return (
              <View style={{marginTop: 8}}>
                <RatingItem rateValue={item} />
                <View style={styles.separator} />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  separator: {
    width: 30,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginTop: 15,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: DARK_GRAY,
    paddingHorizontal: 15,
  },
  toolbarTitleBox: {
    flex: 1,
    marginHorizontal: 24,
  },
  toolbarHotelName: {
    fontSize: 16,
  },
  toolbarHint: {
    fontSize: 13,
    marginTop: 6,
  },
});
export default ListRatingScreen;
