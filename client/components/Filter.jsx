import { View, Text } from "react-native"
import { useEffect, useState } from "react"
import MultiSelect from 'react-native-multiple-select';

const Filter = (props) => {

    const [selected, setSelected] = useState([]);
    const [listNames, setListNames] = useState([]);

    useEffect(() => {
        setListNames(props.listAllDetails.map((item) => {
            return { id: item.id, name: item.name }
        }))
    }, [props.listAllDetails])

    useEffect(() => props.filter(selected), [selected])

    return (
        <View>
            {
                listNames.length != 0 ?
                    <MultiSelect
                        hideTags
                        items={listNames}
                        uniqueKey="id"
                        //ref={(component) => { this.multiSelect = component }}
                        onSelectedItemsChange={setSelected}
                        selectedItems={selected}
                        selectText={props.filterName}
                        searchInputPlaceholderText="Search..."    
                        altFontFamily="ProximaNova-Light"
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{ color: '#CCC' }}
                    />
                :
                    <Text></Text>
            }
        </View>
    );
}

export default Filter;