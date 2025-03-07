<p align="center">
   <img src="logo.png" alt="42FM Logo">
</p>

<p align="center">
   <a href="https://chromewebstore.google.com/detail/42fm/djkopjknjkhhhlbpaooiffegfhibkdka">
      <img alt="Chrome Web Store Version" src="https://img.shields.io/chrome-web-store/v/djkopjknjkhhhlbpaooiffegfhibkdka">
   </a>
   <a href="https://addons.mozilla.org/en-US/firefox/addon/42fm">
      <img alt="Mozilla Add-on Version" src="https://img.shields.io/amo/v/42fm">
   </a>
   <img alt="GitHub Release" src="https://img.shields.io/github/v/release/42fm/42fm">
   <img alt="Chrome Web Store Stars" src="https://img.shields.io/chrome-web-store/stars/djkopjknjkhhhlbpaooiffegfhibkdka">
</p>

## Overview

A browser extension that enables synchronized music listening experience on Twitch

## Installing

### From Store

- [Chrome](https://chromewebstore.google.com/detail/42fm/djkopjknjkhhhlbpaooiffegfhibkdka)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/42fm)

### Manual

1. Download the latest build from the [releases page](https://github.com/42fm/42fm/releases)
2. Extract the downloaded archive
3. Navigate to your browser's extensions page:
   - Chrome: `chrome://extensions/`
     - Enable `Developer mode` (typically in the top right corner)
   - Firefox: `about:debugging`
     - Click `This Firefox`
4. Click "Load unpacked" (Chrome) or "Load Temporary Add-on" (Firefox) and select the extracted folder

## Building from Source

> [!IMPORTANT]
> The build process depends on the YouTube iFrame API script, which is downloaded during building. Occasional build failures may occur if this script is temporarily unavailable.

### Prerequisites

- Git
- Node.js (version specified in `.nvmrc`)
- Yarn (via corepack)

### Steps

1. Clone the repository with submodules:

   ```sh
   git clone https://github.com/42fm/42fm --recursive
   ```

1. Navigate to the project directory:

   ```sh
   cd 42fm
   ```

1. Ensure you're using the correct Node.js version:

   ```sh
   nvm use
   ```

1. Enable corepack:

   ```sh
   corepack enable
   ```

1. Install dependencies:

   ```sh
   yarn install
   ```

1. Build for your target browser:

   - For Chrome/Chromium:
     ```sh
     yarn build:chromium:prod
     ```
   - For Firefox:
     ```sh
     yarn build:firefox:prod
     ```

1. Find the compiled extension in the respective output directory:
   - Chrome: `dist/chromium/`
   - Firefox: `dist/firefox/`

## Contributing

If you want to contribute, feel free to open a pull request.

## Related Projects

- [42FM Server](https://github.com/42fm/server) - The 42fm server
