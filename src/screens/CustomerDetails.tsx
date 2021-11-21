import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar, Box, Button, Text, useContrastText } from 'native-base';
import { useMemo } from 'react';

import customers from '../data/customers.json';
import { RootStackParamList } from '../router/AppRouter';

type CustomerDetailsType = NativeStackScreenProps<RootStackParamList, 'CustomerDetails'>;

interface CustomerDetailsProps {
  navigation: CustomerDetailsType['navigation'];
  route: CustomerDetailsType['route'];
}

const CustomerDetails = ({ route, navigation }: CustomerDetailsProps) => {
  const { customerId } = route.params;

  const { firstName, lastName, color, email } = customers.find((item) => item.id === customerId)!;

  const avatarLetters = useMemo(() => firstName[0] + lastName[0], [firstName, lastName]);
  const textColor = useContrastText(`${color}.500`);

  return (
    <Box
      alignItems="center"
      borderRadius={5}
      backgroundColor="white"
      flex={1}
      px="3"
      py="16"
      borderWidth={1}
      borderColor="gray.300"
    >
      <Box>
        <Avatar height={150} width={150} size="xl" color={textColor} bg={`${color}.500`}>
          {avatarLetters}
        </Avatar>
      </Box>
      <Box mt="8">
        <Text textAlign="center">
          <Text fontWeight="bold">Name:</Text> {firstName} {lastName}
        </Text>
        <Text textAlign="center">
          <Text fontWeight="bold">Email:</Text> {email}
        </Text>
        <Text textAlign="center" mt="2">
          <Text fontWeight="bold">Bio:</Text> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quas modi
          iusto tempore, officiis beatae minus laboriosam perferendis reprehenderit saepe excepturi magnam unde iste
          molestias similique voluptatum cupiditate nobis illum.
        </Text>
      </Box>
      <Button colorScheme="secondary" size="lg" mt="auto" onPress={() => navigation.goBack()}>
        Back to list
      </Button>
    </Box>
  );
};

export default CustomerDetails;
