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
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
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
        console.log('response',response)
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
                console.log('err',error)
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
    console.log('putt',_url,_params)
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
    {statusCode: STATUS.UNKNOWN, message: 'C?? l???i x???y ra khi k???t n???i vui l??ng ki???m tra l???i.'},
    {statusCode: STATUS.MULTIPLE_DEVICES, message: 'T??i kho???n c???a b???n ??ang ????ng nh???p ??? m???t thi???t b??? kh??c.'},
    {statusCode: STATUS.NETWORK_ERROR, message: "Kh??ng th??? k???t n???i t???i m??y ch???. Vui l??ng ki???m tra l???i k???t n???i"},
    {statusCode: STATUS.REQUEST_TIME_OUT, message: 'Kh??ng th??? k???t n???i t???i m??y ch???. Vui l??ng ki???m tra l???i k???t n???i'},
    {statusCode: STATUS.UNAUTHORIZED, message: 'Xin l???i, Phi??n ????ng nh???p c???a b???n ???? h???t h???n vui l??ng ????ng nh???p l???i'},
    {statusCode: STATUS.FORBIDDEN, message: 'Xin l???i, B???n kh??ng c?? quy???n truy c???p vui l??ng li??n h??? l???i v???i EVN'},
    {statusCode: STATUS.INTERNAL_SERVER_ERROR, message: 'L???i h??? th???ng'},
    {statusCode: STATUS.SERVER_UNAVAILABLE, message: 'Xin l???i, D???ch v??? kh??ng t???n t???i'},
];

export {setAuthorization, _get, _post, _put, _delete, _custom};
