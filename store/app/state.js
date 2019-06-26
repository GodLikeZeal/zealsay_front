export default {
  drawer: localStorage.getItem('drawer')
    ? localStorage.getItem('drawer')
    : null,
  color: localStorage.getItem('color')
    ? localStorage.getItem('color')
    : 'success',
  image: localStorage.getItem('image')
    ? localStorage.getItem('image')
    : 'https://pan.zealsay.com/bg-103.jpg'
}
