# AWS SSO Redirect

Chrome extension that automatically redirects AWS Console sign-in to your IAM Identity Center (SSO) portal.

## How it works

When you visit an AWS Console page without an active session, AWS redirects you to its default sign-in page. This extension intercepts that redirect and sends you to your SSO portal instead. After you authenticate, it redirects you back to the original AWS Console page you were trying to reach.

## Setup

1. Install the extension
2. Right-click the extension icon → **Options**
3. Enter your AWS IAM Identity Center start URL (e.g. `https://d-xxxxxxxxxx.awsapps.com/start#/`)
4. Click **Save**

## Installation (unpacked)

1. Open Chrome and go to `chrome://extensions`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked" and select this folder
4. Enable the extension in incognito mode if needed (extension details → Allow in Incognito)
