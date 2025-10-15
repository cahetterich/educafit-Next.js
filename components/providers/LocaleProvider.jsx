// export const i18n = new I18n(dict);
// i18n.enableFallback = true;

// export function t(key, params){ return i18n.t(key, params); }
// export function tx(key, params){ return i18n.t(key, params); }


// export function setLocale(l){
//   i18n.locale = l;
//   try {
//     localStorage.setItem('eduLocale', l);
//     document.cookie = `eduLocale=${l}; path=/; max-age=31536000`;
//   } catch {}
// }
// export function getLocale(){ return i18n.locale; }

// components/providers/LocaleProvider.jsx
'use client';
import React from 'react';
import { i18n } from '../..//lib/i18n'; // raiz/lib/i18n (duas vezes ..)

export default function LocaleProvider({ initialLocale, children }) {
  i18n.locale = initialLocale;
  return <>{children}</>;
}
