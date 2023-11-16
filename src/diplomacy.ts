import {StatesOfInteraction} from './helper/helper'
import DiplomaticStateMachine from './helper/diplomatic-state-machine'

export class Diplomacy
{
    private relations: Map<string, Map<string, DiplomaticStateMachine>> = new Map<string, Map<string, DiplomaticStateMachine>>();
    private myRooms: string[];
    private desiredRooms: string[];

    constructor(myRooms: string[], roomsIWant: string[])
    {
        this.myRooms = myRooms;
        this.desiredRooms = roomsIWant;

        // prepare default Categories
        this.relations.set(StatesOfInteraction.PEACE, new Map<string, DiplomaticStateMachine>());
        this.relations.set(StatesOfInteraction.TRADE, new Map<string, DiplomaticStateMachine>());
        this.relations.set(StatesOfInteraction.WAR, new Map<string, DiplomaticStateMachine>());
    }

    private addDiplomaticRelation(colonyName: string, relationState: StatesOfInteraction){
        // create Statemachine
        var stateMachine: DiplomaticStateMachine = new DiplomaticStateMachine(
            this,
            {
                onEnter: this.onWarEnter,
                onUpdate: this.onWarUpdate,
                onExit: this.onWarExit
            },
            {
                onEnter: this.onTradeEnter,
                onUpdate: this.onTradeUpdate,
                onExit: this.onTradeExit
            },
            {
                onEnter: this.onPeaceEnter,
                onUpdate: this.onPeaceUpdate,
                onExit: this.onPeaceExit
            }
        )
        stateMachine.setState(colonyName, relationState);

        // store name with statemachine
        this.relations.get(relationState).set(
            colonyName,
            stateMachine
        )
    }

    addTradePartner(name: String) {
        this.addDiplomaticRelation(name, StatesOfInteraction.TRADE)
    }

    addAlly(name: String){
        this.addDiplomaticRelation(name, StatesOfInteraction.PEACE)
    }

    update(name, newState: StatesOfInteraction)
    {
        categoryLoop:
        for (var [currentState, colonies] of this.relations.entries()) {
            for (var [colonyName, relationState] of colonies.entries()) {
                if(colonyName == name) {
                    this.relations.get(newState).set(name, colonies.get(name));
                    colonies.delete(name);
                    relationState.setState(colonyName, newState);
                    console.log(`${name} changed from ${currentState} to ${newState}`)

                    break categoryLoop; // This will break out of all the loops
                }
            }
        }

    }

    private onWarEnter()
    {
        // logic for entering move state
    }

    private onWarUpdate()
    {
        // logic for moving on each update tick
    }

    private onWarExit()
    {
        // logic for when leaving the trade state
    }

    private onTradeEnter()
    {
        // logic for trading
    }

    private onTradeUpdate()
    {
        // logic for trading
    }

    private onTradeExit()
    {
        // logic for when leaving the trade state
    }

    private onPeaceEnter()
    {
        // logic for when leaving the peace state
    }

    private onPeaceUpdate()
    {
        // logic for when leaving the peace state
    }

    private onPeaceExit()
    {
        // logic for when leaving the trade state
    }

    // ...
}
