* https://console.cloud.google.com/security/iap
* Configure Consent
* On the OAuth Consent Screen tab of the Credentials page, complete the following fields:
    * In the Application name field, enter IAP Example.
    * In the Support email field, enter your email address.
    * In the Authorized domain field, enter the hostname portion of the app's URL, for example, iap-example-999999.uc.r.appspot.com. Press the Enter key after entering the hostname in the field.
    * In the Application homepage link field, enter the URL for your app, for example, https://iap-example-999999.uc.r.appspot.com/.
    * In the Application privacy policy line field, use the same URL as the homepage link for testing purposes.
* Click Save. When prompted to create credentials, you can close the window.


* https://console.cloud.google.com/security/iap
* Select the checkbox for the App Engine app, and then click Add Member.
* Enter allAuthenticatedUsers, and then select the Cloud IAP/IAP-Secured Web App User role.
* Click Save.

Now any user that Google can authenticate can access the app. If you want, you can restrict access further by only adding one or more people or groups as members:
* Any Gmail or G Suite email address
* A Google Group email address
* A G Suite domain name
