import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/slices/filterSlice';

const SearchInput = () => {
    const dispatch = useDispatch();
    return (
        <input
            onChange={(event) => dispatch(setFilter(event.target.value))}
            type="search"
            placeholder="What are you looking for?"
            className="p-2 w-60 md:w-80 rounded-md focus:outline-none"
        />
    );
};

export default SearchInput;