export const siteConfig = {
  name: "SignalMatch",
  repoName: "signal-match",
  githubPagesUrl: "https://dicnunz.github.io/signal-match",
  gumroadUrl: "",
  supportReceiptUrl: "https://nicdunz.gumroad.com/l/smrimu",
};

export function getBuyHref() {
  return siteConfig.gumroadUrl || "#role-pack";
}

export function hasBuyLink() {
  return Boolean(siteConfig.gumroadUrl);
}

export function getSupportReceiptHref() {
  return siteConfig.supportReceiptUrl;
}
