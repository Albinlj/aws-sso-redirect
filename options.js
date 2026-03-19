const ssoUrlInput = document.getElementById("sso-url");
const saveButton = document.getElementById("save");
const statusText = document.getElementById("status");

chrome.storage.sync.get("sso_portal_url", (result) => {
  if (result.sso_portal_url) {
    ssoUrlInput.value = result.sso_portal_url;
  }
});

let timeout;

saveButton.addEventListener("click", () => {
  clearTimeout(timeout);
  const url = ssoUrlInput.value.trim();
  if (!url) {
    statusText.textContent = "Please enter a URL.";
    statusText.style.color = "red";
    return;
  }
  chrome.storage.sync.set({ sso_portal_url: url }, () => {
    statusText.textContent = "Saved!";
    statusText.style.color = "green";
    timeout = setTimeout(() => {
      statusText.textContent = "";
    }, 2000);
  });
});
