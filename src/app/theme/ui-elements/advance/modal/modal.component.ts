import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {transition, trigger, style, animate} from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: [
    './modal.component.scss',
    '../../../../../../node_modules/sweetalert2/src/sweetalert2.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class ModalComponent implements OnInit {
  showDialog = false;
  @Input() visible: boolean;
  public config: any;

  constructor() {}

  ngOnInit() {
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  openBasicModal(event) {
    this.showDialog = !this.showDialog;
    setTimeout(() => {
      document.querySelector('#' + event).classList.add('md-show');
    }, 25);
  }

  closeBasicModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
    setTimeout(() => {
      this.visible = false;
      this.showDialog = !this.showDialog;
    }, 300);
  }

  openSwal() {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool',
      allowOutsideClick: true
    })
  }

  openBasicSwal() {
    Swal.fire({
      title: 'Heres a message!',
      text: 'Its pretty, isnt it?'
    })
  }

  openSuccessSwal() {
    Swal.fire({
      title: 'Good job!',
      text: 'You clicked the button!',
      icon: 'success'
    })
  }

  openConfirmsSwal() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You wont be able to revert',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(function () {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      );
    })
  }

  openSuccessCancelSwal() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You wont be able to revert',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      buttonsStyling: false
    }).then(function () {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      );
    }, function (dismiss) {
      if (dismiss === 'cancel') {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    })
  }

  openPromptSwal() {
    Swal.fire({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      animation: false,
      progressSteps: ['1', '2', '3']
    });

    const steps = [
      {
        title: 'Question 1',
        text: 'Chaining swal2 modals is easy'
      },
      'Question 2',
      'Question 3'
    ];

    Swal.queue(steps).then(function (result) {
      Swal.resetValidationMessage();
      Swal.fire({
        title: 'All done!',
        html:
        'Your answers: <pre>' +
        JSON.stringify(result) +
        '</pre>',
        confirmButtonText: 'Lovely!',
        showCancelButton: false
      });
    }, function () {
      Swal.resetValidationMessage();
    })
  }

  openAjaxSwal() {
    Swal.fire({
      title: 'Submit email to run ajax request',
      input: 'email',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: function (email) {
        return new Promise(function (resolve, reject) {
          setTimeout(function() {
            if (email === 'taken@example.com') {
              reject('This email is already taken.');
            } else {
              resolve();
            }
          }, 2000);
        });
      },
      allowOutsideClick: false
    }).then(function (email) {
      Swal.fire({
        icon: 'success',
        title: 'Ajax request finished!',
        html: 'Submitted email: ' + email
      });
    })
  }

}
