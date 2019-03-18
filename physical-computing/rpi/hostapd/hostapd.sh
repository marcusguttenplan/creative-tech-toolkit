#!/bin/bash

# HOSTNAME=pi
SYSTEMIP=0.0.0.0
SSHPORT=22
USER=worker
PUBLICKEY="ssh-rsa . . . foo@bar.com"




echo
echo "System updates and basic setup"
echo "==============================================================="
echo
echo
echo
echo
echo
echo
echo
echo
echo
echo
echo
echo
echo
echo
echo
echo "First things first, let's make sure we have the latest updates."
echo "---------------------------------------------------------------"


# *) Install required packages
# ------------------------------------------------------------------ #
apt-get update
apt-get upgrade
apt-get install -y --force-yes curl git libpq-dev build-essential libcurl4-openssl-dev zlib1g-dev hostapd dnsmasq




# *) Configure machine hostname
# ------------------------------------------------------------------ #


echo
echo "Setting the hostname."
# http://library.linode.com/getting-started
echo "---------------------------------------------------------------"
echo
echo

# echo "$HOSTNAME" > /etc/hostname
# hostname -F /etc/hostname

echo
echo
echo
echo "Updating /etc/hosts."
echo "---------------------------------------------------------------"

mv /etc/hosts /etc/hosts.bak

echo "
127.0.0.1       localhost
127.0.0.1       raspberrypi
::1     ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
ff02::3 ip6-allhosts
" >> /etc/hosts

echo
echo
echo
echo "Setting the proper timezone."
echo "---------------------------------------------------------------"

dpkg-reconfigure tzdata

echo
echo
echo
echo "Synchronize the system clock with an NTP server"
echo "---------------------------------------------------------------"

apt-get install -y ntp
echo
echo
echo


# # *) ADD A USER
# # ------------------------------------------------------------------ #
#
#
# echo
# echo
# echo
# echo "Creating new primary user"
# echo "---------------------------------------------------------------"
#
# if [ $(id -u) -eq 0 ]; then
#   # read -p "Enter username of who can connect via SSH: " USER
#   read -s -p "Enter password of user who can connect via SSH: " PASSWORD
#   egrep "^$USER" /etc/passwd >/dev/null
#   if [ $? -eq 0 ]; then
#     echo "$USER exists!"
#     exit 1
#   else
#     pass=$(perl -e 'print crypt($ARGV[0], "password")' $PASSWORD)
#     useradd -s /bin/bash -m -d /home/$USER -U -p $pass $USER
#     [ $? -eq 0 ] && echo "$USER has been added to system!" || echo "Failed to add a $USER!"
#   fi
# else
#   echo "Only root may add a user to the system"
#   exit 2
# fi
#
# echo
# echo
# echo
# echo "Adding $USER to sudoers"
# echo "---------------------------------------------------------------"
#
# cp /etc/sudoers /etc/sudoers.tmp
# chmod 0640 /etc/sudoers.tmp
# echo "$USER    ALL=(ALL) ALL" >> /etc/sudoers.tmp
# chmod 0440 /etc/sudoers.tmp
# mv /etc/sudoers.tmp /etc/sudoers




# *) Manage SSH Keys before updating SSH config
# ------------------------------------------------------------------ #

echo
echo
echo
echo "Adding ssh key"
echo "---------------------------------------------------------------"

# Add Key for New User
mkdir /home/$USER/.ssh
touch /home/$USER/.ssh/authorized_keys
echo $PUBLICKEY >> /home/$USER/.ssh/authorized_keys
chown -R $USER:$USER /home/$USER/.ssh
chmod 700 /home/$USER/.ssh
chmod 600 /home/$USER/.ssh/authorized_keys

# Add Key for Default User
mkdir /home/pi/.ssh
touch /home/pi/.ssh/authorized_keys
echo $PUBLICKEY >> /home/pi/.ssh/authorized_keys
chown -R pi:pi /home/pi/.ssh
chmod 700 /home/pi/.ssh
chmod 600 /home/pi/.ssh/authorized_keys


# *) Update and Harden SSH
# ------------------------------------------------------------------ #


echo
echo
echo
echo "Change SSH port"
echo "---------------------------------------------------------------"

sed -i "s/Port 22/Port $SSHPORT/g" /etc/ssh/sshd_config

