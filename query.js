db.trains.aggregate(
    [
        {
            "$addFields": {
                "journey": { "$ifNull": ["$journey", []] }
            }
        },
        {
            "$lookup": {
                "from": "stations",
                "localField": "journey.stationId",
                "foreignField": "_id",
                "as": "journeylist"
            }
        },{
            "$match":{
                "$and":[{"journey.stationId":ObjectId("5ed228449daf3e0c30395c5d")}]
            }
        }
    ]
).pretty()