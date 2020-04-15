import { LightningElement, wire } from 'lwc';
import { fireEvent } from 'c/pubsub';

import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';
export default class InitiateInterview extends LightningElement {

    roles = [];
    level = 'beginner';
    firstName;
    lastName;
    company = '';
    notes = '';

    // Files
    fileName;
    fileContent = '';

    get options() {
        return [
            { label: 'Developer', value: 'Developer' },
            { label: 'Technical Architect', value: 'Technical Architect' },
            { label: 'Solution Architect', value: 'Solution Architect' },
            { label: 'Business Analyst', value: 'Business Analyst' },
            { label: 'Scrum Master', value: 'Scrum Master' },
            { label: 'PM', value: 'PM' },
        ];
    }

    get levels() {
        return [
            { label: 'Beginner', value: 'Beginner' },
            { label: 'Intermediate', value: 'Intermediate' },
            { label: 'Advanced', value: 'Advanced' },
        ];
    }

    async handleFormInputChange(event) {
        switch (event.target.name) {
            case 'firstName':
                this.firstName = event.target.value;
                break;
            case 'lastName':
                this.lastName = event.target.value;
                break;
            case 'company':
                this.company = event.target.value;
                break;
            case 'notes':
                this.notes = event.target.value;
                break;
            case 'roles':
                this.roles = event.target.value;
                break;
            case 'level':
                this.level = event.target.value;
                break;
        }

        if (event.target.files) {
            this.fileName = event.target.files[0].name;
            this.fileContent = await this.readFile(event.target.files[0]);
        }

        this.createInitiateInterviewEvent();
    }


    readFile(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                resolve(fileReader.result.split(/base64,/)[1]);
            };
            fileReader.onerror = () => {
                reject(fileReader.error);
            };
            fileReader.readAsDataURL(file);
        });
    }

    createInitiateInterviewEvent() {
        let isValid = false;
        console.log('first=> ' + this.firstName + ' ' + 'last => ' + this.lastName);
        if ((typeof this.firstName != 'undefined' && this.firstName.length != 0) &&
            typeof this.lastName != 'undefined' && this.lastName.length != 0) {
            isValid = true;
        }
        const nextEvnt = new CustomEvent('initiateinterview', {
            detail: {
                page: "1", firstName: this.firstName, lastName: this.lastName, company: this.company, reqValidation: isValid,
                notes: this.notes, roles: this.roles, level: this.level, fileName: this.fileName, file: this.fileContent
            }
        });
        this.dispatchEvent(nextEvnt);
    }
}