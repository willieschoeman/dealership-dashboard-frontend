import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';

import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.scss']
})
export class EditStockComponent implements OnInit {

  @ViewChild('editModal') editModal: ElementRef
  public modalRef: BsModalRef
  private isLoading: boolean
  private stock: any
  private dealerId: string
  private stockId: string
  public query: string
  public editError: string
  private images: any
  private imageHolder: any
  private error: boolean;
  private updateError: string

  constructor(private router: Router,
    private stockService: StockService,
    private modalService: BsModalService,
    public datepipe: DatePipe
  ) {
    this.isLoading = true
    this.error = false
    this.stock = {}
    this.query = ''
    this.editError = ''
    this.updateError = ''
    this.images = []
    this.imageHolder = []
  }

  ngOnInit() {
    this.isLoading = true
    this.error = false

    this.stockId = sessionStorage.getItem("SELECTEDID")

    if (!this.stockId) {
      this.router.navigate(['stock']).then(() => {
        window.location.reload()
        this.isLoading = false
      });
    }

    this.dealerId = sessionStorage.getItem("DEALERID")

    this.editError = ''
    this.stock.dealerId = this.dealerId
    this.stock.images = []
    this.stock.accessories = []
    this.images = []
    this.imageHolder = []

    const params = "/" + this.dealerId + "/" + this.stockId

    this.stockService.getStock(params)
      .subscribe(res => {
        this.stock = res[0]
        this.stock.created = this.datepipe.transform(this.stock.created, 'yyyy-MM-dd HH:mm')
        this.stock.updated = this.datepipe.transform(this.stock.updated, 'yyyy-MM-dd HH:mm')
        this.isLoading = false
      })

  }

  updateStock() {

    this.isLoading = true
    this.error = false

    this.editError = ''

    if (!this.stock.registrationNo || !this.stock.make 
      || !this.stock.model || !this.stock.modelYear 
      || !this.stock.kms || !this.stock.colour 
      || !this.stock.vin || !this.stock.retailPrice || !this.stock.costPrice) {
      this.editError = 'All fields are required!'
      this.isLoading = false
      return
    }

    if (this.images.length == 0 && this.stock.images.length == 0) {
      this.editError = 'Please add atleast one image!'
      this.isLoading = false
      return
    }

    let payload = this.stock
    let totalImages = this.stock.images.length

    for (let i = 0; i < this.images.length; i++) {
      
      let imageObject = {
        "name": this.imageHolder[i].name.split('.')[0],
        "location": this.imageHolder[i].name
      }

      this.stockService.uploadImage(this.imageHolder[i], this.imageHolder[i].name)
        .subscribe(res => {

        })
      
      payload.images[totalImages + i] = imageObject

    }

    let params = '/' + this.stockId
    delete payload._id
    
    this.stockService.updateStock(params, payload)
      .subscribe(res => {
        this.isLoading = false
        this.showEditModal()
      },
        error => {
          this.isLoading = false
          this.error = true;
          this.updateError = 'Unable to update item. Please try again later!'
          this.showEditModal()
        });

  }

  addAccessories() {

    let accessoriesLength = this.stock.accessories.length
    this.stock.accessories[accessoriesLength] = {name: "", description: ""}

  }

  removeAccessories(imageIndex) {
    this.stock.accessories.splice(imageIndex, 1);
  }

  handleFiles(event) {

    this.editError = ''
    this.images = []
    this.imageHolder = []

    this.imageHolder = event.target['files']
    let totalImages = this.stock.images.length + this.imageHolder.length

    if (totalImages > 3) {
      this.editError = 'Only 3 images allowed!'
      return
    }

      for (let file of this.imageHolder) {
        let reader = new FileReader()
        reader.onload = (e: any) => {
          this.images.push(e.target.result)
        }
        reader.readAsDataURL(file)
      }

  }

  deleteNewImage(index) {
    this.images.splice(index, 1)
  }

  deleteStockImage(index) {
    this.stock.images.splice(index, 1)
  }

  showEditModal() {
    this.modalRef = this.modalService.show(this.editModal)
  }

  hideModal() {
    this.modalRef.hide() 
    window.location.reload()
  }

  back() {
    sessionStorage.removeItem("SELECTEDID")
    this.router.navigate(['stock']).then(() => {
      window.location.reload()
    });
  }

}
