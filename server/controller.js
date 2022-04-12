const houses = require('./db.json');
let globalId = 4;

module.exports = {
    getHouses: (req, res) => res.status(200).send(houses),
    deleteHouse: (req, res) => {
        let index = houses.findIndex(elem => elem.id === +req.params.id);
        // console.log(req.params.id, elem.id);
        houses.splice(index, 1);
        res.status(200).send(houses)

    },
    createHouse: (req, res) => {
        //destructuring req.body object
        let {address, price, imageURL} = req.body;
        //let address = req.body.address
        //let price = req.body.price
        //let imageURL = req.body.imageURL
        // price = +price;
        //new house object to be pushed
        let newHouse = {
            id: globalId,
            address,
            price: +price,
            imageURL,
        };
        // console.log(typeof(newHouse.price))
        houses.push(newHouse);
        res.status(200).send(houses);
        //incrementing variable tracking house id
        globalId++
    },

    updateHouse: (req, res) => {
        let {id} = req.params;

        let {type} = req.body;

        let index = houses.findIndex(elem => elem.id === +req.params.id)

        if (type === 'plus') {
            houses[index].price += 10000
            res.status(200).send(houses)
        } else if (type === 'minus') {
            if(houses[index].price <= 10000) {
                res.status(400).send('error')
            } else {
                houses[index].price -= 10000
                res.status(200).send(houses)
            }
        }
        // else {
        //     res.sendStatus(400)
        // }
    }
}
