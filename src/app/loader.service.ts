import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading = signal(false);
  isLoading$ = this.isLoading.asReadonly();

  constructor() { }

  start() {
    this.isLoading.set(true);
  }

  stop() {
    this.isLoading.set(false);
  }
}
