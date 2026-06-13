"use client";

import { createContext, useContext, useState } from "react";

const I18nContext = createContext();

export function I18nProvider({ children, initialLang = "es" }) {
  const [lang, setLang] = useState(initialLang);

  const changeLang = (l) => {
    setLang(l);
    document.cookie = `nodiex_lang=${l}; path=/; max-age=31536000`;
    window.location.reload(); // Forzar recarga completa para invalidar la cache en memoria de Next.js
  };

  return (
    <I18nContext.Provider value={{ lang, changeLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
