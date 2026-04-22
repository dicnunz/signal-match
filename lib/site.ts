export const siteConfig = {
  name: "SignalMatch",
  repoName: "signal-match",
  githubPagesUrl: "https://dicnunz.github.io/signal-match",
  gumroadUrl: "",
};

export function getBuyHref() {
  return siteConfig.gumroadUrl || "#role-pack";
}

export function hasBuyLink() {
  return Boolean(siteConfig.gumroadUrl);
}
