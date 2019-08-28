# LOCAL VARS

# add here

# ----------------------------------------------------------------------------
#
# Environmentals
#
# ----------------------------------------------------------------------------

HISTFILESIZE=25000

# global color vars to make it easy to prettify
RED='\033[01;31m'
YEL='\033[01;33m'
GREEN='\033[01;32m'
BLUE='\033[01;34m'
PURP='\033[00;35m'
CY='\033[01;36m'
MAG='\033[01;35m'
WHITE='\033[00;01m'
NC='\033[00m' # No Color

# fixes for PS1 && PS2 -- prompts read color vars differently
REDF='\[\033[01;31m\]'
YELF='\[\033[01;33m\]'
GREENF='\[\033[01;32m\]'
BLUEF='\[\033[01;34m\]'
PURPF='\[\033[00;35m\]'
CYF='\[\033[01;36m\]'
MAGF='\[\033[01;35m\]'
WHITEF='\[\033[00;01m\]'
NCF='\[\033[00m\]'

# Change Prompt w/ Default Colors
# export PS1="______________________________________________________________________________\n| \w @ \h (\u) \n| => "
# export PS2="| => "

# Secure Prompt for Screenshots (Scrub PII)
lockdown () {
  export PS1="${GREENF}______________________________________________________________________________\n| \w ${WHITEF}@host${NCF} ${GREENF}(${NCF}${REDF}user${NCF}${GREENF}) \n| => ${NCF}"
  export PS2="${GREENF}| => ${NCF}"
}


# R/G
# export PS1="${GREENF}______________________________________________________________________________\n| \w ${REDF}@\h${NCF}${GREENF} (\u) \n| => ${NCF}"
# export PS2="${GREENF}| => ${NCF}"

# R/G/W
export PS1="${GREENF}______________________________________________________________________________\n| \w ${WHITEF}@\h${NCF} ${GREENF}(${NCF}${REDF}\u${NCF}${GREENF}) \n| => ${NCF}"
export PS2="${GREENF}| => ${NCF}"

# B/Y
#export PS1="${BLUEF}______________________________________________________________________________\n|${NCF} ${YELF}\w${NCF} ${WHITEF}@\h${NCF} ${BLUEF}(${NCF}${YELF}\u${NCF}${BLUEF}) \n| => ${NCF}"
#export PS2="${GREENF}| => ${NCF}"

# Cyan
# export PS1="${CYF}______________________________________________________________________________\n| \w @ \h (\u) \n| => ${NCF}"
# export PS2="${CYF}| => ${NCF}"

# Blue
# export PS1="${BLUEF}______________________________________________________________________________\n| \w @ \h (\u) \n| => ${NCF}"
# export PS2="${BLUEF}| => ${NCF}"

# Green
# export PS1="${GREENF}______________________________________________________________________________\n| \w @ \h (\u) \n| => ${NCF}"
# export PS2="${GREENF}| => ${NCF}"

# Yellow
# export PS1="${YELF}______________________________________________________________________________\n| \w @ \h (\u) \n| => ${NCF}"
# export PS2="${YELF}| => ${NCF}"

#   Set Default Editor (change 'Nano' to the editor of your choice)
export EDITOR=/usr/bin/nano

#   Set default blocksize for ls, df, du
export BLOCKSIZE=1k

#   Add color to terminal
#   export CLICOLOR=1
#   export LSCOLORS=ExFxBxDxCxegedabagacad











# Git
# ----------------------------------------------------------------------------

# Remove git from a project
alias ungit="find . -name '.git' -exec rm -rf {} \;"

# Clear cache
alias regit="git rm -r --cached ."

# Add
alias add="git add ."
alias commit="git commit -m"
alias push="git push origin master"
alias pull="git pull"

# Fetch and Force Overwrite
alias gitforcefetch="git fetch --all && git reset --hard origin/master"

# Set new remote origin
alias gitremote="git remote add origin"

# Add submodules
alias gitsub="git submodule add"
alias gitsubup="git submodule update --recursive --remote"

