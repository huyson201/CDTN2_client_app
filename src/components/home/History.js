import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components';
import { BLUE1, DARK_GRAY, LIGHT_GRAY } from '../../values/color';
import {
  HISTORY_CITY_NAME,
  HISTORY_DATE,
  HISTORY_NUMBER_PERSON,
  HISTORY_REMOVE_BTN,
  HISTORY_STRING,
} from '../../values/constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
const historyData = [];

for (let i = 0; i < 6; i++) {
  historyData.push({
    id: i,
    city: HISTORY_CITY_NAME,
    date: HISTORY_DATE,
    person: HISTORY_NUMBER_PERSON,
  });
}
const History = function () {
  const renderItem = function ({ item }) {
    return (
      <ItemContainer activeOpacity={0.5} underlayColor="#d3d3d3">
        <ViewRow>
          <Icon name="map-marker-alt" size={20} color={DARK_GRAY} />
          <Text style={styles.hisTitle}>{item.city}</Text>
        </ViewRow>
        <ItemContent>
          <ViewRow style={{ justifyContent: 'space-between' }}>
            <Text style={styles.contentText}>{item.date}</Text>
            <Icon name="angle-right" size={20} color={BLUE1} />
          </ViewRow>
          <Text style={styles.contentText}>{item.person}</Text>
        </ItemContent>
      </ItemContainer>
    );
  };
  return (
    <View>
      <View style={styles.hisHeader}>
        <Text style={styles.headText}>{HISTORY_STRING}</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={(styles.headText, styles.btnDelete)}>
            {HISTORY_REMOVE_BTN}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{ marginTop: 5 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={historyData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const ItemContainer = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${LIGHT_GRAY};
  max-width: 235px;
  border-radius: 8px;
  margin: 0 8px;
`;
const ItemContent = styled.View`
  margin-top: 8px;
`;
const ViewRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const styles = StyleSheet.create({
  hisHeader: {
    paddingLeft: 18,
    paddingRight: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnDelete: {
    color: BLUE1,
    fontWeight: 'bold',
  },
  hisTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 8,
  },
  contentText: {
    fontSize: 11,
    color: DARK_GRAY,
    maxWidth: '90%',
    width: '100%',
  },
});

export default History;
