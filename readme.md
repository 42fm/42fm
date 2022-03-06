<p align="center" >
    <img src="logo.png">
</p>

# Introduction

42FM is a extension that allows you to listen to music on Twitch with synchronization between users

## Table of contents

- [Installation](#installation)
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

```
git clone git@github.com:42fm/42fm.git --recursive
cd 42fm
yarn install

# Building for Chromium based browsers (Chrome, Edge, Opera)
yarn build:chromium:dev

OR

# Building for Firefox (doesn't work at the moment)
yarn build:firefox:prod
```

## Contributing

If you want to contribute feel free to open a pull request. Be sure to checkout to the `dev` branch before making a pull request.
