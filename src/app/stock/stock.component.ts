import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { StockService } from '../services/stock.service';
import { SearchingPipe } from '../search/searching.pipe';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  @ViewChild('deleteModal') deleteModal: ElementRef
  public modalRef: BsModalRef
  private isLoading: boolean
  private stock: any
  private dealerId: string
  public query: string
  private selectedId: string
  public deleteError: string
  public deleteModel: string
  public deleteMake: string

  constructor(private router: Router, 
          private stockService: StockService,
          public searchingPipe: SearchingPipe,
          private modalService: BsModalService,
          private loginService: LoginService
          ) {
    this.isLoading = true
    this.stock = []
    this.query = ''
    this.selectedId = ''
    this.deleteError = ''
    this.deleteModel = ''
    this.deleteMake = ''
  }

  ngOnInit() {
    this.isLoading = true
    this.dealerId = sessionStorage.getItem("DEALERID")

    this.deleteError = ''
    this.selectedId = ''
    this.deleteModel = ''
    this.deleteMake = ''
    this.stock = []

    const params = "/" + this.dealerId

    this.stockService.getStock(params)
      .subscribe(res => {
        this.stock = res
        this.isLoading = false
      })
  }

  editStock(id) {
    sessionStorage.setItem("SELECTEDID", id)
    this.router.navigate(["edit-stock"])
  }

  addStock() {
    this.router.navigate(["add-stock"])
  }

  deleteStock(id) {
    this.selectedId = id

    console.log(this.stock)

    for (let i = 0; i < this.stock.length; i++) {

      if (this.selectedId == this.stock[i]._id) {
        this.deleteModel = this.stock[i].model
        this.deleteMake = this.stock[i].make
      }

    }

    this.showDeleteModal()
  }

  confirmDelete() {
    this.isLoading = true

    this.deleteError = ''

    const params = "/" + this.selectedId

    this.stockService.deleteStock(params)
      .subscribe(res => {
          this.isLoading = false
          this.hideModal()
          window.location.reload()
      },
      error => {
         this.isLoading = false
         this.deleteError = 'Unable to delete item. Please try again later!'
    });

  }

  showDeleteModal() {
    this.modalRef = this.modalService.show(this.deleteModal)
  }

  hideModal() {
    this.modalRef.hide()
  }

  logout() {
    this.loginService.logout();
  }

}
