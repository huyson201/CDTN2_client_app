import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { View, FlatList, ToastAndroid, Text } from "react-native"
import { db } from "../cf_firebase/ConfigFireBase"
import { ref, onValue } from "firebase/database";
import { xoaDau } from "../src/utilFunction";



const ListRestaurants = () => {
    const [listData, setListData] = useState([])
    const searchData = useSelector(state => state.search)

    const starCountRef = ref(db, "hotels")


    useEffect(() => {
        let data = []
        let searchAddress = searchData.address
        let arrStar = searchData.filter.rankStars
        let maxPrice = searchData.filter.maxPrice
        let minPrice = searchData.filter.minPrice



        onValue(starCountRef, (snapshot) => {
            data = snapshot.val()
            data = Object.values(data)

            data = filterAddress(data, searchAddress)
            data = filterStar(data, arrStar);
            data = filterPrice(data, maxPrice, minPrice)
            console.log(data)
            setListData([...data])
        })


    }, [])

    return (
        <View>
            <FlatList
                data={listData}
                renderItem={({ item, index }) => {
                    return (
                        <View>
                            <Text>{item.name}</Text>
                            <Text>{item.address}</Text>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const filterStar = (data, arrStars) => {
    if (arrStars.length === 0) return data
    return data.filter(el => {
        if (arrStars.includes(el.star)) return el
    })

}

// filter Price

function filterPrice(data, max, min) {
    if (max == min && max == 10000000) {
        let nData = data.filter(el => {
            let rooms = el.rooms
            for (let key in rooms) {
                if (rooms[key].price >= max) return el
            }
        })

        return nData
    }

    let nData = data.filter(el => {
        let rooms = el.rooms
        for (const key in rooms) {
            if (rooms[key].price >= min && rooms[key].price <= max) return el
        }

    })

    return nData
}

// filter function
function filterAddress(data, searchAddress) {

    let xoaDauAddress = xoaDau(searchAddress).toLowerCase()
    xoaDauAddress = removePrefixAddress(xoaDauAddress)

    let newData = data.filter(el => {
        let arrAddress = xoaDauAddress.split(",")
        let address = xoaDau(el.address).toLowerCase()
        for (let i = arrAddress.length - 1; i >= 0; i--) {
            if (address.indexOf(arrAddress[i]) !== -1) {
                return el
            }
        }
    })


    return newData
}



function removePrefixAddress(address) {
    let str = address.replace("xa", "")
    str = str.replace("huyen", "")
    str = str.replace("tinh", "")
    str = str.replace("thanh pho", "")
    str = str.replace("duong", "")

    return str;
}

export default ListRestaurants;

