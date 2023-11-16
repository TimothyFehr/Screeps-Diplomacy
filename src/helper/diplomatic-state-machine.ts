import {StatesOfInteraction} from './helper'

interface IState
{
	onEnter?: () => void
	onUpdate?: () => void
	onExit?: () => void
}

export default class DiplomaticStateMachine
{
	private context?: object
	private states = new Map<string, IState>()
	private currentState?: StatesOfInteraction

	constructor(context: object, warState: {
		onEnter: () => void;
		onExit: () => void;
		onUpdate: () => void
	}, tradeState: IState, peaceState: IState,)
	{
		this.context = context

		this.states.set(StatesOfInteraction.WAR, warState)
		this.states.set(StatesOfInteraction.TRADE, tradeState)
		this.states.set(StatesOfInteraction.PEACE, peaceState)

		this.currentState = StatesOfInteraction.WAR;
	}

	addCustomState(name: string, config?: { onEnter?: () => void, onUpdate?: () => void, onExit?: () => void })
	{
		const context = this.context

		this.states.set(name, {
			onEnter: config?.onEnter?.bind(context),
			onUpdate: config?.onUpdate?.bind(context),
			onExit: config?.onExit?.bind(context)
		})

		return this
	}

	setState(colonyName: string, newState: StatesOfInteraction)
	{
		if (!this.states.has(newState))
		{
			console.warn(`Tried to change to unknown state: ${newState}`)
			return
		}

		if (this.isCurrentState(newState))
		{
			return
		}

		console.log(`Relation to ${colonyName} change from ${this.currentState ?? 'none'} to ${newState}`)

		if (this.currentState && this.states.get(this.currentState).onExit)
		{
			this.states.get(this.currentState).onExit()
		}

		this.currentState = newState;

		if (this.states.get(this.currentState).onEnter)
		{
			this.states.get(this.currentState).onEnter()
		}
	}

	update()
	{
		if (this.currentState && this.states.get(this.currentState).onUpdate)
		{
			this.states.get(this.currentState).onUpdate()
		}
	}

	isCurrentState(state: StatesOfInteraction)
	{
		if (!this.currentState)
		{
			return false
		}

		return this.currentState === state
	}
}