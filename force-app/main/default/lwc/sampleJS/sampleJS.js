import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
export default class SampleJS extends LightningElement {

	@wire(CurrentPageReference) pageRef; // Required by pubsub
	connectedCallback() {
		// subscribe to bearListUpdate event
        // Uncomment this for using event across Lighting page
        //registerListener('pubsubinterview', this.handleBearListUpdate, this);
	}

	disconnectedCallback() {
		// unsubscribe from bearListUpdate event
		unregisterAllListeners(this);
    }
    
    handleBearListUpdate(data) {
        console.log('pub sub in SampleJS =>' + JSON.stringify(data));
    }
}