# Update All Repos in Current Directory
updaterepos () {
    # store the current dir
    CUR_DIR=$(pwd)
    echo "\n\033[1mPulling in latest changes for all repositories...\033[0m\n"
    # Find all git repositories and update it to the master latest revision
    for i in $(find . -name ".git" | cut -c 3-); do
        echo "";
        echo "\033[33m"+$i+"\033[0m";
        # We have to go to the .git parent directory to call the pull command
        cd "$i";
        cd ..;

        git pull origin master;

        cd $CUR_DIR
    done
    echo "\n\033[32mComplete!\033[0m\n"
}






#  Security
#  ----------------------------------------------------------------------------

# generate quick spook lorem for passwords. REQUIRES brew install lorem
# alias spook="lorem --spook --randomize"

# disable gamed
alias gamed="launchctl unload /System/Library/LaunchAgents/com.apple.gamed.plist"

# scrub exif data from an image
alias scrub="exiftool -all="
# list all metadata for file
alias metacheck="mdls"
alias metadeep="xattr"
alias metachange="SetFile"
alias datechanger="SetFile -d '8/4/2001 16:13'"

# change hostname
alias changeHostname="sudo scutil --set HostName"

# show and scramble mac addresses
maclist() {
    for x in `ifconfig | expand | cut -c1-8 | sort | uniq -u | awk -F: '{print $1;}'`; do echo -ne "${YEL}$x:${NC}" &&  macchanger -s $x; done
}

macscram(){
    for x in `ifconfig | expand | cut -c1-8 | sort | uniq -u | awk -F: '{print $1;}' | grep -Fvx -e lo0 -e bridge0 -e awdl0`; do macchanger -r $x; done
}

alias wifiscram="macchanger -r en0"
alias ethscram="macchanger -r eth0"

# IP infos
iplist(){
    for x in `ifconfig | awk '$1 == "inet" {print "'${YEL}'" $2 "'${NC}'" }' | sed 's/://g'`; do echo -e $x; done
}

alias ipcheck0='ipconfig getpacket en0'
alias ipcheck1='ipconfig getpacket en1'

# Port Info
alias portscan="sudo nmap -sV -Pn -p- -T4"
alias census="sudo nmap -F"
alias arpy="arp -a -n"
alias netcheck="sudo lsof -i"
portcheck () {
    netcheck | awk '$8 == "TCP" {
        print "'${YEL}'" $1 "'${NC}'","'${BLUE}'" $3 "'${NC}'" "'${YEL}'","'${NC}'"  "'${YEL}'" $9 "'${NC}'"
    }'
}
alias udpcheck="sudo /usr/sbin/lsof -nP | grep UDP"
alias tcpcheck="sudo /usr/sbin/lsof -nP | grep TCP"
alias socketcheck="sudo /usr/sbin/lsof -i -P"

# sniffers (requires brew install ngrep wireshark)
sniffssl () {
    sudo tshark -i en0 -i utun0 -i utun1 -Y "tcp.port == 443" -Tfields \
    -e frame.time \
    -e ip.dst \
    -e tcp.dstport \
    -Eseparator=/s
}
sniffweb () {
    sudo tshark -Y "http.request or http.response" -Tfields \
    -e ip.dst \
    -e http.request.full_uri \
    -e http.request.method \
    -e http.response.code \
    -e http.response.phrase \
    -Eseparator=/s
}
sniffdns () {
    sudo tshark -i en0 -i utun0 -i utun1 -Y "dns.flags.response == 1" -Tfields \
    -e frame.time_delta \
    -e dns.qry.name \
    -e dns.a \
    -Eseparator=,
}
 sniffcerts () {
    sudo tshark -i en0 -i utun0 -i utun1 -Y "ssl.handshake.certificate" -Tfields \
    -e ip.src \
    -e x509sat.uTF8String \
    -e x509sat.printableString \
    -e x509sat.universalString \
    -e x509sat.IA5String \
    -e x509sat.teletexString \
    -Eseparator=/s -Equote=d
}

