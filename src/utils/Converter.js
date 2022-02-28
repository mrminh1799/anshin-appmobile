export const ByteConverter = (byte) => {
    if (byte == null || byte == undefined) return ""
    let newByte = byte;
    if (newByte < 1024) return newByte + " byte"
    else {
        newByte = Math.floor(newByte / 1024);
        if (newByte < 1024) return newByte + " KB"
        else return Math.floor(newByte / 1024) + " MB"
    }
}

export const HourConverter = (time) => {
    if (time == null || time == undefined) return ""
    let sec, min, hour;
    sec = time;
    if (sec < 60) return sec + " giây"
    else {
        min = Math.floor(sec / 60);
        sec = sec - min * 60;
        if (min < 60) return min + " phút " + sec + " giây"
        else {
            hour = Math.floor(min / 60);
            min = min - hour * 60;
            return hour + " giờ " + min + " phút " + sec + " giây"
        }
    }
}

