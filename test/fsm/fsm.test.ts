import {NSFSM} from '../../lib/fsm';
import {NSEvent} from '@jovijovi/pedrojs-event';

test('FSM', () => {
	// New event 1
	const evt1 = NSEvent.New();
	evt1.SetName('OpenDoor');
	evt1.SetSrc('DoorClosed');

	// New event 2
	const evt2 = NSEvent.New();
	evt2.SetName('CloseDoor');
	evt2.SetSrc('DoorOpened');

	// New a FSM
	const fsm = NSFSM.New({
		id: 'test-id-1',
		initial: NSFSM.NewState('DoorClosed'),
		transitions: [
			{
				event: evt1,
				from: [NSFSM.NewState('DoorClosed')],
				to: NSFSM.NewState('DoorOpened'),
				handler: (ctx) => {
					// Door opened
					console.log("Handler1:", ctx.get('who'), ctx.get('what'));
				},
				context: new Map([
					['who', 'Door'],
					['what', 'opened'],
				]),
			},
			{
				event: evt2,
				from: [NSFSM.NewState('DoorOpened')],
				to: NSFSM.NewState('DoorClosed'),
				handler: (ctx) => {
					// Door closed
					console.log("Handler2:", ctx.get('who'), ctx.get('what'));
				},
				context: new Map([
					['who', 'Door'],
					['what', 'closed'],
				]),
			},
		],
	});
	console.log("Current State=", fsm.Current().value);

	// Open door
	const rsp1 = fsm.On(evt1, () => {
		console.log("Event(%s) finished", evt1.data.name);
	});
	console.log("Response1=", rsp1);
	console.log("Current State1=", rsp1.state.value);

	// Close door
	const rsp2 = fsm.On(evt2, (ctx) => {
		console.log(ctx.get('who'), ctx.get('what'), ":", "Hello, world!");
	}, new Map([
		['who', 'Somebody'],
		['what', 'say'],
	]));
	console.log("Response2=", rsp2);
	console.log("Current State2=", rsp2.state.value);

	// Close FSM (unsafe)
	fsm.Close();
})