# system auditing
alias daemoncheck="sudo launchctl list | grep -v com.apple && launchctl list | grep -v com.apple"
alias usercheck="dscl . list /Users"
alias userinfo="dscacheutil -q user"
userlist () {
    sudo ls -al /var/db/dslocal/nodes/Default/users | grep -v com.apple | awk '{ print "'${YEL}'" $3 "'${NC}'" "'${BLUE}'" $5 "'${NC}'" "'${YEL}'","'${NC}'"  "'${YEL}'" $9 "'${NC}'" }'
}
alias fwcheck="sudo pfctl -s rules"
alias fwinfo="sudo pfctl -s info"
alias hwcheck='networksetup -listallhardwareports'

# memory-specific
processcheck() {
    ps $@ -u $USER -o pid,%cpu,%mem,start,time,bsdtime,command
}
#   findPid: find out the pid of a specified process
findprocess () { lsof -t -c "$@" ; }
#   memHogsTop, memHogsPs:  Find memory hogs
alias memHogsTop='top -l 1 -o rsize | head -20'
alias memHogsPs='ps wwaxm -o pid,stat,vsize,rss,time,command | head -10'
#   cpuHogs:  Find CPU hogs
alias cpu_hogs='ps wwaxr -o pid,stat,%cpu,time,command | head -10'
#   topForever:  Continual 'top' listing (every 10 seconds)
alias topForever='top -l 9999999 -s 10 -o cpu'
#   ttop:  Recommended 'top' invocation to minimize resources
alias ttop="top -R -F -s 10 -o rsize"
#   Memory checker
alias topcpu='top -o cpu'
alias topmem='top -o rsize' # memory
alias topten="top -R -F -s 10 -o rsize"

# Get public IP from openDNS
alias watismyip="echo 'the internet sees you RIGHT NOW as:' && dig +short myip.opendns.com @resolver1.opendns.com"

# DNS Flush
alias flushDNS='dscacheutil -flushcache'            # flushDNS:     Flush out the DNS Cache
alias flush="sudo killall -HUP mDNSResponder && flushDNS"







# Dev
# ----------------------------------------------------------------------------

# math
= () {
    bc -l <<< "$@"
}

# stop all docker
alias dockerstopall='docker rm $(docker ps -aq)'
# rm all docker
alias dockerrmall='docker rm $(docker ps -aq)'

# Add gulp to autocompletion
#eval "$(gulp --completion=bash)"
# CD && ATOM && GULP
function atomicgulp(){
	read -e -p "Enter Project Directory: " inputpath
	cd "$inputpath" && atom . && gulp
}

# create a user and hashed password for nginx
function nginxauth () {
	read -e -p "Enter Username: " usern
    sudo sh -c "echo -n '"$usern":' >> /etc/nginx/.htpasswd"
    sudo sh -c "openssl passwd -apr1 >> /etc/nginx/.htpasswd"
    echo -e "Add '${YEL}auth_basic "Restricted";${NC}' to '${YEL}/etc/nginx/sites-available/*.conf${NC}'"
    echo -e "Add '${YEL}auth_basic_user_file /etc/nginx/.htpasswd;${NC}' to '${YEL}/etc/nginx/sites-available/*.conf${NC}'"
}

# generate a self-signed ssl cert
sslkeygen(){
	read -e -p "Enter Name of Cert to Generate: " certname
	echo "Generating '$certname'"
	openssl req -x509 -sha256 -newkey rsa:2048 -keyout $certname.key -out $certname.crt -days 1024 -nodes
}

# httpDebug:  Download a web page and show info on what took time
httpDebug () { /usr/bin/curl $@ -o /dev/null -w "dns: %{time_namelookup} connect: %{time_connect} pretransfer: %{time_pretransfer} starttransfer: %{time_starttransfer} total: %{time_total}\n" ; }

#httpTools
alias editHosts='sudo edit /etc/hosts'                  # editHosts:        Edit /etc/hosts file
alias herr='tail /var/log/httpd/error_log'              # herr:             Tails HTTP error logs
httpHeaders () { /usr/bin/curl -I -L $@ ; }             # httpHeaders:      Grabs headers from web page

