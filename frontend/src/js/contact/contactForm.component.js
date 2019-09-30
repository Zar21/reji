class contactFormCtrl {
    constructor(Contact, toaster, $timeout, $state) {
        'ngInject';
        this._Toaster = toaster;
        this._Contact = Contact;

        this.sendEmail = function() {
            //this.user.message = 'Email: '+ this.user.email + '\nName: ' + this.user.name + '\n\nMessage:\n' + this.user.message
            this._Contact.send(this.user).then(
                (res) => {
                    if (res == undefined) {
                        this._Toaster.pop('error', 'Ups', 'The message wasn\'t sent');
                    } else {
                        this._Toaster.pop('success', 'Thanks!', 'Message sent');
                    }
                }
            );
        };
        this.invalidContact = function() {
            this._Toaster.pop('error', 'Ups', 'Please use all the fields');
        }
    }
}

let contactForm = {
    controller: contactFormCtrl,
    templateUrl: 'contact/contactForm.html'
};

export default contactForm;