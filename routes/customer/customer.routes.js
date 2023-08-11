const express = require('express')
const customerRouter =express.Router()

const{registration,customerdetails,logindata,customer_addressbook,customer_feedback,product_material,order_list,list_providers,select_provider,payment,change_password,complete_order_detail,selected_provider_data,listing_providers,single_cus_order } = require('./customer.controller')


customerRouter.post('/login',logindata)
customerRouter.post('/register',registration)
customerRouter.post('/address',customer_addressbook)
customerRouter.post('/feedback',customer_feedback)
customerRouter.get('/material',product_material)
customerRouter.post('/order',order_list)
customerRouter.post('/detail',customerdetails)
customerRouter.post ('/list',list_providers)
customerRouter.post('/select',select_provider)
customerRouter.post('/payment',payment)
customerRouter.put('/changepassword',change_password)
customerRouter.post('/complete_order',complete_order_detail)
customerRouter.get('/selected_provider',selected_provider_data)
// customerRouter.post('/documents',customer_documentation)
customerRouter.get('/provider_list',listing_providers)
customerRouter.post('/customer_order',single_cus_order )

















module.exports=customerRouter