#find all html files in directory
htmlhunter () {
        find . -iname '*.html' | while read line; do
                echo "Finding HTML and opening $line"
#               open "$line"
        done
}


# Markdown Viewer (`brew install mdv`)
alias markdown='mdv'





#   MAKE TERMINAL BETTER
#   -------------------------------------------------------------------

alias cp='cp -iv'                           # Preferred 'cp' implementation
alias mv='mv -iv'                           # Preferred 'mv' implementation
alias mkdir='mkdir -pv'                     # Preferred 'mkdir' implementation
alias ll='ls -FGlAhp'                       # Preferred 'ls' implementation
alias less='less -FSRXc'                    # Preferred 'less' implementation
cd() { builtin cd "$@"; ll; }               # Always list directory contents upon 'cd'
alias cd..='cd ../'                         # Go back 1 directory level (for fast typers)
alias ..='cd ../'                           # Go back 1 directory level
alias ...='cd ../../'                       # Go back 2 directory levels
alias .3='cd ../../../'                     # Go back 3 directory levels
alias .4='cd ../../../../'                  # Go back 4 directory levels
alias .5='cd ../../../../../'               # Go back 5 directory levels
alias .6='cd ../../../../../../'            # Go back 6 directory levels
alias edit='subl'                           # edit:         Opens any file in sublime editor
alias f='open -a Finder ./'                 # f:            Opens current directory in MacOS Finder
alias ~="cd ~"                              # ~:            Go Home
alias c='clear'                             # c:            Clear terminal display
alias which='type -all'                     # which:        Find executables
alias path='echo -e ${PATH//:/\\n}'         # path:         Echo all executable Paths
alias show_options='shopt'                  # Show_options: display bash options settings
alias fix_stty='stty sane'                  # fix_stty:     Restore terminal settings when screwed up
alias cic='set completion-ignore-case On'   # cic:          Make tab-completion case-insensitive
mcd () { mkdir -p "$1" && cd "$1"; }        # mcd:          Makes new Dir and jumps inside
trash () { command mv "$@" ~/.Trash ; }     # trash:        Moves a file to the MacOS trash
ql () { qlmanage -p "$*" >& /dev/null; }    # ql:           Opens any file in MacOS Quicklook Preview
alias pump='tee ~/Desktop/term_out.txt'     # DT:           Pipe content to file on MacOS Desktop

# list working directories of all bash prompts
pwdz () {
    ps -al | awk '$15 == "-bash" {
        print $2
    }' | xargs -n1 lsof -p | grep cwd | awk '$1 == "bash" {
        print "'${YEL}'" $9 "'${NC}'"
    }'
}
# change to a working directory of another bash prompt
cdd () {
    cwd_array=($(pwdz))

    select listopt in "${cwd_array[@]}"
    do
        [ -n "${listopt}" ] && break
    done
    echo "You selected: ${listopt}"
    cd `echo $listopt | sed "s,$(printf '\033')\\[[0-9;]*[a-zA-Z],,g"`

    cwd_array=()
}


#   lr:  Full Recursive Directory Listing
alias lr='ls -R | grep ":$" | sed -e '\''s/:$//'\'' -e '\''s/[^-][^\/]*\//--/g'\'' -e '\''s/^/   /'\'' -e '\''s/-/|/'\'' | less'

#   Search manpage given in agument '1' for term given in argument '2' (case insensitive)
#   Example: mans mplayer codec
mans () {
    man $1 | grep -iC2 --color=always $2 | less
}

#   cdf:  'Cd's to frontmost window of MacOS Finder
cdf () {
    currFolderPath=$( /usr/bin/osascript <<EOT
        tell application "Finder"
            try
        set currFolder to (folder of the front window as alias)
            on error
        set currFolder to (path to desktop folder as alias)
            end try
            POSIX path of currFolder
        end tell
EOT
    )
    echo "cd to \"$currFolderPath\""
    cd "$currFolderPath"
}

# clip working directory path
alias clipit='pwd|tr -d "\n"|pbcopy'

