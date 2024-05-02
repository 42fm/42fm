<p align="center" >
    <img src="logo.png">
</p>

# Introduction

42FM is a extension that allows you to listen to music on Twitch with synchronization between users

## Table of contents

- [Installation](#installing)
- [Building](#building)
- [Contributing](#contributing)

## Installing

1. Download the latest build from the [releases page](https://github.com/42fm/42fm/releases)
1. Unzip the downloaded archive
1. Go to extensions page
1. Enable "Developer mode" in the top right corner
1. Click "Load unpacked" and select the unzipped folder
1. Done!

## Building

1. Clone repo `git clone https://github.com/42fm/42fm --recursive`
1. Change directory `cd 42fm`
1. Make sure to use the node version inside the `.nvmrc` file
1. Be sure to enable corepack with `corepack enable`
1. Install dependencies `yarn install`
1. Build for platform `yarn build:chromium:prod` or `yarn build:firefox:prod`
1. The output will be in the `dist/chromium` or `dist/firefox` respectively

## Contributing

If you want to contribute feel free to open a pull request.
