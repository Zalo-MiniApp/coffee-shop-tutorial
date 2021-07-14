const env = import.meta.env.MODE || 'development';
const config = {
  development: {
    BASE_URL: 'http://localhost:5000',
    OA_ID: '4318657068771012646',
    DEV_TOKEN: 'vLonAUFb_WFYMRGgvkBx1-TSjIpb_AnqbJMG3utMkahrDQyZjkEnMDieZXA2nvv_n2A50fJ2fJFe0P97aBQyDDPBj5wiywqJ-m-UTxgvkrdLVAeegBw8JUbQn6Y9fOqkvMQ4PfIhd0_GIxPxYRsz2Djyf7g4dQWoxaINIOg6l1kIVBTWzBsb5Q1Sja_sbBaqcK3rNzgux3ADKgPuzxQ38xOAlWYsvPDTwocaAEVDYdw3EiXFsuF82O1qYrRsaf0Dj5wlHiQ2x3oKOwSGbzksQ6frDOvw7EFy_mS'
  },
  production: {
    BASE_URL: 'https://coffee-shop-server-api.herokuapp.com',
    OA_ID: '4318657068771012646'
  }
}

export default config[env];