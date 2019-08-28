## uncomment for openframeworks
# export OF_ROOT="$HOME/ofx"

## Uncomment for Go
# export GOPATH="$HOME/_go"
# GOROOT="$HOME/_go"
# PATH="/usr/local/bin:$PATH"

if [ -f ~/.bashrc ]; then
    source ~/.bashrc
fi

## rbenv
[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm"
eval "$(rbenv init -)"

## pyenv
export PATH="$HOME/.pyenv:$PATH"
eval "$(pyenv init -)"

# nodenv
eval "$(nodenv init -)"

## node version manager
export NVM_DIR="$HOME/.nvm"
    . "/usr/local/opt/nvm/nvm.sh"

## updates PATH for the Google Cloud SDK.
if [ -f '/usr/local/bin/google-cloud-sdk/path.bash.inc' ]; then source '/usr/local/bin/google-cloud-sdk/path.bash.inc'; fi

## shell command completion for gcloud.
if [ -f '/usr/local/bin/google-cloud-sdk/completion.bash.inc' ]; then source '/usr/local/bin/google-cloud-sdk/completion.bash.inc'; fi
