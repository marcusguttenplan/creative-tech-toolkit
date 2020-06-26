sudo add-apt-repository ppa:certbot/certbot
sudo apt install python-certbot-apache && sudo apt install python-certbot-nginx
echo "Enter domain:"
read DOMAIN
sudo certbot --nginx -d $DOMAIN


