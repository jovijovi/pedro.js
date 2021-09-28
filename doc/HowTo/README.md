# How To Do Something?

## How to create an ECDSA certificate by [OpenSSL](https://github.com/openssl/openssl)

### Step 1. List curves and find you need

```shell
openssl ecparam -list_curves
```

### Step 2. Generate a private key for a curve

```shell
openssl ecparam -name secp256k1 -genkey -noout -out private-key.pem
```

### Step 3. Generate the corresponding public key

```shell
openssl ec -in private-key.pem -pubout -out public-key.pem
```

### Step 4. Create a self-signed certificate

```shell
openssl req -new -x509 -key private-key.pem -out cert.pem -days 360
```
