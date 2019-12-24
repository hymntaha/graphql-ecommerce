import React, { Component } from 'react';
import './App.css';
import {Container,Box, Heading,Card,Image, Text} from "gestalt";
import Strapi from "strapi-sdk-javascript/build/main";

const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class App extends Component {
  state={
    brands: []
  }
  async componentDidMount(){
    try{
      const response = await strapi.request('POST', '/graphql',{
        data:{
          query: `query{
          brands {
            _id
            name
            description
            image{
              url
            }
          }
        }`
        }
      });
      this.setState({brands: response.data.brands})
    } catch(err){
      console.log(err)
    }

  }
  render() {
    const {brands } = this.state;
    return (
      <Container>
        <Box
          display='flex'
          justifyContent='center'
          marginBottom={2}
        >
          <Heading color='midnight' size='md'>
            Brew Brands
          </Heading>
        </Box>
        <Box display='flex' justifyContent='around'>
          {brands.map(brand=>(
            <Box key={brand._id}>
              <Card image={
                <Box height={200} width={200}>
                  <Image src={`${apiUrl}${brand.image.url}`} alt='Brand' naturalWidth={1} naturalHeight={1}/>
                </Box>
              }>

              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    );
  }
}

export default App;
