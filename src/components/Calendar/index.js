import React, { useEffect, useState, useCallback } from 'react';
import { Colors } from "@/styles/Colors";
import { CalendarProvider, ExpandableCalendar, Calendar } from 'react-native-calendars';


const CalendarCustom = React.memo(({ setDate, onChange, setModal }) => {

    const [markPreiod, setPreiod] = useState({});
    const fromYear = new Date().getFullYear() - 10;
    const toYear = new Date().getFullYear() + 10;
    const [disable, setDisable] = useState(false);

    let timerLoading = null
    useEffect(() => {
        return () => {
            if (timerLoading) clearTimeout(timerLoading);
        }
    }, [])

    const SetMarkedDay = (dateString) => {
        let numberDate = Object.keys(markPreiod).length;
        switch (numberDate) {
            case 0:
                setPreiod({
                    [dateString]: {
                        startingDay: true,
                        color: '#41D3CF'
                    }
                })
                break;
            case 1:
                if (dateString == Object.keys(markPreiod)[0]) break;
                var startDate = new Date(Object.keys(markPreiod)[0]);
                var endDate = new Date(dateString);
                setDate({ // chon ra 2 ngay
                    fromDate: Object.keys(markPreiod)[0],
                    toDate: dateString
                })
                var iterator = startDate;
                iterator.setDate(iterator.getDate() + 1);
                var dateArray = new Array();

                while (iterator < endDate) {
                    dateArray.push(new Date(iterator));
                    iterator.setDate(startDate.getDate() + 1);
                }
                var dayList = dateArray.reduce((prev, next) => {
                    var dateKey = next.toISOString().split('T')[0];
                    return {
                        ...prev, [dateKey]: {
                            color: '#DFFFFE'
                        }
                    }
                }, {})
                setPreiod(prev => ({
                    ...prev,
                    [dateString]: {
                        endingDay: true,
                        color: '#41D3CF'
                    },
                    ...dayList
                }))

                // call api và close modal
                setDisable(true);
                timerLoading = setTimeout(() => {
                    // delay đóng modal + reset các biến 
                    setModal(false);
                    setPreiod({});
                    setDisable(false);
                    setDate({
                        fromDate: null,
                        toDate: null
                    })
                }, 750)
                onChange(prev => ({
                    ...prev,
                    startDate: Object.keys(markPreiod)[0],
                    endDate: dateString
                }))
                break;
            default:
                setPreiod({
                    [dateString]: {
                        startingDay: true,
                        color: '#41D3CF'
                    }
                })
                break;
        }
    }
    return (
        <Calendar style={{ marginTop: 10 }}
            markingType={'period'}
            minDate={`${fromYear}-01-01`}
            maxDate={`${toYear}-12-31`}
            theme={CalendarTheme()}
            pastScrollRange={60}
            futureScrollRange={60}
            // markedDates={{
            //     [selectDate]: {
            //         selected: true,
            //         disableTouchEvent: true,
            //         selectedColor: Colors.light.lightBlue,
            //         selectedTextColor: 'white'
            //     }

            // }}
            markedDates={markPreiod}
            onDayPress={(day) => {
                if (!disable) SetMarkedDay(day.dateString)
            }}  >
        </Calendar>
    )
})
export default CalendarCustom

const CalendarTheme = () => {
    const themeColor = Colors.light.lightBlue;
    const disabledColor = 'grey';
    return {
        arrowColor: 'black',
        arrowStyle: { padding: 0 },
        // month
        monthTextColor: 'black',
        textMonthFontSize: 18,
        textMonthFontWeight: 'bold',
        // day names
        textSectionTitleColor: 'black',
        textDayHeaderFontSize: 12,
        textDayHeaderFontWeight: 'normal',
        // dates
        todayTextColor: themeColor,
        textDayFontSize: 12,
        textDayFontWeight: '500',
        textDayStyle: { marginTop: Platform.OS === 'android' ? 2 : 4 },
        // selected date
        selectedDayBackgroundColor: themeColor,
        selectedDayTextColor: 'white',
        // disabled date
        textDisabledColor: disabledColor,

    }
}
