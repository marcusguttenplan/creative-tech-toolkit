# Mailgun Automated Setup

Easily create email addresses for new domains with Mailgun via the API

GET list of domains
```
curl --user '<api-key>' https://api.mailgun.net/v3/domains
```

POST new domains
```
# POST
curl --user 'api:key-dbf0cc746bc1248d53273474dd406e67' https://api.mailgun.net/v3/domains
```

```
{
  name: domainname.com
  smtp_password: <password>
}
```

Results:
```
{
  "domain": {
    "name": "example.com",
    "created_at": "Fri, 22 Nov 2013 18:42:33 GMT",
    "wildcard": false,
    "spam_action": "disabled",
    "smtp_login": "postmaster@example.com",
    "smtp_password": "thiswontwork",
    "state": "active"
  },
  "receiving_dns_records": [
    {
      "priority": "10",
      "record_type": "MX",
      "valid": "valid",
      "value": "mxa.mailgun.org"
    },
    {
      "priority": "10",
      "record_type": "MX",
      "valid": "valid",
      "value": "mxb.mailgun.org"
    }
  ],
  "message": "Domain has been created",
  "sending_dns_records": [
    {
      "record_type": "TXT",
      "valid": "valid",
      "name": "example.com",
      "value": "v=spf1 include:mailgun.org ~all"
    },
    {
      "record_type": "TXT",
      "valid": "valid",
      "name": "k1._domainkey.example.com",
      "value": "k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4G...."
    },
    {
      "record_type": "CNAME",
      "valid": "valid",
      "name": "email.example.com",
      "value": "mailgun.org"
    }
  ]
}
```

POST New Credentials:
``
# POST
curl --user 'api:key-dbf0cc746bc1248d53273474dd406e67' https://api.mailgun.net/v3/domains/<domain>/credentials`
``

```
{
  login: <email address>,
  password: <password>
}
```

Digital Ocean get IP:
```
curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer b7d03a6947b217efb6f3ec3bd3504582" "https://api.digitalocean.com/v2/droplets?page=1&per_page=1" 
```

Digital Ocean create new domain:
```
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer b7d03a6947b217efb6f3ec3bd3504582" -d '{"name":"example.com","ip_address":"1.2.3.4"}' "https://api.digitalocean.com/v2/domains"
```

Digital Ocean create new records:

```
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer b7d03a6947b217efb6f3ec3bd3504582" -d '{"type":"TXT","name":"key: jsdiushdiuhediuwhed","data":"1.2.3.4","priority":null,"port":null,"ttl":1800,"weight":null,"flags":null,"tag":null}' "https://api.digitalocean.com/v2/domains/example.com/records"
```

```
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer b7d03a6947b217efb6f3ec3bd3504582" -d '{"type":"CNAME","name":"email.trillionsoftre.es","data":"162.10.66.0","priority":null,"port":null,"ttl":1800,"weight":null,"flags":null,"tag":null}' "https://api.digitalocean.com/v2/domains/example.com/records"
```