echo
echo
echo
echo "Instruct sshd to listen only on a specific IP address."
echo "---------------------------------------------------------------"
echo

sed -i "s/#ListenAddress 0.0.0.0/ListenAddress $SYSTEMIP/g" /etc/ssh/sshd_config

echo
echo
echo
echo "Ensure that sshd starts after eth0 is up, not just after filesystem"
# http://blog.roberthallam.org/2010/06/sshd-not-running-at-startup/
echo "---------------------------------------------------------------"

sed -i "s/start on filesystem/start on filesystem and net-device-up IFACE=eth0/g" /etc/init/ssh.conf

echo
echo
echo
echo
echo "Disabling root ssh login"
echo "---------------------------------------------------------------"

sed -i "s/PermitRootLogin yes/PermitRootLogin no/g" /etc/ssh/sshd_config

echo
echo
echo
echo "Disabling password authentication"
echo "---------------------------------------------------------------"

sed -i "s/#PasswordAuthentication yes/PasswordAuthentication no/g" /etc/ssh/sshd_config

echo
echo
echo
echo "Disabling X11 forwarding"
echo "---------------------------------------------------------------"

sed -i "s/X11Forwarding yes/X11Forwarding no/g" /etc/ssh/sshd_config

echo
echo
echo
echo "Disabling sshd DNS resolution"
echo "---------------------------------------------------------------"

echo "UseDNS no" >> /etc/ssh/sshd_config

echo
echo
echo
echo "Adding users to allowusers"
echo "---------------------------------------------------------------"

echo "AllowUsers pi" >> /etc/ssh/sshd_config

sed -i "s/#AuthorizedKeysFile/AuthorizedKeysFile /g" /etc/ssh/sshd_config

/etc/init.d/ssh restart




# *) HostAPD Setup
# ------------------------------------------------------------------ #

# hostapd configuration
echo "Setting up hostapd conf"
echo '
interface=wlan0
driver=nl80211
ssid=PIFI2
hw_mode=g
channel=1
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=3
wpa_passphrase=foobarbat
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP
' >> /etc/hostapd/hostapd.conf


# hostapd daemon setup
echo "Configuring hostapd daemon"
echo '
DAEMON_CONF="/etc/hostapd/hostapd.conf"
' >> /etc/default/hostapd

# # setup dhcp server
# echo "updating dhcp server"
# echo '
# INTERFACES="wlan0"
# ' >> /etc/default/isc-dhcp-server

# configure dhcp
echo "configuring dhcp server"
echo '
subnet 10.10.0.0 netmask 255.255.255.0 {
        range 10.10.0.2 10.10.0.16;
        option domain-name-servers 8.8.4.4, 208.67.222.222;
        option routers 10.10.0.1;
}
'  >> /etc/dhcp/dhcp.conf

# comment out default dhcp settings
sed -i '/option domain-name "example.org";/s/^/#/g' /etc/dhcp/dhcp.conf
sed -i '/option domain-name-servers ns1.example.org, ns2.example.org;/s/^/#/g' /etc/dhcp/dhcp.conf
sed -i '/default-lease-time 600;/s/^/#/g' /etc/dhcp/dhcp.conf
sed -i '/max-lease-time 7200;/s/^/#/g' /etc/dhcp/dhcp.conf

# update dhcp daemon
echo '
# DHCP config
interface wlan0
static ip_address=10.10.0.1/24
denyinterfaces eth0
denyinterfaces wlan0
' >> /etc/dhcpcd.conf

# #update /network/interfaces
# echo '
# # Loopback
# auto lo
# iface lo inet loopback
#
# # Primary Network Interface (Ethernet)
# auto eth0
# iface eth0 inet dhcp
#
# # WLAN settigns
# auto wlan0
# iface wlan0 inet static
# address 10.10.0.1
# netmask 255.255.255.0
# ' >> /etc/network/interfaces


# DNSMASQ config
echo '
domain-needed
bogus-priv
interface=wlan0
listen-address=10.10.0.1
dhcp-range=10.10.0.2,10.10.0.254,12h
dhcp-option=option:router,10.10.0.1
dhcp-authoritative
' >> /etc/dnsmasq.conf


