import { View } from 'react-native';
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
        <View>
            <Filter
                listAllDetails={listBrands}
                filteredItems={'brand'}
                filterFunc={filterFunc}
            />
            <Filter
                listAllDetails={listTypes}
                filteredItems={'type'}
                filterFunc={filterFunc}
            />
        </View>
    );
}

export default FilteredProducts;