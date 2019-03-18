#!/bin/bash

utils=(
    coreutils
    moreutils
    findutils
    grep
    gnu-sed --with-default-names
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
    node
    ruby
    ruby-build
    rbenv
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
    libreoffice
    qlcolorcode
    qlimagesize
    qlmarkdown
    qlprettypatch
    qlstephen
    quicklook-csv
    quicklook-json
    betterzipql
    slack
    spectacle
    spotify
    the-unarchiver
    virtualbox-extension-pack
    vitualbox
    webpquicklook
    wireshark
)

# Install xcode command line tools
xcode-select --install

# change curl's useragent
echo -e "user-agent = "Mozilla/5.0 (Windows NT 6.1; rv:45.0) Gecko/20100101 Firefox/45.0"\n
referer = ";auto"\n
connect-timeout = 10\n
progress-bar\n
max-time = 90\n
verbose\n
show-error\n
remote-time\n
ipv4" >> ~/.curlrc

# Install Brew
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# Change permissions for Brew to Yourself
sudo chown -R `whoami` /usr/local

# tap needed formulas
# echo "tapping homebrew repos"
brew tap homebrew/dupes
brew tap homebrew/nginx
brew tap homebrew/services
brew tap homebrew/versions
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
apm install tool-bar git-plus flex-tool-bar atom-visual-studio-code-ui
cp utils/atom/toolbar.cson ~/.atom/toolbar.cson

# git
cp utils/git/.gitconfig.example ~/.gitconfig
touch ~/.gitignore
echo ".DS_Store" >> ~/.gitconfig
echo "node_modules/" >> ~/.gitconfig


# node
npm install -g http-server

# ruby
echo 'export PATH="$PATH:$HOME/.rvm/bin"' >> ~/.bash_profile
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
source ~/.bash_profile
curl -L https://get.rvm.io | bash -s stable --ruby
rvm get stable
rbenv install 2.4.4
rbenv global 2.4.4
rbenv rehash
gem update --system
gem install bundler
rbenv rehash

# python
pip install --upgrade setuptools
pip install --upgrade distribute
pip install --upgrade pip
pip install virtualenv



# SYSTEMS

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

# packet filter firewall (pf)
sudo cat <<EOT >> /etc/pf.conf
# limit ssh to vpn subnet
block in proto tcp from any to any port 22
pass in proto tcp from 10.8.0.0/8 to any port 22

# limit afp to vpn subnet
block in proto tcp from any to any port 548
pass in proto tcp from 10.8.0.0/8 to any port 548

# limit smb to vpn subnet
block in proto tcp from any to any port 139
pass in proto tcp from 10.8.0.0/8 to any port 139
block in proto tcp from any to any port 445
pass in proto tcp from 10.8.0.0/8 to any port 445

# limit vnc to vpn subnet
block in proto tcp from any to any port 5900
pass in proto tcp from 10.8.0.0/8 to any port 5900

EOT

sudo pfctl -f /etc/pf.conf
