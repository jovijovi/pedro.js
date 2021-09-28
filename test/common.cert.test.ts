import * as cert from "../lib/common/cert";

const ecdsaCert = `
-----BEGIN CERTIFICATE-----
MIIB4DCCAYagAwIBAgIUfQHOQgzmUnwpNGau9E0qwHHM1l4wCgYIKoZIzj0EAwIw
RzELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAk5ZMQswCQYDVQQHDAJOWTEOMAwGA1UE
CgwFUGVkcm8xDjAMBgNVBAMMBVBlZHJvMB4XDTIxMDkyODA3MDEwNVoXDTIyMDky
MzA3MDEwNVowRzELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAk5ZMQswCQYDVQQHDAJO
WTEOMAwGA1UECgwFUGVkcm8xDjAMBgNVBAMMBVBlZHJvMFYwEAYHKoZIzj0CAQYF
K4EEAAoDQgAEmS8gkAL6lgQ1PRjzI3Z2anmWujt9jkNUemelKi38E3OqSZMu4u4T
4MMLs3PlOWUEDmHx7snpN+1qcsXld2J+dqNTMFEwHQYDVR0OBBYEFKb3ToVNpz67
3JmIxVVb6SZX/at+MB8GA1UdIwQYMBaAFKb3ToVNpz673JmIxVVb6SZX/at+MA8G
A1UdEwEB/wQFMAMBAf8wCgYIKoZIzj0EAwIDSAAwRQIhAJeqZSBW0Jq31f1IZ15P
8NCVBWIsFLAxKaIKImi8tJr0AiA8o18pK9SLtQ+Ekps/2fsLiSI3CA7cPMKCKfXw
8AtNWQ==
-----END CERTIFICATE-----
`

test('LoadPublicKey', () => {
	const publicKey = cert.LoadPublicKey(ecdsaCert);
	console.log("PublicKey=%o", publicKey);
})
