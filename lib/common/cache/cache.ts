import LRUCache from 'lru-cache';

export namespace NSCacheSet {
	type CacheStore = {
		[name: string]: LRUCache<any, any>;
	}

	const defaultOpts = {
		max: 10,
		ttl: 1000 * 60,
	};

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
		New(name: string, opts?: any): LRUCache<any, any> {
			if (!this._cacheStore[name]) {
				this._cacheStore[name] = new LRUCache(opts ? opts : defaultOpts);
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
				this._cacheStore[cacheStoreKey].clear();
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
