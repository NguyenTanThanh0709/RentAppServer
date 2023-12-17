import express from 'express'
import * as dotenv from 'dotenv'
import connect from './database/database.js'
import checkToken from './authentication/auth.js'
import cors from 'cors';
import {
    roomingHouseRouter,
    tenantRouter,
    landordRouter,
    AmenitiesRouter,
    TypehouseRouter,
    ServiceChargeRouter,
    AreaInformationRouter,
    baivietRouter,
    viewingAppointmentRouter,
    roomingHouseComplexRouter,
    favouritesRoomRouter,
    commentReviewRouter,
    searchCriteriaRouter,
    issueRouter,
    leaseContractRouter,
    billRouter,
    findRoomHouseRouter,
    timnguoioghep
} from './routers/index.js'



dotenv.config()//must have
const app = express()
app.use(checkToken)
app.use(express.json())
app.use(cors({ origin: '*' }));
const port = process.env.PORT || 3000

app.use('/bill', billRouter)
app.use('/roominghouse', roomingHouseRouter)
app.use('/searchcriteria', searchCriteriaRouter)
app.use('/tenant', tenantRouter)
app.use('/landlord', landordRouter)
app.use('/amenities', AmenitiesRouter)
app.use('/typehouse', TypehouseRouter)
app.use('/servicecharege', ServiceChargeRouter)
app.use('/areaInformation', AreaInformationRouter)
app.use('/roomingHouseComplex', roomingHouseComplexRouter)
app.use('/favoritiesroom', favouritesRoomRouter)
app.use('/baiviet', baivietRouter)
app.use('/lichhen', viewingAppointmentRouter)
app.use('/comment', commentReviewRouter)
app.use('/issue', issueRouter)
app.use('/leasecontract', leaseContractRouter)
app.use('/findhouse', findRoomHouseRouter)
app.use('/timnguoioghep', timnguoioghep)
app.get('/', (req, res) =>{
    res.send('response from root router, haha 1111')
})

app.listen(port, async() => {
    await connect()
    console.log(`listening on port : ${port}`)
})

