export interface AssetManifest {
  entrypoints: Array<string>;
}

interface ResourceCache {
  assetManifests: Cache<Promise<any>>;
  scripts: Cache<Promise<void>>;
  styles: Cache<Promise<void>>;
}

interface Cache<T> {
  [key: string]: T;
}

export class ResourceFetcherService {
  private static resourceCache: ResourceCache = {
    assetManifests: {},
    scripts: {},
    styles: {},
  };

  public static async loadSRM(originUrl: string): Promise<void> {
    const assetManifest = await ResourceFetcherService.loadManifest(originUrl);
    if (!assetManifest || !assetManifest.entrypoints) {
      return;
    }

    await Promise.all(assetManifest.entrypoints.map(asset => {
      const [ext] = asset.match(/\.\w+$/) || [];

      switch (ext) {
        case '.js':
          return ResourceFetcherService.loadScript(new URL(asset, originUrl).href);
        case '.css':
          return ResourceFetcherService.loadStyle(new URL(asset, originUrl).href);
      }
      return;
    }));
  }

  private static async loadManifest(originUrl: string): Promise<AssetManifest> {
    const url = new URL('asset-manifest.json', originUrl).href;
    if (!ResourceFetcherService.resourceCache.assetManifests[url]) {
      ResourceFetcherService.resourceCache.assetManifests[url] = fetch(url).then(r => r.json());
    }

    return ResourceFetcherService.resourceCache.assetManifests[url];
  }

  private static async loadScript(src: string): Promise<void> {
    if (!ResourceFetcherService.resourceCache.scripts[src]) {
      const script = document.createElement('script') as HTMLScriptElement;
      script.async = true;
      script.src = src;
      const promise = new Promise<void>(res => script.onload = () => res());
      document.head.appendChild(script);

      ResourceFetcherService.resourceCache.scripts[src] = promise;
    }

    return ResourceFetcherService.resourceCache.scripts[src];
  }

  private static async loadStyle(src: string): Promise<void> {
    if (!ResourceFetcherService.resourceCache.styles[src]) {
      const link = document.createElement('link') as HTMLLinkElement;
      link.rel = 'stylesheet';
      link.href = src;
      const promise = new Promise<void>(res => link.onload = () => res());
      document.head.appendChild(link);

      ResourceFetcherService.resourceCache.styles[src] = promise;
    }

    return ResourceFetcherService.resourceCache.styles[src];
  }
}
