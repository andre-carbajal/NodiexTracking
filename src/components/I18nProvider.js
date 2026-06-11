"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("es");
  const router = useRouter();

  useEffect(() => {
    // Leer la cookie al inicializar en el cliente
    const match = document.cookie.match(new RegExp('(^| )nodiex_lang=([^;]+)'));
    if (match) setLang(match[2]);
  }, []);

  const changeLang = (l) => {
    setLang(l);
    document.cookie = `nodiex_lang=${l}; path=/; max-age=31536000`;
    router.refresh(); // Fuerza a los Server Components a re-renderizarse
  };

  return (
    <I18nContext.Provider value={{ lang, changeLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
