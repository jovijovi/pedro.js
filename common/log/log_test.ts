import * as log from "./log";

log.RequestId("reqId1").Trace("This is a trace msg")
log.RequestId("reqId2").Debug("This is a debug msg")
log.RequestId("reqId3").Info("This is a info msg")
log.RequestId("reqId4").Warn("This is a warn msg")
log.RequestId("reqId5").Error("This is a error msg")
log.RequestId("reqId6").Fatal("This is a fatal msg")