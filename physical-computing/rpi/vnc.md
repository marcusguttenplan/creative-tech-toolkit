# Raspberry Pi VNC Setup

* `sudo raspi-config` > Interface Options > VNC
* `vncpasswd -print` > create password > copy `Password=<hash>`
* `sudo vim /etc/vnc/config.d/common.custom` and add block from below


```sh
Encryption=PreferOn
Authentication=VncAuth
Password=<hash i.e. 40cca9718ffb8e91d55cf290c3db86d5>
```

* `sudo systemctl restart vncserver-x11-serviced`
