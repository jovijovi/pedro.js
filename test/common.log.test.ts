import * as log from "../lib/common/log";

test('Log', () => {
	log.RequestId("reqId1").trace("This is a trace msg");
	log.RequestId("reqId2").debug("This is a debug msg");
	log.RequestId("reqId3").info("This is a info msg");
	log.RequestId("reqId4").warn("This is a warn msg");
	log.RequestId("reqId5").error("This is a error msg");
	log.RequestId("reqId6").fatal("This is a fatal msg");

	const word = "world"
	log.RequestId("reqId7").info(`hello, world`);
	log.RequestId("reqId7").info('hello, %s', word);
	log.RequestId("reqId7").info(`hello, %s`, word);
	log.RequestId("reqId7").info(`hello, %s`, "world");

	class User {
		Name: string;
		Age:  number;
	}

	let user: User;
	user = new User();
	user.Name = "Tom";
	user.Age = 1;
	log.RequestId("reqId8").info("User=", user);
	log.Close(() => {
		console.log("logger closed")
	})
})
