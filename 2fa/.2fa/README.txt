To add another service:

1. Get the TOTP secret
2. Create a new service directory: mkdir ~/.2fa/twitter.com/
3. Make a new .key file: echo -n 'your-twitter-totp-secret-key' > ~/.2fa/twitter.com/.key
4. Generate a new PGP encrypted file for security and privacy reasons:
    ~/.2fa/encrypt.key.sh twitter.com
5. Decrypts the totp secret and generates the 6-digit 2FA code when you need to log in into Twitter:
    ~/.2fa/decrypt.key.sh twitter.com
