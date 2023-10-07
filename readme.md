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

```
git clone https://github.com/42fm/42fm --recursive
cd 42fm
yarn install

# Building for Chromium based browsers (Chrome, Edge, Opera)
yarn build:chromium:prod

OR

# Building for Firefox
yarn build:firefox:prod
```

## Contributing

If you want to contribute feel free to open a pull request.
