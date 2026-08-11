import {renderComponentToBody} from '@cdek/cdek-chat-bot';

type ChatTheme = 'dark' | 'light';

type InstallTayaBotChatParams = {
  entryPoint: string;
  locale: string;
  theme?: ChatTheme;
  openOnLoad?: boolean;
};

type TayaChatBotEventData = {
  type?: string;
  func?: 'ready';
};

function postChatBotMessage(payload: Record<string, unknown>): void {
  window.postMessage({type: 'chat-bot', ...payload}, '*');
}

export const installTayaBotChat = ({
  entryPoint,
  locale,
  theme,
  openOnLoad = false,
}: InstallTayaBotChatParams): (() => void) => {
  if (!entryPoint) {
    return () => undefined;
  }

  const onMessage = (event: MessageEvent<TayaChatBotEventData>) => {
    const data = event.data;

    if (!data || data.type !== 'chat-bot' || data.func !== 'ready') {
      return;
    }

    postChatBotMessage({
      action: 'sync',
      locale,
      theme,
      entryPoint,
    });

    if (openOnLoad) {
      postChatBotMessage({action: 'open'});
    }
  };

  window.addEventListener('message', onMessage);

  renderComponentToBody({
    entryPoint,
    locale,
    theme,
  });

  return () => {
    window.removeEventListener('message', onMessage);
  };
};

export const changeTayaChatBotTheme = (theme: ChatTheme): void => {
  postChatBotMessage({action: 'theme-update', theme});
};
