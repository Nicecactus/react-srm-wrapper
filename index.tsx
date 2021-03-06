import React, { createRef, useEffect, useState } from 'react';
import { ResourceFetcherService } from './resource-fetcher.service';
import { getObjectFromPath } from './getObjectFromPath';
import { useHistory } from 'react-router-dom';
import urljoin from 'url-join';

interface SRMEvent {
  [value: string]: any;
}

interface SRMMethods {
  setBasename: (basename: string) => string;
  setLanguage: (language: string) => string;
  setEvent: (data: SRMEvent) => SRMEvent;
}

export interface Props {
  originUrl: string;
  exportPath: string;
  basename?: string;
  language?: string;
  event?: { [key: string]: any };
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
  event,
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
    if (originUrl && !originUrl.endsWith('/')) {
      originUrl += '/';
    }
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


  useEffect(() => {
    if (event) {
      srmMethods?.setEvent(event);
    }
  }, [event])

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
      event: event,
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
