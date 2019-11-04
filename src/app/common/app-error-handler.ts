import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {

    // function to give error alert
    handleError(error) {
        alert('An unexpected error occurred.');
    }

}
