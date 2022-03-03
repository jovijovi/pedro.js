import {Context} from './types';
import {NSEvent} from '@jovijovi/pedrojs-event';

export namespace NSFSM {
	interface IState {
		value: string;
	}

	class State implements IState {
		constructor(v: string) {
			this._value = v;
		}

		private _value: string;

		get value(): string {
			return this._value;
		}

		set value(v: string) {
			this._value = v;
		}
	}

	class Response {
		state: State;
		error: Error;
	}

	type Handler = (context?: Context) => void;

	// FSM transitions
	interface ITransition {
		event: NSEvent.Event,
		from: State[],
		to: State,
		handler?: Handler | undefined,
		context?: Context | undefined,
	}

	// FSM config
	interface IOptions {
		id: string;
		initial: State;
		transitions: ITransition[];
	}

	interface ITarget {
		state: State,
		handler?: Handler | undefined,
		context?: Context | undefined,
	}

	interface IFSM {
		// Current returns FSM current state
		Current(): State;

		// Trigger event
		On(event: NSEvent.Event, handler?: (context: Context) => void, context?: Context): Response;

		// Close FSM (unsafe)
		Close();
	}

	class FSM implements IFSM {
		private readonly _id: string;
		private _current: State;
		private _mapper: Map<any, ITarget>;
		private _events: Map<any, NSEvent.Event>;
		private _states: Map<State, boolean>;

		constructor(options: IOptions) {
			this._id = options.id;
			this._current = options.initial;

			this.initMap();

			for (const tr of options.transitions) {
				for (const from of tr.from) {
					this._mapper.set(this.buildMapperKey(tr.event, from), {
						state: tr.to,
						handler: tr.handler,
						context: tr.context,
					} as ITarget);
					this._states.set(from, true);
				}
				this._states.set(tr.to, true);
				this._events.set(this.buildEventKey(tr.event), tr.event);
			}
		}

		// Build the key of _mapper
		buildMapperKey(event: NSEvent.Event, from: State): string {
			return JSON.stringify({
				flow: event.data.flow,
				name: event.data.name,
				from: from.value,
			});
		}

		// Build the key of _events
		buildEventKey(event: NSEvent.Event): string {
			return JSON.stringify({
				flow: event.data.flow,
				name: event.data.name,
			});
		}

		// Initialize map
		initMap() {
			this._mapper = new Map();
			this._events = new Map();
			this._states = new Map();
		}

		// Current returns FSM current state
		Current(): State {
			return this._current;
		}

		// Transition state
		transition(event: NSEvent.Event, handler?: Handler, context?: Context): Response {
			const key = this.buildMapperKey(event, this._current);
			if (!this._mapper.has(key)) {
				return {
					state: this._current,
					error: new Error('invalid event'),
				};
			}

			const target = this._mapper.get(key);

			// Update state
			this._current = target.state;

			// Run built-in function defined in FSM options
			if (target.handler) {
				try {
					target.handler(target.context);
				} catch (e) {
					return {
						state: this._current,
						error: e,
					}
				}
			}

			// Run function defined in params 'handler'
			if (handler) {
				try {
					handler(context);
				} catch (e) {
					return {
						state: this._current,
						error: e,
					}
				}
			}

			return {
				state: this._current,
				error: null,
			};
		}

		// Trigger event
		On(event: NSEvent.Event, handler?: Handler, context?: Context): Response {
			return this.transition(event, handler, context);
		}

		// Close FSM (unsafe)
		Close() {
			this._mapper.clear();
			this._events.clear();
			this._states.clear();
			this._current = undefined;
		}
	}

	// New returns new FSM instance
	export function New(options?: IOptions): IFSM {
		return new FSM(options);
	}

	// NewState returns FSM state instance
	export function NewState(v: string): State {
		return new State(v);
	}
}
