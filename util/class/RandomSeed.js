/**
 * @description 带缓存的随机数种子。
 * @example
 * const seed = new RandomSeed(5, 10, [6])
 * seed.do()
 * // 5 or 7 or 8 or 9 or 10
 */

export class RandomSeed {
    /**
     * @param {Number} lower - 下限（包含）。
     * @param {Number} upper - 上限（包含）。
     * @param {Array} initCache - 初始缓存数组。
     * @param {Boolean} loop - 如果是，当缓存满时，清空缓存。默认 true。
    */

    constructor (lower, upper, initCache, loop = true) {
        if (upper < lower) {
            throw new Error('params error')
        }
        this.lower = lower
        this.upper = upper
        this.loop = loop
        // 在随机范围内 数的个数
        this.length = this.upper - this.lower + 1
        this.setCache(initCache || [])
    }
    setCache (cache) {
        this.initCache = cache
        this.cache = cache.concat()
        // 缓存中界限外的数个数
        this.outBoundsNum = this.initCache.reduce((total, val) => {
            if (val < this.lower || val > this.upper) {
                return total + 1
            }
            return total
        }, 0)
        // cache 能放入的元素个数是
        // cache 的长度加 cache中 超出界限的数的个数
        this.cacheLimitLength = this.length + this.outBoundsNum
    }
    do () {
        if (!this.loop && this.cache.length === this.cacheLimitLength) {
            return
        }

        if (this.upper - this.lower === 0) {
            return this.lower
        }

        const random = Math.floor(Math.random() * this.length + this.lower)

        if (this.cache.length === this.cacheLimitLength) {
            const lastValue = this.cache[this.cache.length - 1]

            if (random === lastValue) {
                return this.do()
            }
            this.cache = this.initCache.concat() || []
        }

        if (this.cache.some(number => number === random)) {
            return this.do()
        }
        this.cache.push(random)
        return random
    }
}