# Restart Serves
echo "Restarting hostapd, wlan, dhcp"
service dhcpcd restart
ifdown wlan0
ifup wlan0
# service isc-dhcp-server start
service dnsmasq start
service hostapd start




# *) IPTables
# ------------------------------------------------------------------ #

echo
echo
echo
echo "Setting up basic(!) rules for IPTables. Modify as needed, with care :)"
# http://www.thegeekstuff.com/scripts/iptables-rules
# http://wiki.centos.org/HowTos/Network/IPTables
# https://help.ubuntu.com/community/IptablesHowTo
echo "---------------------------------------------------------------"
#
# Flush old rules
iptables -F


sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"

# Allow SSH connections on tcp port $SSHPORT
# This is essential when working on remote servers via SSH to prevent locking yourself out of the system
#
# iptables -A INPUT -p tcp --dport $SSHPORT -j ACCEPT



# Set default chain policies
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Accept packets belonging to established and related connections
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow loopback access
iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT

# Ping from inside to outside
iptables -A OUTPUT -p icmp --icmp-type echo-request -j ACCEPT
iptables -A INPUT -p icmp --icmp-type echo-reply -j ACCEPT

# Allow packets from internal network to reach external network.
# if eth1 is external, eth0 is internal
# iptables -A FORWARD -i eth0 -o eth1 -j ACCEPT


# HostAPD Settings
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT

# Help prevent DoS attack
iptables -A INPUT -p tcp --dport 80 -m limit --limit 25/minute --limit-burst 100 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -m limit --limit 25/minute --limit-burst 100 -j ACCEPT

# Make sure DNS doesn;t ever get locked out
# iptables -A INPUT -p udp --dport 53 -s 8.8.8.8 -j ACCEPT
# iptables -A INPUT -p tcp --dport 53 -s 8.8.8.8 -j ACCEPT
# iptables -A INPUT -p tcp --dport 53 -s 8.8.4.4 -j ACCEPT
# iptables -A INPUT -p udp --dport 53 -s 8.8.4.4 -j ACCEPT

# Log dropped packets
iptables -N LOGGING
iptables -A INPUT -j LOGGING
iptables -I INPUT -m limit --limit 5/min -j LOG --log-prefix "Iptables Dropped Packet: " --log-level 7
iptables -A LOGGING -j DROP

#
/etc/init.d/networking restart
#
echo
echo
echo
echo "Establish IPTables logging, and rotation of logs"
# http://ubuntuforums.org/showthread.php?t=668148
# https://wiki.ubuntu.com/LucidLynx/ReleaseNotes#line-178
echo "---------------------------------------------------------------"
#
echo "#IPTables logging
kern.debug;kern.info /var/log/firewall.log
" > /etc/rsyslog.d/firewall.conf
#
/etc/init.d/rsyslog restart
#
mkdir /var/log/old/
#
echo "/var/log/firewall.log {
    weekly
    missingok
    rotate 13
    compress
    delaycompress
    notifempty
    create 640 syslog adm
    olddir /var/log/old/
}
" > /etc/logrotate.d/firewall
#
echo
echo
echo
echo "Adding a bit of color and formatting to the command prompt"
# http://ubuntuforums.org/showthread.php?t=810590
echo "---------------------------------------------------------------"
#
echo '
export PS1="${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ "
' >> /home/$USER/.bashrc
source /home/$USER/.bashrc

echo '
export PS1="${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ "
' >> /home/pi/.bashrc
source /home/pi/.bashrc



# HostAPD Save iptables
echo '
(sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
sudo iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT
sudo iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT)
exit 0
' >> /etc/rc.local


# *) Server Security and Hardening
# ------------------------------------------------------------------ #


# ec`9`



# *) ALMOST THERE!!!!!
# ------------------------------------------------------------------ #


echo
echo
echo
echo "One final hurrah"
echo "--------------------------------------------------------------"
echo

apt-get update
apt-get upgrade
apt-get install iptables-persistent
iptables-save > iptables-persistent

echo
echo
echo
echo
echo
echo
echo
echo
echo
echo
echo
echo
echo
echo
echo
echo
echo "==============================================================="
echo
echo "All done!"
echo
echo "If you are confident that all went well, reboot this puppy and play."
echo
echo "If not, now is your (last?) chance to fix things."
echo
echo "==============================================================="
