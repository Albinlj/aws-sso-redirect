// Map of tabId -> return URL
const returnUrls = new Map();

// Redirect AWS sign-in to SSO portal
chrome.webNavigation.onBeforeNavigate.addListener(
  (details) => {
    if (details.frameId !== 0) return;

    const url = new URL(details.url);

    // Only intercept the sign-in page, not federation/SAML endpoints
    if (url.pathname !== '/signin') return;

    const redirectUri = url.searchParams.get('redirect_uri');
    if (!redirectUri) return;

    chrome.storage.sync.get('sso_portal_url', ({ sso_portal_url }) => {
      if (!sso_portal_url) return;
      returnUrls.set(details.tabId, redirectUri);
      chrome.tabs.update(details.tabId, { url: sso_portal_url });
    });
  },
  { url: [{ hostSuffix: 'signin.aws.amazon.com' }] }
);

// After SSO, redirect back to the original console page
chrome.webNavigation.onCompleted.addListener(
  (details) => {
    if (details.frameId !== 0) return;

    const returnUrl = returnUrls.get(details.tabId);
    if (!returnUrl) return;
    returnUrls.delete(details.tabId);
    if (details.url !== returnUrl) {
      chrome.tabs.update(details.tabId, { url: returnUrl });
    }
  },
  { url: [{ hostSuffix: 'console.aws.amazon.com' }] }
);

// Clean up when tabs are closed
chrome.tabs.onRemoved.addListener((tabId) => {
  returnUrls.delete(tabId);
});
