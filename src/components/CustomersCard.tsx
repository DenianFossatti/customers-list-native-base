import { useNavigation } from '@react-navigation/native';
import { Avatar, Box, Pressable, Text, useContrastText } from 'native-base';
import { useMemo } from 'react';

interface CustomersCardProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  color: string;
}

const CustomersCard = ({ id, firstName, lastName, email, color }: CustomersCardProps) => {
  const navigation = useNavigation();
  const avatarLetters = useMemo(() => firstName[0] + lastName[0], [firstName, lastName]);
  const textColor = useContrastText(`${color}.500`);

  return (
    <Pressable
      borderRadius={5}
      backgroundColor="white"
      flexDirection="row"
      flex={1}
      p="3"
      my="2"
      borderWidth={1}
      borderColor="gray.300"
      onPress={() =>
        navigation.navigate('CustomerDetails', {
          customerId: id,
        })
      }
    >
      <Box>
        <Avatar color={textColor} bg={`${color}.500`}>
          {avatarLetters}
        </Avatar>
      </Box>
      <Box ml="4">
        <Text>
          {firstName} {lastName}
        </Text>
        <Text>{email}</Text>
      </Box>
    </Pressable>
  );
};

export default CustomersCard;
