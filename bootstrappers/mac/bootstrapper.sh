#!/bin/bash

utils=(
    coreutils
    moreutils
    findutils
    grep
    gnu-sed
    curl
    ngrep
    tree
    watch
    wget
    nmap
    colordiff
    gnupg
    gnupg2
    exiftool
    tcpflow
    tcpreplay
    tcptrace
)

dev=(
    bash
    git
    python
    ruby
    ruby-build
    rbenv
    nodenv
)

apps=(
    1password
    adobe-creative-cloud
    alfred
    appcleaner
    atom
    bartender
    cyberduck
    docker
    dropbox
    google-chrome
    google-cloud-sdk
    iterm2
    java
    postman
    qlcolorcode
    qlimagesize
    qlmarkdown
    qlprettypatch
    qlstephen
    quicklook-csv
    quicklook-json
    slack
    spectacle
    spotify
    the-unarchiver
    # virtualbox-extension-pack
    # vitualbox
    webpquicklook
)

# Install xcode command line tools
xcode-select --install

# Change catalina's default zsh shell to bash
chsh -s /bin/bash

# change curl's useragent
echo -e 'user-agent = "Mozilla/5.0 (Windows NT 6.1; rv:45.0) Gecko/20100101 Firefox/45.0"\n
referer = ";auto"\n
connect-timeout = 10\n
progress-bar\n
max-time = 90\n
verbose\n
show-error\n
remote-time\n
ipv4' >> ~/.curlrc

# Install Brew
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# Change permissions for Brew to Yourself
# sudo chown -R $(whoami) /usr/local

# tap needed formulas
# echo "tapping homebrew repos"
brew doctor

# Install utils
echo "Installing brew tools"
brew install ${utils[@]}

# Install apps to /Applications
echo "installing apps"
brew cask install ${apps[@]}

# Install apps to /Applications
echo "installing developer environmentals"
brew install ${dev[@]}

# dotfiles
cp ./.bashrc ~/.bashrc && cp ./.bash_profile ~/.bash_profile
source ~/.bash_profile

# Atom
apm install tool-bar git-plus flex-tool-bar atom-visual-studio-code-ui package-sync
cp utils/atom/packages.cson ~/.atom/packages.cson
cp utils/atom/toolbar.cson ~/.atom/toolbar.cson

# git
cp utils/git/.gitconfig.example ~/.gitconfig
cp utils/git/.gitignore.example ~/.gitignore

# node
echo 'eval "$(nodenv init -)"' >> ~/.bash_profile
source ~/.bash_profile
nodenv install 12.13.0
nodenv global 12.13.0
nodenv rehash

# ruby
echo 'export PATH="$PATH:$HOME/.rvm/bin"' >> ~/.bash_profile
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
source ~/.bash_profile
curl -L https://get.rvm.io | bash -s stable --ruby
rvm get stable
rbenv install 2.6.5
rbenv global 2.6.5
rbenv rehash
gem update --system
gem install bundler
rbenv rehash

# python (using homebrews)
pip3 install --upgrade setuptools
pip3 install --upgrade distribute
pip3 install --upgrade pip
pip3 install virtualenv



# SYSTEMS

# silence catalina shell warning
echo "export BASH_SILENCE_DEPRECATION_WARNING=1" >> ~/.bash_profile

# Save To Disk (not to iCloud) By Default
defaults write NSGlobalDomain NSDocumentSaveNewDocumentsToCloud -bool false

# Automatically Quit Printer App Once The Print Jobs Complete
defaults write com.apple.print.PrintingPrefs "Quit When Finished" -bool true

# Disable The “Are You Sure You Want To Open This Application?” Dialog
defaults write com.apple.LaunchServices LSQuarantine -bool false

# Remove duplicates In The “Open With” Menu.
/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister -kill -r -domain local -domain system -domain user

# Disable shadow in screenshots
defaults write com.apple.screencapture disable-shadow -bool true

#Keep folders At Top When Sorting By Name.
defaults write com.apple.finder _FXSortFoldersFirst -bool true

#Disable the warning when changing a file extension
defaults write com.apple.finder FXEnableExtensionChangeWarning -bool false

# no DS and finder text select
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool true
defaults write com.apple.finder QLEnableTextSelection -bool true

# safari dev panel
defaults write com.apple.Safari IncludeDevelopMenu -bool true
defaults write com.apple.Safari WebKitDeveloperExtrasEnabledPreferenceKey -bool true
defaults write com.apple.Safari "com.apple.Safari.ContentPageGroupIdentifier.WebKit2DeveloperExtrasEnabled" -bool true
defaults write NSGlobalDomain WebKitDeveloperExtras -bool true

# disable bonjour from broadcasting your services
defaults write /Library/Preferences/com.apple.mDNSResponder.plist NoMulticastAdvertisements -bool YES

# expand save menu by default
defaults write -g NSNavPanelExpandedStateForSaveMode -bool true && \
defaults write -g NSNavPanelExpandedStateForSaveMode2 -bool true

# disable automatic time machine prompts for external HDs
sudo defaults write /Library/Preferences/com.apple.TimeMachine DoNotOfferNewDisksForBackup -bool true

# turn off apple IR remote receiver
defaults write /Library/Preferences/com.apple.driver.AppleIRController DeviceEnabled -int 0

# disable opening captive portal pages in network preferences instead of browser
sudo defaults write /Library/Preferences/SystemConfiguration/com.apple.captive.control Active -bool false

# set password and screensaver to lock immediately
sudo defaults write com.apple.screensaver askForPassword -int 1
sudo defaults write com.apple.screensaver askForPasswordDelay -int 0

# disable "report crash" prompts
sudo defaults write com.apple.CrashReporter DialogType none

## Open certain apps in light mode
defaults write `osascript -e 'id of app "Finder"'` NSRequiresAquaSystemAppearance -bool yes
defaults write `osascript -e 'id of app "Notes"'` NSRequiresAquaSystemAppearance -bool yes
defaults write `osascript -e 'id of app "Chrome"'` NSRequiresAquaSystemAppearance -bool yes
defaults write `osascript -e 'id of app "iChat"'` NSRequiresAquaSystemAppearance -bool yes
defaults write `osascript -e 'id of app "System Preferences"'` NSRequiresAquaSystemAppearance -bool yes


## print true for all plists with light theme
# for x in `ls ~/Library/Preferences/*.plist` ; do /usr/libexec/PlistBuddy -c 'print ":NSRequiresAquaSystemAppearance"' $x ; if true; then echo "!! $x" ; fi ; done


## TODO fix packet filter for Catalina
# # packet filter firewall (pf)
# sudo cat <<EOT >> /etc/pf.conf
# # limit ssh to vpn subnet
# block in proto tcp from any to any port 22
# pass in proto tcp from 10.8.0.0/8 to any port 22
#
# # limit afp to vpn subnet
# block in proto tcp from any to any port 548
# pass in proto tcp from 10.8.0.0/8 to any port 548
#
# # limit smb to vpn subnet
# block in proto tcp from any to any port 139
# pass in proto tcp from 10.8.0.0/8 to any port 139
# block in proto tcp from any to any port 445
# pass in proto tcp from 10.8.0.0/8 to any port 445
#
# # limit vnc to vpn subnet
# block in proto tcp from any to any port 5900
# pass in proto tcp from 10.8.0.0/8 to any port 5900
#
# EOT
#
# sudo pfctl -f /etc/pf.conf
