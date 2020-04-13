import { LightningElement } from 'lwc';
import createInterview from '@salesforce/apex/InitiateInterviewController.createInterview';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

export default class InterviewProcess extends LightningElement {

    interviewInputs;

    initiateInterview(event) {
        //console.log('handling event in parent=> ' + JSON.stringify(event.detail));
        this.interviewInputs = JSON.stringify(event.detail);
    }

    handleNext(){
        createInterview({ candidateData: this.interviewInputs })
            .then(result => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: result,
                        message: result,
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error Occured',
                        message: reduceErrors(error).join(', '),
                        variant: 'error'
                    })
                );
            });
    }

}