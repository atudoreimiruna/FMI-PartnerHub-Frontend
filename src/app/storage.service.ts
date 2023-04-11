import { Injectable } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private blobServiceClient: BlobServiceClient;

  constructor() {
    this.blobServiceClient  = new BlobServiceClient('DefaultEndpointsProtocol=https;AccountName=licentafilesstorage;AccountKey=3KyOdNndi+8le5VLjM+ifASp7Db6kvlCGWh/4Ddt7ExzO/T+hEJ9UJRmDgazkUO8AWe5TyECidid+AStEbPGAg==;EndpointSuffix=core.windows.net')
  }

}
