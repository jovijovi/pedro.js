import {security} from '../../lib/common';

const _mockPassword = "secret";
const _mockSalt = "salt";
const _mockKey = "3745e482c6e0ade35da10139e797157f4a5da669dad7d5da88ef87e47471cc47ed941c7ad618e827304f083f8707f12b7cfdd5f489b782f10cc269e3c08d59ae";

test('EncryptPassword', async () => {
	const key = (await security.crypto.pbkdf2.EncryptPassword({
		digest: "sha512",
		keyLen: 64,
		iterations: 100000,
		password: _mockPassword,
		salt: _mockSalt,
	})).toString('hex');
	console.log("Key=", key);
	expect(key).toMatch(_mockKey);
})

test('VerifyPassword', async () => {
	const key = await security.crypto.pbkdf2.EncryptPassword({
		digest: "sha512",
		keyLen: 64,
		iterations: 1000,
		password: _mockPassword,
		salt: _mockSalt,
	});
	console.log("Key=", key.toString('hex'));

	// Verify in buffer
	const result1 = await security.crypto.pbkdf2.VerifyPassword({
		digest: "sha512",
		keyLen: 64,
		iterations: 1000,
		password: _mockPassword,
		salt: _mockSalt,
		cipherText: key,
	});
	console.log("Verify Result 1=", result1);
	expect(result1).toBeTruthy();

	// Verify in hex string
	const result2 = await security.crypto.pbkdf2.VerifyPassword({
		digest: "sha512",
		keyLen: 64,
		iterations: 1000,
		password: _mockPassword,
		salt: _mockSalt,
		cipherText: key.toString('hex'),
	});
	console.log("Verify Result 2=", result2);
	expect(result2).toBeTruthy();
})

test('EncryptPassword with random salt', async () => {
	// Encrypt password with new salt (64bytes by default)
	console.log("Key(%d)=", 1, (await security.crypto.pbkdf2.EncryptPassword({
		digest: "sha512",
		keyLen: 64,
		iterations: 100000,
		password: _mockPassword,
		salt: security.crypto.salt.NewSalt(),
	})).toString('hex'));

	// Encrypt password with new salt (64bytes)
	console.log("Key(%d)=", 2, (await security.crypto.pbkdf2.EncryptPassword({
		digest: "sha512",
		keyLen: 64,
		iterations: 100000,
		password: _mockPassword,
		salt: security.crypto.salt.NewSalt(64),
	})).toString('hex'));

	// Encrypt password with new salt (32bytes)
	console.log("Key(%d)=", 3, (await security.crypto.pbkdf2.EncryptPassword({
		digest: "sha512",
		keyLen: 64,
		iterations: 100000,
		password: _mockPassword,
		salt: security.crypto.salt.NewSalt(32),
	})).toString('hex'));

	// Encrypt password with new salt (16bytes)
	console.log("Key(%d)=", 4, (await security.crypto.pbkdf2.EncryptPassword({
		digest: "sha512",
		keyLen: 64,
		iterations: 100000,
		password: _mockPassword,
		salt: security.crypto.salt.NewSalt(16),
	})).toString('hex'));

	// Encrypt password with new salt (16bytes) & default iterations & default digest
	console.log("Key(%d)=", 5, (await security.crypto.pbkdf2.EncryptPassword({
		keyLen: 64,
		password: _mockPassword,
		salt: security.crypto.salt.NewSalt(16),
	})).toString('hex'));

	// Encrypt password with iterations 42, and it'll occur an error
	try {
		console.log("Key(%d)=", 6, (await security.crypto.pbkdf2.EncryptPassword({
			digest: "sha512",
			keyLen: 64,
			iterations: 42,
			password: _mockPassword,
			salt: security.crypto.salt.NewSalt(16),
		})).toString('hex'));
	} catch (e) {
		// When iterations < 1000, will occur an error
		console.log(e)
	}

	// Encrypt password with new salt (8bytes), and it'll occurs an error
	try {
		console.log("Key(%d)=", 7, (await security.crypto.pbkdf2.EncryptPassword({
			digest: "sha512",
			keyLen: 64,
			iterations: 100000,
			password: _mockPassword,
			salt: security.crypto.salt.NewSalt(8),
		})).toString('hex'));
	} catch (e) {
		// When salt size < 16, will occur an error
		console.log(e)
	}
})
