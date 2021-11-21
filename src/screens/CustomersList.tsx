import { Box, FlatList, Input } from 'native-base';
import { useCallback, useState } from 'react';

import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import customers from '../data/customers.json';
import usePaginatedList from '../hooks/usePaginatedList';
import CustomersCard from '../components/CustomersCard';

const LIMIT = 10;

type CustomersType = typeof customers[number];

const CustomersList = () => {
  const searchFields = ['firstName', 'lastName'];
  const [search, setSearch] = useState('');

  const { data, loadNext, hasNext } = usePaginatedList<CustomersType>({
    data: customers,
    searchFields,
    search,
    limit: LIMIT,
  });

  const handleOnEndReached = useCallback(() => hasNext && loadNext(), [hasNext, loadNext]);

  const renderItem = useCallback(({ item }: { item: CustomersType }) => {
    return <CustomersCard {...item} />;
  }, []);

  const keyExtractor = useCallback((item) => item.id, []);
  const handleInputChange = useCallback(
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => setSearch(event.nativeEvent.text),
    [],
  );

  return (
    <Box p="4">
      <Input
        placeholder="Search by First or Last name"
        bg="gray.50"
        width="100%"
        borderRadius="4"
        py="3"
        px="4"
        fontSize="14"
        onChange={handleInputChange}
        // InputLeftElement={
        //   <Icon
        //     m="2"
        //     ml="3"
        //     size="6"
        //     color="gray.400"
        //     as={<MaterialIcons name="search" />}
        //   />
        // }
      />
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={handleOnEndReached}
        onEndReachedThreshold={0.1}
      />
    </Box>
  );
};

export default CustomersList;
