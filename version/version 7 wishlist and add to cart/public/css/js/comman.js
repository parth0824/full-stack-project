console.log('connected')


const allLikebutton = document.querySelectorAll('.like-button')

async function likeButton(productId) {
    
    const responce = await axios({
        method: 'post',
        url: `/product/${productId}/like`,
    });

    console.log(responce)
}
for (let btn of allLikebutton) {
    btn.addEventListener('click', () => {
        const productId =  btn.getAttribute('product-id')
        likeButton(productId)
    })
}