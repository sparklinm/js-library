/**
 * @description
 * axios 并发请求处理竞态，
 * （注意这个类不能直接使用，是对 axios.request 的封装）
 * @example
 * // 使用
 * let axiosRace = new AxiosRace({ blockAfter: true });
 * // url: 请求地址
 * // config: axios 请求配置
 * axiosRace.request(url, config)
 */

class AxiosRace {
    #preCancelTokenSource = null;
    #firstRequest = null;
    hasFirstRequest = false;

    /**
     * @param {Object} options - 配置项。
     * @param {Boolean} options.cancelBefore - 取消之前的请求，只有最后一个请求有效。
     * @param {Boolean} options.blockAfter - 后面的请求不执行，并返回第一个请求的结果。
     */
    constructor (options) {
        const { blockAfter, cancelBefore } = options;

        if (cancelBefore) {
            this.request = this.#requestCancelBefore;
            return;
        }

        if (blockAfter) {
            this.request = this.#requestBlockAfter;
            return;
        }

        throw new Error('please provide the correct options');
    }

    // 取消之前的请求，只有最后一个请求有效
    #requestCancelBefore (url, config) {
        const axiosConfig = {
            ...config
        };

        // 取消上一次请求
        if (this.#preCancelTokenSource) {
            this.#preCancelTokenSource.cancel();
        }

        // 创建 cancel token
        const source = CancelToken.source();

        axiosConfig.cancelToken = source.token;
        axiosConfig.url = url;

        // 存储 cancel token
        this.#preCancelTokenSource = source;

        return axios.request(axiosConfig).finally(() => {
            this.#preCancelTokenSource = null;
        });
    }

    // 后面的请求不执行，并返回第一个请求的结果
    #requestBlockAfter (url, config) {
        // 返回第一次请求的结果
        if (this.#firstRequest) {
            return this.#firstRequest;
        }

        const axiosConfig = {
            ...config
        };

        axiosConfig.url = url;

        this.#firstRequest = axios.request(axiosConfig).finally(() => {
            this.#firstRequest = null;
            this.hasFirstRequest = false;
        });
        this.hasFirstRequest = true;

        return this.#firstRequest;
    }
}

export { AxiosRace };
