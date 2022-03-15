import axios from 'axios';
import {STATUS} from '../../constants';
import Storage from "../../utils/Storage";
/**
 * @author AnhVTN11
 * @type {AxiosInstance}
 */

/**
 * @description create instance
 * @type {AxiosInstance}
 */

const client = axios.create({
        baseURL: 'http://localhost:8080/',
        // baseURL: 'https://app.itel.vn/api/',
        //baseURL: 'http://10.14.121.6/api/',
        mode: 'no-cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'same-origin',
        timeout: 5000
    }
);

/**
 * @description get access token in storage
 * @returns {Promise<string|undefined>}
 */
const getAccessToken = async () => {
    const userData = Storage.get('userData')
    return userData?.accessToken
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
        console.log('response', response)
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
                console.log('err', error)
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
        if (!err?.response?.headers?.error?.includes('You don\'t have permission to access this function')) {
            statusCode = STATUS.UNAUTHORIZED;
        } else {
            return {statusCode: "00", message: ""}
        }
    }

    if (statusCode === 404) {
        return {statusCode: 404, message: err.message};
    }
    return apiErrorMessageMapping.filter((apiErr) => apiErr.statusCode == statusCode)[0];
};

export const apiErrorMessageMapping = [
    {statusCode: STATUS.UNKNOWN, message: 'Có lỗi xảy ra khi kết nối vui lòng kiểm tra lại.'},
    {statusCode: STATUS.MULTIPLE_DEVICES, message: 'Tài khoản của bạn đang đăng nhập ở một thiết bị khác.'},
    {statusCode: STATUS.NETWORK_ERROR, message: "Không thế kết nối tới máy chủ. Vui lòng kiểm tra lại kết nối"},
    {statusCode: STATUS.REQUEST_TIME_OUT, message: 'Không thế kết nối tới máy chủ. Vui lòng kiểm tra lại kết nối'},
    {statusCode: STATUS.UNAUTHORIZED, message: 'Xin lỗi, Phiên đăng nhập của bạn đã hết hạn vui lòng đăng nhập lại'},
    {statusCode: STATUS.FORBIDDEN, message: 'Xin lỗi, Bạn không có quyền truy cập vui lòng liên hệ lại với EVN'},
    {statusCode: STATUS.INTERNAL_SERVER_ERROR, message: 'Lỗi hệ thống'},
    {statusCode: STATUS.SERVER_UNAVAILABLE, message: 'Xin lỗi, Dịch vụ không tồn tại'},
];

export {setAuthorization, _get, _post, _put, _delete, _custom};
