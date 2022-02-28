import {FileLogger} from 'react-native-file-logger';


/**
 * @author AnhVTN11
 * @date 20/11/2021
 * @description Write log on user devices
 */



const sendLogToMail = (to: string, subject: string, body: string) => {
    FileLogger.sendLogFilesByEmail({to: to, subject: subject, body: body})
}

const log = (...args: any[]) => {
    if (__DEV__) {
        console.log(...args);
    } else {
        FileLogger.info(`${args.join(' ')}`);
    }
};

const debug = (...args: any[]) => {
    if (__DEV__) {
        console.debug(...args);
    } else {
        FileLogger.debug(`${args.join(' ')}`);
    }
};

const warn = (...args: any[]) => {
    if (__DEV__) {
        console.warn(...args);
    } else {
        FileLogger.warn(`${args.join(' ')}`);
    }
};

const error = (...args: any[]) => {
    if (__DEV__) {
        console.error(...args);
    } else {
        FileLogger.error(`${args.join(' ')}`);
    }
};

export {log, debug, warn, error, sendLogToMail}
