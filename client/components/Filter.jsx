import { View, Text } from "react-native"
import { useEffect, useState } from "react"
import { MaterialIcons } from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const Filter = ({ listAllDetails, filteredItems, filterFunc}) => {

    const [selected, setSelected] = useState([]);
    const [listNames, setListNames] = useState([]);

    useEffect(() => {
        setListNames(listAllDetails.map((item) => {
            return { id: item.id, name: item.name }
        }))
    }, [listAllDetails])

    useEffect(() => {
        filterFunc(selected, `${filteredItems}Id`)
    }, [selected])
    
    return (
        <View>
            {
                listAllDetails.length != 0 ?
                    <SectionedMultiSelect
                        items={listNames}
                        IconRenderer={MaterialIcons}
                        uniqueKey="id"
                        selectText={`${filteredItems}s`}
                        showDropDowns={true}
                        showChips={false}
                        onSelectedItemsChange={setSelected}
                        selectedItems={selected}
                    />
                :
                    <Text></Text>
            }
        </View>
    );
}

export default Filter;