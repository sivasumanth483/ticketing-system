db.trains.aggregate([
    {
        $match: {
            "_id": {
                $in: [ ObjectId("5ed23a44cf6dc10adaad267c"), ObjectId("5ed23a44cf6dc10adaad267c") ]
            }
        }
    },
    {
        "$lookup": {
            "from": "trains",
            "localField": "journey.stationId",
            "foreignField": "_id",
            "as": "journeylist"
        }
    }
]);