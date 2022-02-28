import React, {useRef} from 'react';
import {usePagination, DOTS} from './usePagination';
import {Box, Button, HStack, Text, ChevronLeftIcon, ChevronRightIcon, useTheme} from "native-base";
import {StyleSheet, useWindowDimensions} from "react-native";

const Pagination = props => {
    const {colors} = useTheme()
    const {height, width} = useWindowDimensions();
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <Box>
            <HStack justifyContent={'space-between'} alignItems={'center'}>
                <Button w={width / 16} h={width / 14} rounded={100} borderWidth={2} borderColor={'redBase'} onPress={onPrevious}
                        disabled={currentPage === 0}><Box  alignItems={'center'}
                                                          justifyContent={'center'}><ChevronLeftIcon size="4"
                                                                                                     color={'redBase'}/></Box></Button>
                {paginationRange.map(pageNumber => {
                    return (
                        <Button flex={1}
                                w={width / 8} h={width / 8}
                                onPress={() => onPageChange(pageNumber)}><Box borderColor={'redBase'} w={width / 12}
                                                                              h={width / 12}
                                                                              style={pageNumber === (currentPage) && styles.currentPage}
                                                                              alignItems={'center'}
                                                                              justifyContent={'center'}><Text
                            textAlign={'center'}>{pageNumber}</Text></Box></Button>
                    );
                })}

                <Button w={width / 16} h={width / 14}  rounded={100} borderWidth={2} borderColor={'redBase'}
                        onPress={onNext}
                        disabled={currentPage === lastPage }><Box  alignItems={'center'}
                                                                      justifyContent={'center'}><ChevronRightIcon color={'redBase'} size="4"/></Box>
                </Button>
            </HStack>

        </Box>
    );
};

const styles = StyleSheet.create({
    currentPage: {
        borderWidth: 2,
        borderRadius: 1000
    },
});

export default Pagination;
