import en from "./en";
// import enGB from "./enGB";
// import enUS from "./enUS";
import fr from "./fr";

export default function lang(locale = "en") {
  // if (locale === "en-US") return enUS;
  // if (locale === "en-GB") return enGB;
  if (locale.startsWith("fr")) return fr;
  return en;
}
