import React, { Component } from "react";
import "./App.css";
import {
  Container,
  Box,
  Heading,
  Card,
  Image,
  Text,
  SearchField,
  Icon,
  Spinner
} from "gestalt";
import Strapi from "strapi-sdk-javascript/build/main";
import { Link } from "react-router-dom";

const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

class App extends Component {
  state = {
    brands: [],
    searchTerm:"",
    loadingBrands: true
  };

  handleChange = ({value}) =>{
    this.setState({searchTerm: value})

  }

  filteredBrands = ({searchTerm, brands})=>{
    return brands.filter(brand=>{
      return brand.name.toLowerCase().includes(searchTerm.toLowerCase()) || brand.description.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }
  async componentDidMount() {
    try {
      const response = await strapi.request("POST", "/graphql", {
        data: {
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
      this.setState({ brands: response.data.brands, loadingBrands: false });
    } catch (err) {
      console.log(err);
      this.setState({ loadingBrands: false})
    }
  }
  render() {
    const { searchTerm, loadingBrands } = this.state;
    return (
      <Container>
        <Box display="flex" justifyContent="center" marginTop={4}>
          <SearchField
            id="searchField"
            accessibilityLabel="Brands Search Field"
            onChange={this.handleChange}
            placeholder="Search Brands"
          />
          <Box margin={3}>
            <Icon icon="filter" color={searchTerm ? 'orange': 'gray'} size={20} accessibilityLabel="Filter"/>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" marginBottom={2}>
          <Heading color="midnight" size="md">
            Brew Brands
          </Heading>
        </Box>
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: "#d6c8ec"
            }
          }}
          shape="rounded"
          wrap
          display="flex"
          justifyContent="around"
        >
          {this.filteredBrands(this.state).map(brand => (
            <Box paddingY={4} margin={2} width={200} key={brand._id}>
              <Card
                image={
                  <Box height={200} width={200}>
                    <Image
                      fit="cover"
                      src={`${apiUrl}${brand.image.url}`}
                      alt="Brand"
                      naturalWidth={1}
                      naturalHeight={1}
                    />
                  </Box>
                }
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                >
                  <Text bold size="xl">
                    {brand.name}
                  </Text>
                  <Text>{brand.description}</Text>
                  <Text bold size="xl">
                    <Link to={`/${brand._id}`}>See Brews</Link>
                  </Text>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
        <Spinner show={loadingBrands} accessibilityLabel="Loading Spinner" />
      </Container>
    );
  }
}

export default App;
