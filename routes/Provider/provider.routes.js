const express = require('express')
const providerRouter = express.Router()
const {providerRegistration,provider_login,customers_details,single_order_detail,amount_added,driver_documentation,provider_feedback,changeing_password,complete_trip,vehicle_details,adding_veh_details,adding_status,vehicle_list} =require('./provider.controller')






providerRouter.post('/register',providerRegistration)
providerRouter.post('/login',provider_login)
providerRouter.get('/customer_details',customers_details)
providerRouter.post('/single_order',single_order_detail)
providerRouter.post('/adding_amt',amount_added)
providerRouter.post('/documents',driver_documentation)
providerRouter.post('/feedback',provider_feedback)
providerRouter.put('/changepassword',changeing_password)
// providerRouter.post('/details_adding',vehicle_detail_adding)
// providerRouter.post('/details',vehicle_data)
providerRouter.post('/trips',complete_trip)
providerRouter.post('/vehicle_details',vehicle_details)
providerRouter.get('/adding_details',adding_veh_details)
providerRouter.post('/status',adding_status)
providerRouter.get('/vehicle_list',vehicle_list)












module.exports = providerRouter