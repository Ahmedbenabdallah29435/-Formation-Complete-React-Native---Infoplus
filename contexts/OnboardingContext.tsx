import { createContext, ReactNode, useContext, useState } from 'react';

type OnboardingContextValue = {
  showing: boolean;
  show: () => void;
  hide: () => void;
};

const OnboardingContext = createContext<OnboardingContextValue>({
  showing: true,
  show: () => {},
  hide: () => {},
});

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [showing, setShowing] = useState(true);
  return (
    <OnboardingContext.Provider
      value={{ showing, show: () => setShowing(true), hide: () => setShowing(false) }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  return useContext(OnboardingContext);
}
