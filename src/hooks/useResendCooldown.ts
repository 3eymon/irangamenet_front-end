import { useCallback, useEffect, useState } from "react";

export const RESEND_COOLDOWN_SECONDS = 60;
const RESEND_UNTIL_KEY = "otp_resend_until";

const getRemaining = () => {
  const until = Number(localStorage.getItem(RESEND_UNTIL_KEY) ?? 0);
  return Math.max(0, Math.ceil((until - Date.now()) / 1000));
};

export const startOtpCooldown = (seconds = RESEND_COOLDOWN_SECONDS) => {
  localStorage.setItem(RESEND_UNTIL_KEY, String(Date.now() + seconds * 1000));
};

export const clearOtpCooldown = () => {
  localStorage.removeItem(RESEND_UNTIL_KEY);
};

export function useResendCooldown() {
  const [secondsLeft, setSecondsLeft] = useState(getRemaining);
  const isActive = secondsLeft > 0;

  useEffect(() => {
    if (!isActive) return;
    const id = setInterval(() => {
      const remaining = getRemaining();
      setSecondsLeft(remaining);
      if (remaining <= 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [isActive]);

  const start = useCallback((seconds = RESEND_COOLDOWN_SECONDS) => {
    startOtpCooldown(seconds);
    setSecondsLeft(seconds);
  }, []);

  return { secondsLeft, isActive, start };
}