# MacOS Dev Setup

Forever WIP

## USAGE

`sh bootstrapper.sh`

#### all the apps at once

Install some useful CLI tools quickly with `brew` and install an entire workflow in one go with `brew cask`:

Install Adobe CC Desktop with `/usr/local/Caskroom/adobe-creative-cloud/latest/Creative Cloud Installer.app`, and then install Adobe Apps.

Includes:

* 1password
* Adobe CC
* Alfred toolbar
* AppCleaner
* Atom
* Bartender taskbar
* Cyberduck FTP
* Docker
* Dropbox
* Google Chrome
* Google Cloud `gcloud` SDK
* iTerm2 terminal
* java
* Postman (REST API request tester)
* Quicklook utilities for `.md`, `.csv`, `.json` etc
* Slack
* Spectacle window manager
* Spotify
* Unarchiver
* Virtualbox VMs
* Wireshark (for tcpdump)

#### dev tools

Some other useful stuff I always end up having to use.

First, generate an SSH key: `ssh-keygen -t rsa -b 4096` and follow prompts. No passphrase needed. If you want to create specific keys for certain services, you can name the file when the prompt asks `Enter file in which to save the key (/Users/<username>/.ssh/id_rsa):`. `id_rsa` is the default, and will be read automatically when using the key.

Set up SSH keys and a Personal Access Token (or maybe it's just me that uses 2FA?).

Edit `utils/git/.gitconfig.example` `username` to be the generated Personal Access Token and `password`. This is a hack to keep github from prompting for (and failing to read) your password when trying to interact with repos over HTTPS instead of SSH.


* setup git
* install python + virtualenv
* install node + build tools
* install ruby + rbenv
* install docker


#### atom text editor

* Install packages and theme
* Install 'photoshop for code' toolbar for Atom


#### system settings
* Disable save to icloud by default
* Quit Printer App When Job Completes
* Disable The “Are You Sure You Want To Open This Application?” Dialog
* Remove duplicates In The “Open With” Menu
* Disable shadow in screenshots
* Keep Folders at Top
* Disable warning for changing file extension
* Quicklook text selection
* Prevent DS_Store on network drives
* safari dev panel
* expand save menu by default
* disable bonjour broadcasting of services
* turn off automatic time machine prompts
* turn off apple remote IR receiver
* pf packet filter rules for secure shared service access over vpn
* disable captive portal autoprompts
* set pw/screensaver to set automatically
