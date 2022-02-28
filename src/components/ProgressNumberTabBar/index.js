import React from 'react';
import {
    ViewPropTypes,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    Animated,
    TouchableOpacity, ScrollView
} from 'react-native';

import {useTheme} from "native-base";

const PropTypes = require('prop-types');

const ProgressNumberTabBar = (props) => {
    const {colors} = useTheme();
    // const containerWidth = props.containerWidth;
    // const numberOfTabs = props.tabs.length;

    const {width} = useWindowDimensions();
    const ref = React.createRef()


    const renBackground = (isTabActive, isChecked, activeTextColor) => {
        let backgroundColor = colors.black
        if (isTabActive && isChecked === 0) {
            backgroundColor = activeTextColor
        }
        if (isChecked === 1) {
            backgroundColor = colors.light.redBase
        }
        if (isChecked === 2) {
            backgroundColor = colors.light.white
        }
        return backgroundColor
    }
    const renderTab = (tab, page, isTabActive, onPressHandler) => {
        const {activeTextColor, textStyle,} = props;
        const textColor = (tab.isChecked === 1 || tab.isChecked === 2) ?  colors.light.white : Colors.SecondaryText
        const fontWeight = isTabActive ? 'bold' : 'normal';
        const backgroundColor = renBackground(isTabActive, tab.isChecked, activeTextColor)

        return <TouchableOpacity
            style={{margin: 6,marginVertical:12}}
            key={String(tab.label)}
            accessible={true}
            accessibilityLabel={String(tab.label)}
            accessibilityTraits='button'
            onPress={() => onPressHandler(page)}
        >
            <View style={[styles.tab, props.tabStyle, {backgroundColor: backgroundColor},]}>
                <Text style={[{color: textColor, fontWeight,}, textStyle,]}>
                    {String(tab.label)}
                </Text>
            </View>
        </TouchableOpacity>;
    }

    return (
        <View style={[styles.tabs,
            {
                backgroundColor: props.backgroundColor,
                width: width,
                paddingHorizontal:9,
            },
            props.style,]}>
            <ScrollView scrollEventThrottle={16}
                        horizontal
                        ref={ref}
                        pagingEnabled
                        scrollsToTop={false}
                        directionalLockEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{flexGrow: 1}}>
                {props.tabs.map((name, page) => {
                    const isTabActive = props.activeTab === page;
                    return renderTab(name, page, isTabActive, props.goToPage);
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});
ProgressNumberTabBar.propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: ViewPropTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: ViewPropTypes.style,
    containerWidth: PropTypes.any,
    style: PropTypes.object,
    scrollValue: PropTypes.any
}

export default ProgressNumberTabBar;
