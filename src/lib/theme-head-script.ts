export const THEME_STORAGE_KEY = "theme";

export function getThemeHeadBlockingInlineScript(): string {
  const key = JSON.stringify(THEME_STORAGE_KEY);
  return `(function(){var k=${key};var el=document.documentElement;var stored;try{stored=localStorage.getItem(k);}catch(e){}var pref=stored||"system";if(pref!=="light"&&pref!=="dark"&&pref!=="system"){pref="system";}var resolved=pref==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):pref;if(resolved==="light"||resolved==="dark"){el.setAttribute("data-theme",resolved);el.style.colorScheme=resolved;}})();`;
}
