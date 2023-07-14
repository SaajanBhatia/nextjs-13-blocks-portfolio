import { Box, Spinner } from '@chakra-ui/react';

const LoadingScreen = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            backgroundColor="rgba(0, 0, 0, 0.5)"
            zIndex="9999"
        >
            <Spinner size="xl" color="white" />
        </Box>
    );
};

export default LoadingScreen;