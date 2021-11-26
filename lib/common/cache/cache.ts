import LRUCache from 'lru-cache';

export namespace NSCacheSet {
	type CacheStore = {
		[name: string]: LRUCache<any, any>;
	}

	interface ICacheSet {
		// New returns a new cache
		New(name: string, opts?: LRUCache.Options<any, any>): LRUCache<any, any>;

		// Get returns the cache in cacheStore
		Get(name: string): LRUCache<any, any>;

		// Clear cache set
		Clear();
	}

	class CacheSet implements ICacheSet {
		private _cacheStore: CacheStore = {};

		// New returns a new cache, default age 60s
		New(name: string, opts?: LRUCache.Options<any, any>): LRUCache<any, any> {
			const defaultOpts: LRUCache.Options<any, any> = {
				max: 10,
				maxAge: 1000 * 60,
			};

			if (opts) {
				defaultOpts.max = opts.max ? opts.max : 10;
				defaultOpts.maxAge = opts.maxAge ? opts.maxAge : 1000 * 60;
			}

			if (!this._cacheStore[name]) {
				this._cacheStore[name] = new LRUCache(defaultOpts);
			}

			return this._cacheStore[name];
		}

		// Get returns the cache in cacheStore
		Get(name: string): LRUCache<any, any> {
			if (!name) {
				return null;
			}

			if (!this._cacheStore[name]) {
				return null;
			}

			return this._cacheStore[name];
		}

		// Clear all cache in set
		Clear() {
			for (const cacheStoreKey in this._cacheStore) {
				this._cacheStore[cacheStoreKey].reset();
			}
		}

		// Remove all cache object (NOT SAFE)
		Remove() {
			delete this._cacheStore;
			this._cacheStore = {};
		}
	}

	// New returns a new cache set
	export function New() {
		return new CacheSet();
	}
}
