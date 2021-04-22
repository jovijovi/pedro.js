import * as log from "../common/log";

test('#Log', () => {
	log.RequestId("reqId1").Trace("This is a trace msg");
	log.RequestId("reqId2").Debug("This is a debug msg");
	log.RequestId("reqId3").Info("This is a info msg");
	log.RequestId("reqId4").Warn("This is a warn msg");
	log.RequestId("reqId5").Error("This is a error msg");
	log.RequestId("reqId6").Fatal("This is a fatal msg");

	const word = "world"
	log.RequestId("reqId7").Info(`hello, world`);
	log.RequestId("reqId7").Info('hello, %s', word);
	log.RequestId("reqId7").Info(`hello, %s`, word);
	log.RequestId("reqId7").Info(`hello, %s`, "world");

	class User {
		Name: string;
		Age:  number;
	}

	let user: User;
	user = new User();
	user.Name = "Tom";
	user.Age = 1;
	log.RequestId("reqId8").Info("User=", user);
})
