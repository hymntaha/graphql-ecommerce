import React, { Component } from 'react';
import './App.css';
import {Container,Box, Heading} from "gestalt";
import Strapi from "strapi-sdk-javascript/build/main";

const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class App extends Component {
  async componentDidMount(){
    try{
      const response = await strapi.request('POST', '/graphql',{
        data:{
          query: `query{
          brands {
            _id
            name
            description
            createdAt
            image{
              name
              url
            }
          }
        }`
        }
      });
      console.log(response);
    } catch(err){
      console.log(err)
    }

  }
  render() {
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
      </Container>
    );
  }
}

export default App;
