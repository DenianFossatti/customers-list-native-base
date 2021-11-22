import { Box, IBoxProps, Spinner, Text } from 'native-base';

interface FlatListFooterProps extends IBoxProps {
  isLoadingNext: boolean;
  hasNext: boolean;
}

const FlatListFooter = ({ isLoadingNext, hasNext, ...props }: FlatListFooterProps) => {
  return (
    <Box alignItems="center" {...props}>
      {isLoadingNext ? <Spinner testID="LoadingIcon" /> : hasNext ? <Text>Load More</Text> : <Text>End of list.</Text>}
    </Box>
  );
};

export default FlatListFooter;
