import { Injectable } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private blobServiceClient: BlobServiceClient;

  constructor() {
    this.blobServiceClient  = new BlobServiceClient('')
  }

}
