import axios from 'axios';
import _ from 'lodash';
import {STATUS} from '@/constants';
import Keychain from "react-native-keychain";
import {DialogBoxService} from "@/components";
import {FCMToken} from '@/screens/Login/SetFCMToken';

/**
 * @author AnhVTN11
 * @type {AxiosInstance}
 */

/**
 * @description create instance
 * @type {AxiosInstance}
 */

const token = FCMToken()
const client = axios.create({
    baseURL: 'http://localhost:8080',

    headers: {
        'Content-Type': 'application/json',
        'device_id': token
    },
    timeout: 5000
});

/**
 * @description get access token in storage
 * @returns {Promise<string|undefined>}
 */
const getAccessToken = async () => {
    const userData = await Keychain.getGenericPassword()
    if (userData?.password && userData.username === 'username') {
        return JSON.parse(userData.password)?.token?.accessToken
    }
};

// return JSON.parse(userData)?.token?.accessToken
/**
 * @description set  token auth to any request
 */
client.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    try {
        if (token) {
            config.headers.Authorization = token ? `Bearer ${token}` : '';
        }
        // const httpMetric = perf().newHttpMetric(config.url, config.method);
        // config.metadata = {httpMetric};
        // await httpMetric.start();
    } catch (e) {
        throw new Error("Config Error", e);
    }

    return config;
});

/**
 * @description interceptors
 */
client.interceptors.response.use(
    async response => {
        // try {
        //     const { httpMetric } = response.config.metadata;
        //     // add any extra metric attributes if needed
        //     // httpMetric.putAttribute('userId', '12345678');
        //     httpMetric.setHttpResponseCode(response.status);
        //     httpMetric.setResponseContentType(response.headers['content-type']);
        //     await httpMetric.stop();
        // } catch (e) {
        //     throw new Error("Interceptors response", e);
        // }
        return response;
    },
    async error => {
        // try {
        //     const { httpMetric } = error.config.metadata;
        //     // add any extra metric attributes if needed
        //     // httpMetric.putAttribute('userId', '12345678');
        //     httpMetric.setHttpResponseCode(error.response.status);
        //     httpMetric.setResponseContentType(error.response.headers['content-type']);
        //     await httpMetric.stop();
        // } catch (e) {
        //     throw new Error('Connection Error', e);
        // }
        return Promise.reject(error);
    },
);

/**
 *
 * @param _url
 * @param _params
 * @returns {string}
 * @description build get request call api ex: https://example.com?param=1
 */
const buildGetRequest = (_url, _params) => {
    const urlRequest = new URL(_url);
    _.forOwn(_params, (value, key) => {
        urlRequest.searchParams.append(key, value);
    });
    return urlRequest.href;
};

/**
 *
 * @param _url
 * @param _params
 * @param _hasLoading
 * @returns {Promise<AxiosResponse<any> | void>}
 * @private
 */

const _get = (_url) => {
    console.log('get----', _url)

    return client.get(_url)
        .then(
            response => response.data,
            error => {
                const apiCallErrorMessage = getApiErrorMessage(error);
                return Promise.reject(apiCallErrorMessage);
            }
        );
};

/**
 *
 * @param _url
 * @param _params
 * @param _hasLoading
 * @returns {Promise<AxiosResponse<any> | void>}
 * @private
 */
const _post = (_url, _params) => {
    console.log('post----', _params)
    return client.post(_url, _params).then(
        response => response.data,
        error => {
            const apiCallErrorMessage = getApiErrorMessage(error);
            return Promise.reject(apiCallErrorMessage);
        }
    );
};
/**
 *
 * @param _url
 * @param _params
 * @returns {Promise<unknown>}
 * @private
 */
const _put = (_url, _params) => {
    return client.put(_url, _params).then(
        response => response.data,
        error => {
            const apiCallErrorMessage = getApiErrorMessage(error);
            return Promise.reject(apiCallErrorMessage);
        }
    );
};
/**
 *
 * @param _url
 * @param _params
 * @returns {Promise<unknown>}
 * @private
 */
const _delete = (_url, _params) => {
    return client.delete(_url, _params).then(
        response => response.data,
        error => {
            const apiCallErrorMessage = getApiErrorMessage(error);
            return Promise.reject(apiCallErrorMessage);
        }
    );
};
/**
 *
 * @param _url
 * @param _params
 * @param _method
 * @param _host
 * @param _headers
 * @returns {*}
 * @private
 */
const _custom = (_url, _params, _method, _host) => {
    return client({
        baseURL: _host,
        url: _url,
        data: _method === 'GET' ? null : JSON.stringify(_params),
        method: _method,
    }).then(
        response => response.data,
        error => {
            const apiCallErrorMessage = getApiErrorMessage(error);
            return Promise.reject(apiCallErrorMessage);
        });
}
const _customSoapApi = (_url, _params, _method, _host) => {
    return client({
        baseURL: _host,
        url: _url,
        data: _method === 'GET' ? null : _params,
        method: _method,
        headers: {'Content-Type': 'text/xml; charset=utf-8'},
    }).then(
        response => {
            let xmlResponse = response.data;
            // let parseString = require('xml2js').parseString;
            let parseString = require('xml2js').parseString;
        }
    )
}
/**
 *
 * @param token
 * @description set token authorization
 */

const setAuthorization = token => {
    client.defaults.headers.common.authorization = token;
};

const getApiErrorMessage = (err) => {
    let statusCode = STATUS.UNKNOWN;
    if (err.response) {
        // Request made and server responded (5xx, 4xx)
        statusCode = err.response.status;
    } else if (err.request) {
        // The request was made but no response was received
        if (err.message === 'Network Error') {
            statusCode = STATUS.NETWORK_ERROR;
        }
        if (err.message.toLocaleLowerCase().startsWith('timeout of')) {
            statusCode = STATUS.REQUEST_TIME_OUT;
        }
    } else {
        // Unhandled exception.
        statusCode = STATUS.UNKNOWN;
    }
    if (statusCode === 401) {
        statusCode = STATUS.UNAUTHORIZED;
    }

    if (statusCode === 404) {
        return {statusCode: 404, message: err.message};
    }
    return apiErrorMessageMapping.filter((apiErr) => apiErr.statusCode == statusCode)[0];
};

export const apiErrorMessageMapping = [
    {statusCode: STATUS.UNKNOWN, message: 'Có lỗi xảy ra khi kết nối vui lòng kiểm tra lại.'},
    {statusCode: STATUS.NETWORK_ERROR, message: "Không thế kết nối tới máy chủ. Vui lòng kiểm tra lại kết nối"},
    {statusCode: STATUS.REQUEST_TIME_OUT, message: 'Request time out.'},
    {statusCode: STATUS.UNAUTHORIZED, message: 'Xin lỗi, Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại'},
    {statusCode: STATUS.FORBIDDEN, message: 'Xin lỗi, Bạn không có quyền truy cập vui lòng liên hệ lại với EVN'},
    {statusCode: STATUS.INTERNAL_SERVER_ERROR, message: 'Lỗi hệ thống'},
    {statusCode: STATUS.SERVER_UNAVAILABLE, message: 'Xin lỗi, Dịch vụ không tồn tại'},
];

export {setAuthorization, _get, _post, _put, _delete, _custom};
