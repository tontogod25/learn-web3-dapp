import {UserActivity} from '../types';

type Analytics = {
  track: (eventName: string, data: Record<string, any>) => void;
  page: (url: string) => void;
};

declare let global: {
  analytics: Analytics;
};
declare let window: {
  analytics: Analytics;
};

export const trackEvent = (
  eventName: string,
  data: Record<string, any>,
): void => {
  if (global?.analytics) {
    global.analytics.track(eventName, data);
  }
};

export const trackTutorialStepViewed = (
  chainId: string,
  stepTitle: string,
  action: 'next' | 'prev',
) => {
  trackEvent(UserActivity.TUTORIAL_STEP_VIEWED, {
    protocol: chainId,
    stepTitle,
    action,
  });
};

export const trackStorageCleared = (chainId: string) => {
  trackEvent(UserActivity.STORAGE_CLEARED, {
    protocol: chainId,
  });
};

export const trackPageView = (url: string): void => {
  if (typeof window !== 'undefined' && window.analytics) {
    window.analytics.page(url);
  }
};
