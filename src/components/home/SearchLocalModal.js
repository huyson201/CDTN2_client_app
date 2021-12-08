import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useMemo,
} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {setAddress} from '../../../action_creators/search';
import {Picker} from '@react-native-picker/picker';
import addressApi from '../../../api/addressApi';
import {BLUE1} from '../../values/color';
import Icon from 'react-native-vector-icons/FontAwesome5';

const generatePickerItem = (data = []) => {
  if (!Array.isArray(data) || data.length <= 0) return;

  return data.map((el, index) => {
    return (
      <Picker.Item
        label={el.name}
        value={index}
        style={styles.pickerItemStyle}
        key={el.code}
      />
    );
  });
};

const SearchLocalModal = forwardRef((props, ref) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedCommune, setSelectedCommune] = useState();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  // get provinces
  useEffect(() => {
    async function getData() {
      let res = await addressApi.getProvince();
      let results = [...res.data.results];
      console.log(res);
      // console.log('result' + results)
      setProvinces([...results]);
    }

    if (show) {
      getData();
    }
  }, [show]);

  // load districts
  useEffect(() => {
    async function getData() {
      if (+selectedProvince === -1) return;
      if (provinces[selectedProvince]) {
        let res = await addressApi.getDistrict(
          provinces[selectedProvince].code,
        );
        let results = [...res.data.results];
        setDistricts([...results]);
      }
    }

    if (+selectedProvince !== -1) {
      getData();
    }
  }, [selectedProvince]);

  // load communes
  useEffect(() => {
    async function getData() {
      if (+selectedDistrict === -1) return;
      if (districts[selectedDistrict]) {
        let res = await addressApi.getCommune(districts[selectedDistrict].code);
        let results = [...res.data.results];
        //   console.log(selectedDistrict);
        //   console.log(districts[selectedDistrict].code);
        //   console.log(results);
        setCommunes([...results]);
      }
    }

    if (+selectedDistrict !== -1) {
      getData();
    }
  }, [selectedDistrict]);

  // generate picker item of provinces
  let provincesPickerItem = useMemo(() => {
    return generatePickerItem(provinces);
  }, [provinces]);

  let districtsPickerItem = useMemo(() => {
    return generatePickerItem(districts);
  }, [districts]);

  let communesPickerItem = useMemo(() => {
    return generatePickerItem(communes);
  }, [communes]);

  // process open modal
  const close = () => {
    setShow(false);
    if (+selectedCommune !== -1) {
      const currentCommune = communes[selectedCommune];
      let newAddress = `${currentCommune.name}, ${currentCommune.district}, ${currentCommune.province}`;
      let action = setAddress(newAddress);
      dispatch(action);
      return;
    }

    if (+selectedDistrict !== -1) {
      const currentDistrict = districts[selectedDistrict];
      let newAddress = `${currentDistrict.name}, ${currentDistrict.province}`;
      let action = setAddress(newAddress);
      dispatch(action);

      return;
    }

    if (+selectedProvince !== -1) {
      const currentProvince = provinces[selectedProvince];
      let newAddress = `${currentProvince.name}`;
      let action = setAddress(newAddress);
      dispatch(action);

      return;
    }
  };

  useImperativeHandle(ref, () => ({
    show() {
      setShow(true);
    },
  }));

  return (
    <Modal animationType="slide" onRequestClose={close} visible={show}>
      <View style={styles.toolBar}>
        <TouchableWithoutFeedback style={{width: 60, height: 60}}>
          <Icon
            name="arrow-left"
            color="#fff"
            size={20}
            onPress={() => setShow(false)}
          />
        </TouchableWithoutFeedback>
        <Text style={styles.toolbarText}>Chọn vị trí</Text>
      </View>
      <View style={styles.addressContainer}>
        <View style={styles.fieldStyle}>
          <Text>
            Chọn Tỉnh / Thành Phố <Text style={styles.styleRequire}>*</Text>
          </Text>
          <View style={styles.pickerStyle}>
            <Picker
              selectedValue={selectedProvince}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedProvince(itemValue);
                setSelectedDistrict(-1);
                setSelectedCommune(-1);
              }}>
              <Picker.Item
                label="Chọn Tỉnh / Thành Phố"
                value={-1}
                style={styles.pickerItemStyle}
              />
              {provincesPickerItem}
            </Picker>
          </View>
        </View>
        <View style={styles.fieldStyle}>
          <Text>Chọn Quận / Huyện</Text>
          <View style={styles.pickerStyle}>
            <Picker
              selectedValue={selectedDistrict}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedDistrict(itemValue);
                setSelectedCommune(-1);
              }}>
              <Picker.Item
                label="Chọn Quận / Huyện"
                value={-1}
                style={styles.pickerItemStyle}
              />
              {+selectedProvince !== -1 && districtsPickerItem}
            </Picker>
          </View>
        </View>
        <View style={styles.fieldStyle}>
          <Text>Chọn Phường / Xã</Text>

          <View style={styles.pickerStyle}>
            <Picker
              selectedValue={selectedCommune}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCommune(itemValue)
              }>
              <Picker.Item
                label="Chọn Phường / Xã"
                value={-1}
                style={styles.pickerItemStyle}
              />
              {+selectedDistrict !== -1 && communesPickerItem}
            </Picker>
          </View>
        </View>
      </View>
      <Button title="Hoàn thành" buttonStyle={styles.btn} onPress={close} />
    </Modal>
  );
});

export default SearchLocalModal;

const styles = StyleSheet.create({
  addressContainer: {
    maxWidth: '90%',
    width: '100%',
    marginLeft: 12,
    flex: 1,
    paddingTop: 40,
    alignItems: 'stretch',
  },
  styleRequire: {
    color: 'red',
  },
  fieldStyle: {
    marginBottom: 12,
  },
  btn: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  pickerStyle: {
    borderWidth: 1,
    borderRadius: 15,
  },
  pickerItemStyle: {
    borderWidth: 1,
    borderBottomColor: '#ccc',
    borderStyle: 'solid',
  },
  toolBar: {
    flexDirection: 'row',
    backgroundColor: BLUE1,
    alignItems: 'center',
    maxHeight: 60,
    height: 60,
    paddingLeft: 15,
    paddingRight: 15,
  },

  toolbarText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 8,
    fontWeight: 'bold',
  },
});
