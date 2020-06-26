sudo apt-get install ruby
sudo apt-get install -y ruby
sudo apt-get install -y wget
wget https://aws-codedeploy-us-east-2.s3.us-east-2.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
sudo service codedeploy-agent status
sudo add-apt-repository "deb http://archive.ubuntu.com/ubuntu $(lsb_release -sc) universe"
sudo apt-get update
sudo apt-get install -y gdebi
sudo apt install -y php-mbstring php-xml php-bcmath
sudo apt-get install -y nginx php php-fpm mysql-server
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/bin/composer
chmod +x /usr/bin/composer
