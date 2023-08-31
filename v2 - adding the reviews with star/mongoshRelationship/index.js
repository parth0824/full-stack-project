const mongoose = require('mongoose')
mongoose.connect('mongodb://0.0.0.0:27017/mongooseRelationship')
    .then(() => console.log("DB mongooseRelationship connected"))
const userSchema = new mongoose.Schema({
    name: String,
    addresses: [{
        _id: false,// this will not making new id automatically 
        lane: String,
        city: String,
        state: String,
        country: String,
    }],
    age: Number
})
const User = mongoose.model('User', userSchema)
const makeUser = async () => {
    const user = new User({ name: 'chintu bhai', age: 21 })
    await user.save()
    console.log('user created successfully :)')
    console.log(user)
}
// makeUser()
// async function d(id) { await User.findByIdAndDelete(id) }
// d('64f09eb4305f85d37e1ba1f1')
async function addAddress(id) {
    const user = await User.findById(id)
    await console.log('user find success')
    user.addresses.push(
        {
            lane: 'Kamla nagar e-block House number 11',
            city: 'Delhi',
            state: 'NA',
            country: 'India'
        },
        {
            lane: 'Gali number 420 makan number 21',
            city: 'New jersey',
            state: 'Bihar',
            country: 'USA'
        },        {
            lane: 'ABCDE',
            city: 'New york',
            state: 'MP',
            country: 'USA'
        }
    )

    await user.save()
    console.log(user)
}
addAddress('64f09ece483ef2fc4d6990e6')