import { LightningElement } from 'lwc';
import createInterview from '@salesforce/apex/InitiateInterviewController.createInterview';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import { reduceErrors } from 'c/ldsUtils';
export default class InterviewProcess extends LightningElement {

    interviewInputs;
    isInterviewQuesPage=false;
    isInitiateInterviewPage = true;
    initiateInterview(event) {
        //console.log('handling event in parent=> ' + JSON.stringify(event.detail));
        this.interviewInputs = event.detail;
    }

    handleNext(){
        console.log('interviewInputs => ' + this.interviewInputs);
        console.log('reqValidation value=> ' + this.interviewInputs.reqValidation);
        if(this.interviewInputs){
            if(this.interviewInputs.reqValidation){
                createInterview({ candidateData: JSON.stringify(this.interviewInputs) })
                .then(result => {
                    this.isInterviewQuesPage = true;
                    this.isInitiateInterviewPage = false;
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
            }else{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Please fill in the required fields',
                        variant: 'error'
                    })
                );                
            }

        }
    }
}