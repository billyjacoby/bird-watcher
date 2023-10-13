# Bird Watcher

A React Native app built for [Frigate NVR](https://frigate.video)

## Development

Ensure that you move that you create a new `.env` file based on the `.env.example` file. Ensure this contains the proper URL for your local Frigate server.

Currently live streaming is only available using WebRTC, so this must be configured in your Frigate instance in order to get any live camera views.

## Goals

The main goal of this project is to build a React Native application that has all of the same functionalities of the Frigate web app and eventually  the Frigate HomeAssistant card as well.

As much as I love HomeAssistant I would love a separate application to manage my NVR, and the goal of this project is to provide that.

Though this is built in React Native, the immediate focus is to build an iOS native app. Android will follow as long as there are people that would use it. I don't regularly use an Android device, but I could certainly see a use case for a native Android app on smart home tablets specifically.

## Roadmap

Though this project is still in the very early stages, it is maturing quickly. The items below are what is next on the roadmap for feature implementation:

- [x] Event viewing
- [x] Recording viewing
- [ ] View & update config
- [ ] Local user settings
- [ ] User onboarding
- [ ] Recording management
- [ ] Live camera views
  - [ ] WebRTC
        Partially implemented - still needs work
  - [ ] JSMPEG
- [ ] Event notifications
