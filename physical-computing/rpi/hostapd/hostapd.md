# Raspberry Pi Setup for HostAPD

**Initial Setup:**

* Download and install Raspian
* Find IP of Raspi on network (`nmap -sP -vv -T5 x.x.x.x/24`)


### Installation

Install dependencies:
```sh
sudo apt-get update     # Update Package List
sudo apt-get install hostapd dnsmasq bridge-utils    # Install
touch ~/hostapd-test.conf   # Create test config
```



Edit `/etc/dhcpcd.conf`:
```sh
# DHCP config
# interface wlan0
# static ip_address=192.168.10.10/24
# denyinterfaces eth0
denyinterfaces wlan0
```



Copy and Edit `/etc/dnsmasq.conf`:
```sh
interface=wlan0
dhcp-range=192.168.10.11,192.168.10.30,255.255.255.0,24h
```


Create test hostapd conf `/etc/hostapd/hostapd.conf`:
```sh
# Test HostAPD Config /etc/hostapd/hostapd.conf
interface=wlan0
# bridge=br0
hw_mode=g
channel=7
wmm_enabled=0
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=2
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP
ssid=pifi
wpa_passphrase=f00b4r
```




Add conf to `/etc/default/hostapd`:
```sh
DAEMON_CONF="/etc/hostapd/hostapd.conf"
```



Set up Traffic forwarding at `/etc/sysctl.conf`:
```sh
net.ipv4.ip_forward=1   # Uncomment this line
```
Add and save new iptables rule
```
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
sudo sh -c "iptables-save > /etc/iptables.ipv4.nat"
```

Edit `/etc/rc.local` to load updated iptables rules at boot:
```sh
iptables-restore < /etc/iptables.ipv4.nat
```



Create bridge interface to pass wifi connection through to ethernet:
```
sudo brctl addbr br0
sudo brctl addif br0 eth0
```

Edit `/etc/network/interfaces`:
```sh
auto br0
iface br0 inet manual
bridge_ports eth0 wlan0
```

```sh
sudo reboot
```





### Round II !!

`/etc/network/interfaces`:
```
allow-hotplug wlan0
iface wlan0 inet static
address 10.0.0.1
netmask 255.255.255.0
wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
```

`/etc/dnsmasq.conf`:
```
domain-needed
bogus-priv
interface=wlan0
listen-address=10.0.0.1
dhcp-range=10.0.0.2,10.0.0.254,12h
dhcp-option=option:router,10.0.0.1
dhcp-authoritative
```


``` sh
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
sudo iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT
sudo iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT
sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"
# sudo apt-get install iptables-persistent
iptables-restore < /etc/iptables.ipv4.nat
```


`/etc/sysctl.conf`:
```
net.ipv4.ip_forward=1
```



### Round III

##### Config Commands

* `service hostapd [start, stop, status]`

##### Setup

```sh
sudo apt-get install hostapd
```

```sh
# /etc/hostapd/hostapd.conf

interface=wlan0
driver=nl80211
ssid=PIFI
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
```

```sh
# /etc/default/hostapd

# DAEMON_CONF="/etc/hostapd/hostapd.conf"   # UNCOMMENT THIS FILE AND ADD HOSTAPD CONF
```


```sh
sudo apt-get install isc-dhcp-server
```


```sh
# /etc/default/isc-dhcp-server

INTERFACES="wlan0"
```

```sh
# /etc/dhcp/dhcpd.conf

# Comment out following lines:
# option definitions common to all supported networks…
#option domain-name “example.org”;
#option domain-name-servers ns1.example.org, ns2.example.org;
#default-lease-time 600;
#max-lease-time 7200;

# Add following lines:
subnet 10.10.0.0 netmask 255.255.255.0 {
        range 10.10.0.2 10.10.0.16;
        option domain-name-servers 8.8.4.4, 208.67.222.222;
        option routers 10.10.0.1;
}
```


```sh
# /etc/dhcpcd.conf

denyinterfaces wlan0
```

```sh
# /etc/network/interfaces

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
auto eth0
iface eth0 inet dhcp

# WLAN
auto wlan0
iface wlan0 inet static
address 10.10.0.1
netmask 255.255.255.0
```


```sh
sudo service dhcpcd restart
sudo ifdown wlan0
sudo ifup wlan0
sudo service isc-dhcp-server start
sudo service hostapd start
```

```sh
sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"
```

```sh
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
sudo iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT
sudo iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT
```


```sh
# /etc/rc.local

(sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
sudo iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT
sudo iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT)
exit 0
```




#### UPDATES (1/22/2019)

```
# /etc/default/isc-dhcp-server

INTERFACESv4="wlan0"
INTERFACESv6=""
#INTERFACES="wlan0"
```

```
sudo rm /var/run/dhcpd.pid
```

```
# /etc/dhcp/dhcpd.conf

subnet 10.10.0.0 netmask 255.255.255.0 {
        range 10.10.0.2 10.10.0.16;
        option domain-name-servers 8.8.4.4, 208.67.222.222;
        option routers 10.10.0.1;
}

denyinterfaces wlan0
```
