# Raspberry Pi Setup for Google Assistant SDK

**Initial Setup:**

* Create GCP Project
* Import GCP project into console.actions.google.com
* Create GCP json creds
* Upload to pi

### Actions setup

* Register device
* Register model
* Download oauth2 creds (not json????)


https://developers.google.com/assistant/sdk/guides/library/python/embed/setup


### Raspberry Pi Setup


Get sound capture card + device number = card 1, device 0
```
arecord -l
```

Get sound output card + device number (`bcm2835 ALSA`) = card 0 device 0
```
aplay -l
```

Create a config file `nano /home/pi/.asoundrc`:
```
pcm.!default {
  type asym
  capture.pcm "mic"
  playback.pcm "speaker"
}
pcm.mic {
  type plug
  slave {
    pcm "hw:<card number>,<device number>"
  }
}
pcm.speaker {
  type plug
  slave {
    pcm "hw:<card number>,<device number>"
  }
}
```

Test speakers:
```
speaker-test -t wav
```

Mixer:
```
alsamixer
```

##### Creds

* Register device
* Download creds
* SCP creds to pi

##### Python

```sh
sudo apt-get update
sudo apt-get install python-dev python-virtualenv
virtualenv env --no-site-packages
env/bin/python -m pip install --upgrade pip setuptools wheel
source env/bin/activate
```

Download SDK and assets:
```sh
sudo apt-get install portaudio19-dev libffi-dev libssl-dev libmpg123-dev
python -m pip install --upgrade google-assistant-library
python -m pip install --upgrade google-assistant-sdk[samples]
python -m pip install --upgrade google-auth-oauthlib[tool]
```

Generate MORE creds:
```sh
google-oauthlib-tool --scope https://www.googleapis.com/auth/assistant-sdk-prototype \
      --scope https://www.googleapis.com/auth/gcm \
      --save --headless --client-secrets /path/to/client_secret_client-id.json
```

Run code:
```sh
googlesamples-assistant-hotword --project-id my-dev-project --device-model-id my-model
```

### Building Custom Actions

https://codelabs.developers.google.com/codelabs/actions-1/#0
