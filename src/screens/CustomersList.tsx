import { Box, Input, SearchIcon } from 'native-base';
import { useCallback, useEffect, useState } from 'react';

import { FlatList, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import customersProvider from '../data/customersProvider';
import usePaginatedList from '../hooks/usePaginatedList';
import CustomersCard from '../components/CustomersCard';
import FlatListFooter from '../components/FlatListFooter';
import useDebounce from '../hooks/useDebounce';

const LIMIT = 10;

type CustomersType = typeof customers[number];

const customers = customersProvider();

const CustomersList = () => {
  const searchFields = ['firstName', 'lastName'];
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const { data, loadNext, hasNext, isLoading } = usePaginatedList<CustomersType>({
    data: customers,
    searchFields,
    search,
    limit: LIMIT,
  });

  const handleOnEndReached = useCallback(() => !isLoading && hasNext && loadNext(), [hasNext, isLoading, loadNext]);

  const renderItem = useCallback(({ item }: { item: CustomersType }) => {
    return <CustomersCard {...item} />;
  }, []);

  const keyExtractor = useCallback((item) => item.id, []);

  const handleInputChange = useCallback(
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => setDebouncedSearch(event.nativeEvent.text),
    [],
  );

  const debounce = useDebounce((debouncedSearch: string) => setSearch(debouncedSearch), 500);

  useEffect(() => {
    debounce(debouncedSearch);
  }, [debounce, debouncedSearch]);

  const ListFooterComponent = useCallback(
    () => <FlatListFooter mb="24" mt="8" hasNext={hasNext} isLoadingNext={isLoading} />,
    [hasNext, isLoading],
  );

  return (
    <Box p="4" backgroundColor="gray.100">
      <Input
        placeholder="Search by First or Last name"
        bg="white"
        width="100%"
        borderRadius="4"
        py="3"
        fontSize="14"
        onChange={handleInputChange}
        testID="CustomersListInput"
        InputLeftElement={<SearchIcon m="1" ml="3" size="5" color="gray.400" />}
      />
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={handleOnEndReached}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={ListFooterComponent}
        testID="CustomersList"
      />
    </Box>
  );
};

export default CustomersList;
