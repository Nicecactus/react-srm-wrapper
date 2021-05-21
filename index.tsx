import React, { createRef, useEffect, useState } from 'react';
import { ResourceFetcherService } from './resource-fetcher.service';
import { getObjectFromPath } from './getObjectFromPath';
import { useHistory } from 'react-router-dom';
import urljoin from 'url-join';

interface SRMMethods {
  setBasename: (basename: string) => string;
  setLanguage: (language: string) => string;
}

export interface Props {
  originUrl: string;
  exportPath: string;
  basename?: string;
  language?: string;
  arguments?: any;
  eventHandlers?: { [id: string]: (...args: Array<any>) => Promise<any> };
  loaded?: (el: HTMLElement) => any;
  rendered?: (ret: any) => any;
}

export function ReactSRMWrapper({
  originUrl,
  exportPath,
  basename,
  language,
  arguments: renderArguments,
  eventHandlers,
  loaded,
  rendered,
}: Props) {
  const anchorEl = createRef<HTMLDivElement>();
  const history = useHistory();
  const [initialized, setInitialized] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [srmMethods, setSrmMethods] = useState<SRMMethods | undefined>(undefined);

  const initialize = async () => {
    await ResourceFetcherService.loadSRM(originUrl);

    loaded?.(anchorEl.current!);

    setInitialized(true);
  };

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    execute();
  }, [anchorEl, initialized])

  const execute = () => {
    if (executed || !anchorEl.current || !initialized) {
      return;
    }

    setExecuted(true);
    const obj = getObjectFromPath(exportPath);
    if (!obj || !obj.render) {
      return;
    }

    setSrmMethods(obj.render({
      element: anchorEl.current,
      basename: basename,
      language: language,
      navigate: (commands: any[], _options: any) => history.push(urljoin(commands)),
      sendEvent: (id: string, ...args: Array<any>) => eventHandlers?.[id]?.(...args),
      ...renderArguments,
    }));

    rendered?.(srmMethods);
  }

  return (
    <div ref={anchorEl}></div>
  );
}
