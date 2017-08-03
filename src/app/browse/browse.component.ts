import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { BrowseService } from './browse.service';

@Component({
  selector: 'es-browse',
  templateUrl: './browse.component.html',
})
export class BrowseComponent {

  @Output() submitted = new EventEmitter();

  public loading = false;
  public url: string;

  private data: Object;

  constructor(private browseService: BrowseService) { }

  /**
   * Triggered when the browse form is submitted.
   *
   * @param {boolean} isValid
   */
  submit(isValid: boolean): void {
    if (isValid) {
      this.loading = true;
      this.browseService
        .fetch(this.url)
        .subscribe(
          (data) => this.proceed(data),
          (error) => this.cancel(error)
        );
    }
    if (this.data) {
      this.submitted.emit(null); // reset data to trigger animations
    }
  }

  /**
   * Proceed insights process.
   *
   * @param {Object} data
   */
  proceed(data: Object) {
    this.loading = false;
    this.data = data;
    this.submitted.emit(data);
  }

  /**
   * Cancel insights process.
   *
   * @param {Object} error
   */
  cancel(error: Object) {
    setTimeout(() => {
      this.loading = false;
    }, 600);
  }

}