#clear terminal
alias clear="clear && printf '\e[3J'"

#   extract:  Extract most know archives with one command
extract () {
    if [ -f $1 ] ; then
      case $1 in
        *.tar.bz2)   tar xjf $1     ;;
        *.tar.gz)    tar xzf $1     ;;
        *.bz2)       bunzip2 $1     ;;
        *.rar)       unrar e $1     ;;
        *.gz)        gunzip $1      ;;
        *.tar)       tar xf $1      ;;
        *.tbz2)      tar xjf $1     ;;
        *.tgz)       tar xzf $1     ;;
        *.zip)       unzip $1       ;;
        *.Z)         uncompress $1  ;;
        *.7z)        7z x $1        ;;
        *)     echo "'$1' cannot be extracted via extract()" ;;
         esac
     else
         echo "'$1' is not a valid file"
     fi
}







#   SEARCHING
#   -------------------------------------------------------------------

alias quickfind="find . -iname "                 # qfind:    Quickly search for file
ff () { /usr/bin/find . -name "$@" ; }      # ff:       Find file under the current directory
ffs () { /usr/bin/find . -name "$@"'*' ; }  # ffs:      Find file whose name starts with a given string
ffe () { /usr/bin/find . -name '*'"$@" ; }  # ffe:      Find file whose name ends with a given string

# bash alias search
function getalias(){
	read -e -p "Enter Phrase: " inputpath
	grep -r  "$inputpath" ~/.bashrc
}







#   OSX SPECIFICS
#   -------------------------------------------------------------------

# mute the system volume
alias stfu="osascript -e 'set volume output muted true' && echo 'muted!'"

# Remaining Battery Time (OS X)
# alias battTime="pmset -g batt | egrep "([0-9]+\%).*" -o --colour=auto | cut -f3 -d';'"

# Remaining Battery Percent (OS X)
# alias battPercentage="pmset -g batt | egrep "([0-9]+\%).*" -o --colour=auto | cut -f1 -d';'"

#   spotlight: Search for a file using MacOS Spotlight's metadata
spotlight () { mdfind "kMDItemDisplayName == '$@'wc"; }

# easy quit app
function quitter(){
 # echo "Enter App Name: "
	read -e -p "Enter Application Name: " inputpath
	osascript -e 'quit app "'$inputpath'"'
}

# easy show invisible files
alias showFiles='defaults write com.apple.finder AppleShowAllFiles YES; killall Finder /System/Library/CoreServices/Finder.app'
alias hideFiles='defaults write com.apple.finder AppleShowAllFiles NO; killall Finder /System/Library/CoreServices/Finder.app'

alias cleanupDS="find . -type f -name '*.DS_Store' -ls -delete"

#   cleanupLS:  Clean up LaunchServices to remove duplicates in the "Open With" menu
alias cleanupLS="/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister -kill -r -domain local -domain system -domain user && killall Finder"

#    screensaverDesktop: Run a screensaver on the Desktop
alias screensaverDesktop='/System/Library/Frameworks/ScreenSaver.framework/Resources/ScreenSaverEngine.app/Contents/MacOS/ScreenSaverEngine -background'

# call the information function whenever a new terminal window is opened
#   ii:  display useful host related informaton
ii() {
    HOST=$(hostname)
    USER=$(id -un)
    echo -e "\n${RED}Internals:${NC} " ; uname -a
    echo -e "\n${YEL}$USER${NC} logged on to ${YEL}$HOST${NC}"
    echo -e "\n${RED}Users logged on:$NC " ; w -h
    echo -e "\n${RED}Machine stats:$NC " ; uptime
    echo -e "\n${RED}Current date:$NC " ; date | awk -F: '{print "'${YEL}'" $1 $2 $3 "'${NC}'";}'
    echo -e "\n${RED}Current Working Dirs:$NC " ; pwdz
    # echo -e "\n${RED}Current network location :$NC " ; scselect
    echo -e "\n${RED}IP Addresses:$NC " ; iplist
    #echo -e "\n${RED}DNS Configuration:$NC " ; scutil --dns
    echo
}


ii
