import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor() { }

  private showToast(icon: 'success' | 'error' | 'warning' | 'info', title: string, message: string ) {
    Swal.fire({
      toast: true,
      position: 'top-start',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      icon,
      title: title,
      text: message,
      customClass: {
        popup: `swal-${icon}`
      },
      didOpen: (toast) => {
        toast.addEventListener('mouseover', Swal.stopTimer);
        toast.addEventListener('mouseout', Swal.resumeTimer);
      }
    });
  }

  showSuccess(message: string, title: string = 'Success') {
    this.showToast('success', title, message);
  }

  showWarning(message: string, title: string = 'Warning') {
    this.showToast('warning', title, message);
  }

  showError(message: string, title: string = 'Error') {
    this.showToast('error', title, message);
  }

  showInfo(message: string, title: string = 'Info') {
    this.showToast('info', title, message);
  }
}
