import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {

  @ViewChild('addModal') addModal: ElementRef
  public modalRef: BsModalRef
  private isLoading: boolean
  private stock: any
  private dealerId: string
  public query: string
  public addError: string
  private images: any
  private imageHolder: any
  private insertError: string
  private error: boolean

  constructor(private router: Router,
    private stockService: StockService,
    private modalService: BsModalService
  ) {
    this.isLoading = true
    this.error = false
    this.insertError = ''
    this.stock = {}
    this.query = ''
    this.addError = ''
    this.images = []
    this.imageHolder = []
  }

  ngOnInit() {
    this.isLoading = true
    this.dealerId = sessionStorage.getItem("DEALERID")

    this.addError = ''
    this.stock.dealerId = this.dealerId
    this.stock.images = []
    this.stock.accessories = []  
    this.error = false
    this.insertError = ''
    this.images = []
    this.imageHolder = []
    this.isLoading = false
  }

  addStock() {

    this.isLoading = true

    this.addError = ''
    this.error = false
    this.insertError = ''

    if (!this.stock.registrationNo || !this.stock.make 
      || !this.stock.model || !this.stock.modelYear 
      || !this.stock.kms || !this.stock.colour 
      || !this.stock.vin || !this.stock.retailPrice || !this.stock.costPrice) {
      this.addError = 'All fields are required!'
      this.isLoading = false
      return
    }

    if (this.images.length == 0) {
      this.addError = 'Please add atleast one image!'
      this.isLoading = false
      return
    }

    let payload = this.stock

    for (let i = 0; i < this.images.length; i++) {
      
      let imageObject = {
        "name": this.imageHolder[i].name.split('.')[0],
        "location": this.imageHolder[i].name
      }

      this.stockService.uploadImage(this.imageHolder[i], this.imageHolder[i].name)
        .subscribe(res => {

          if (i + 1 == this.images.length) {
            this.isLoading = false
         }
        });
      
      payload.images[i] = imageObject

    }

    this.stockService.addStock(payload)
      .subscribe(res => {
        this.isLoading = false
        this.showAddModal()
      },
        error => {
          this.isLoading = false
          this.error = true;
          this.insertError = 'Unable to add item. Please try again later!'
          this.showAddModal()
        });
  }

  deleteNewImage(index) {
    this.images.splice(index, 1)
  }

  addAccessories() {

    let accessoriesLength = this.stock.accessories.length
    this.stock.accessories[accessoriesLength] = {name: "", description: ""}

  }

  removeAccessories(imageIndex) {
    this.stock.accessories.splice(imageIndex, 1);
  }

  handleFiles(event) {

    this.addError = ''
    this.images = []
    this.imageHolder = []

    this.imageHolder = event.target['files']

    if (this.imageHolder.length > 3) {
      this.addError = 'Only 3 images allowed!'
      return
    }

      for (let file of this.imageHolder) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }

  }

  showAddModal() {
    this.modalRef = this.modalService.show(this.addModal)
  }

  hideModal() {
    this.modalRef.hide()
    window.location.reload()
  }

  back() {
    this.router.navigate(['stock']).then(() => {
      window.location.reload()
    });
  }

}
