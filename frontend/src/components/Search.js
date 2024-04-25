import React from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import { useState } from 'react';
import Select from 'react-select';

const categories = [
  {label: 'Accesorios', value : 'Accesorios'},
  {label: 'Bisutería', value : 'Bisutería'},
  {label: 'Cuadros y Pinturas', value : 'Cuadros y Pinturas'},
  {label: 'Decoración', value : 'Decoración'},
  {label: 'Hogar', value : 'Hogar'},
  {label: 'Moda', value : 'Moda'},
  {label: 'Papelería', value : 'Papelería'},
  {label: 'Otros' , value : 'Otros'},
]

const Search = () => {
    const handleSelect = ({value}) => {
        console.log(value)
    }
  return (
    <Container className="search-container py-3 sm-12">
        <Col sm={12} md={6}>
            <Select
                defaultValue={{ label: 'Categorías', value: 'Default' }}
                onChange={handleSelect}
                options={categories}
            />
        </Col>
    </Container>

  )
}

export default Search