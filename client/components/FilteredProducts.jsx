import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadBrand } from '../store/slices/brandSlice';
import { loadType } from '../store/slices/typeSlice';
import Filter from '../components/Filter';

const FilteredProducts = ({filterFunc}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadBrand()) 
        dispatch(loadType()) 
    }, [])
    
    let listBrands = useSelector((store) => store.brandReducer.brands)
    let listTypes = useSelector((store) => store.typeReducer.types) 
  
    return (
        <View style={styles.container}>
            <Filter
                style={styles.filter}
                listAllDetails={listBrands}
                filteredItems={'brand'}
                filterFunc={filterFunc}
            />
            <Filter
                style={styles.filter}
                listAllDetails={listTypes}
                filteredItems={'type'}
                filterFunc={filterFunc}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    filter: {
        width: '50%',
        justifyContent: 'flex-start'
    }
})

export default FilteredProducts;