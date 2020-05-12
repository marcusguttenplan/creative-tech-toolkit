# Installation on Ubuntu

### Add User
echo "Creating new primary user"
echo "---------------------------------------------------------------"
USER=worker
if [ $(id -u) -eq 0 ]; then
  # read -p "Enter username of who can connect via SSH: " USER
  read -s -p "Enter password of user who can connect via SSH: " PASSWORD
  egrep "^$USER" /etc/passwd >/dev/null
  if [ $? -eq 0 ]; then
    echo "$USER exists!"
    exit 1
  else
    pass=$(perl -e 'print crypt($ARGV[0], "password")' $PASSWORD)
    useradd -s /bin/bash -m -d /home/$USER -U -p $pass $USER
    [ $? -eq 0 ] && echo "$USER has been added to system!" || echo "Failed to add a $USER!"
  fi
else
  echo "Only root may add a user to the system"
  exit 2
fi

echo "Adding $USER to sudoers"
echo "---------------------------------------------------------------"

cp /etc/sudoers /etc/sudoers.tmp
chmod 0640 /etc/sudoers.tmp
echo "$USER    ALL=(ALL) ALL" >> /etc/sudoers.tmp
chmod 0440 /etc/sudoers.tmp
mv /etc/sudoers.tmp /etc/sudoers


### Docker
echo "Installing Docker"
echo "---------------------------------------------------------------"

sudo apt update -y
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update -y
apt-cache policy docker-ce
sudo apt install -y docker-ce
sudo usermod -aG docker ${USER}
su - ${USER}
sudo usermod -aG docker worker

### Docker Compose

sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

docker network create nginx-proxy
