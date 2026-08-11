import React, {type ReactNode, useEffect} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import {
  changeTayaChatBotTheme,
  installTayaBotChat,
} from '../../taya-bot';

type TayaCustomFields = {
  tayaChatBotEntryPoint?: string;
  tayaChatBotLocale?: string;
  tayaChatBotTheme?: 'light' | 'dark' | '';
  tayaChatBotOpenOnLoad?: string;
};

export default function Root({children}: {children: ReactNode}): JSX.Element {
  const {siteConfig, i18n} = useDocusaurusContext();
  const customFields = (siteConfig.customFields ?? {}) as TayaCustomFields;

  const entryPoint = customFields.tayaChatBotEntryPoint ?? '';
  const locale = customFields.tayaChatBotLocale ?? i18n.currentLocale ?? 'ru';
  const configuredTheme = customFields.tayaChatBotTheme;
  const theme = configuredTheme || 'light';
  const openOnLoad = customFields.tayaChatBotOpenOnLoad === 'true';

  useEffect(() => {
    if (!entryPoint) {
      return;
    }

    const cleanup = installTayaBotChat({
      entryPoint,
      locale,
      theme,
      openOnLoad,
    });

    return cleanup;
  }, [entryPoint, locale, openOnLoad]);

  useEffect(() => {
    changeTayaChatBotTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (configuredTheme) {
      return;
    }

    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark' || currentTheme === 'light') {
      changeTayaChatBotTheme(currentTheme);
    }
  }, [configuredTheme]);

  return <>{children}</>;
}
