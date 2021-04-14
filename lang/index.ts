import en from "./en";
import enGB from "./enGB";
import enUS from "./enUS";
import fr from "./fr";
// TODO: Implement language
export default function lang(locale?: string) {
  // if (locale === "en-US") return enUS;
  // if (locale === "en-GB") return enGB;
  if (locale.startsWith("fr")) return fr;
  return en;
}
