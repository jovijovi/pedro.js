import {
	CreateBucketCommand,
	DeleteBucketCommand,
	DeleteObjectCommand,
	GetObjectCommand,
	ListBucketsCommand,
	ListObjectsV2Command,
	PutObjectCommand
} from '@aws-sdk/client-s3';
import fs from 'fs';
import {S3} from '../lib/modules/s3';
import {StreamToString} from '../lib/common/util/converter';
import {GetString} from '../lib/common/security/crypto/digest';

const _mockS3Config = {
	accessKey: "minio",
	secretKey: "minio123",
	endpoint: "http://localhost:9000",
	region: "local",
	forcePathStyle: true,
};

const _mockBucketName = "bucket-pedro-js";
const _mockBucketLocation = "/bucket-pedro-js";
const _mockObjKey1 = "sample.svg";
const _mockObjDigest = "405149dd5d825799f350d315efb0db161cb93e8e0b4bc6a4cc9b93f8c414f3b5";  // SHA256 of sample.svg

test('Create Bucket', async () => {
	// Connect
	const engine = await S3.Connect(_mockS3Config);

	// Check
	expect(engine).not.toBeNull();
	expect(engine).not.toBeUndefined();

	// Bucket name
	// Bucket naming rules: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html
	const params = {Bucket: _mockBucketName};

	// List bucket
	const buckets = await engine.send(new ListBucketsCommand({}));
	for (let bucket of buckets.Buckets) {
		if (bucket.Name == params.Bucket) {
			console.log("Bucket(%s) already exist", bucket.Name);
			return;
		}
	}

	// Create bucket
	const data = await engine.send(new CreateBucketCommand(params));
	console.log("Bucket Location=", data.Location);
	expect(data.Location).toMatch(_mockBucketLocation);

	// Close
	engine.destroy();
})

test('Put Object', async () => {
	const engine = await S3.Connect(_mockS3Config);

	const body = fs.createReadStream('./test/mock/' + _mockObjKey1);

	const rsp = await engine.send(new PutObjectCommand({
		Bucket: _mockBucketName,
		Key: _mockObjKey1,
		Body: body,
	}));

	console.log("Object ETag=", rsp.ETag);

	engine.destroy();
})

// Test list objects
// ref: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/listobjectsv2command.html
test('List Objects', async () => {
	const engine = await S3.Connect(_mockS3Config);

	const rsp = await engine.send(new ListObjectsV2Command({Bucket: _mockBucketName}));
	console.log("Objects=", rsp.Contents);

	engine.destroy();
})

test('Get Object', async () => {
	const engine = await S3.Connect(_mockS3Config);

	// Get object
	const rsp = await engine.send(new GetObjectCommand({
		Bucket: _mockBucketName,
		Key: _mockObjKey1,
	}));

	// Convert stream to string
	const bodyString = await StreamToString(rsp.Body);
	console.log("Object=\n", bodyString);

	// Calc digest
	const digest = GetString(bodyString, 'sha256');

	// Check digest
	expect(digest).toMatch(_mockObjDigest);

	// Close
	engine.destroy();
})

test('Delete Object', async () => {
	const engine = await S3.Connect(_mockS3Config);

	// Delete object
	const rsp1 = await engine.send(new DeleteObjectCommand({
		Bucket: _mockBucketName,
		Key: _mockObjKey1,
	}));
	console.log("Response1=", rsp1);

	// Get object
	try {
		await engine.send(new GetObjectCommand({
			Bucket: _mockBucketName,
			Key: _mockObjKey1,
		}));
	} catch (e) {
		// Output error message
		console.log("Response2=", e);
	}

	engine.destroy();
})

test('Delete Bucket', async () => {
	const engine = await S3.Connect(_mockS3Config);

	// Delete bucket
	const rsp = await engine.send(new DeleteBucketCommand({
		Bucket: _mockBucketName,
	}));
	console.log("Response=", rsp);

	// List bucket
	const buckets = await engine.send(new ListBucketsCommand({}));
	for (let bucket of buckets.Buckets) {
		console.log("Bucket name=", bucket.Name);
		expect(bucket.Name).not.toMatch(_mockBucketName);
	}

	// Close
	engine.destroy();
})
