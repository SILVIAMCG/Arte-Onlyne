import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Row, Form } from 'react-bootstrap'
import {useForm} from 'react-hook-form';
import { getProductFromSellerContext, sellProductContext } from './context/ProductContext';
import Swal from 'sweetalert2';

//Este componente es un formulario para subir o actualizar productos, dependiendo del caso
const FormHandle = ({data = null, closeHandle, productoToFalse}) => {

    const [productHandle, setProductHandle] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');  
    const [nombre, setNombre ] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [categoria, setCategoria] = useState("");
    const [stock, setStock] = useState("");


    useEffect(() => {
        if (data !== null) {
            setProductHandle(data)
            setNombre(data.nombre)
            setDescripcion(data.descripcion)
            setPrecio(data.precio)
            setCategoria(data.categoria)
            setStock(data.stock)
        }
        return 
    }, [data])

    const {register, handleSubmit, formState: { errors },reset} = useForm();
    const { uploadProduct } = useContext(sellProductContext);
    const {updateProduct, emptyProducts} = useContext(getProductFromSellerContext);

    const showAlert = ()=>{Swal.fire({
        icon: "warning",
        title: "En espera de aprobación",
        text: productHandle ? "Si se aprueba, se actualizará el producto" : "Si se aprueba, tu producto será publicado",        
      });
    }

    const onSubmit = async (data) => {

        const productData = {
            ...data,
            imagen: selectedImage 
        };


        if (productHandle !== null ){
        //actualizar un producto existente
            const productoUpdated = await updateProduct(productHandle._id, productData);
            try {
                if (productoUpdated) {
                    showAlert();
                    reset();
                    setErrorMessage('');
                    emptyProducts();
                    productoToFalse(null);
                    closeHandle(false)
                }
                return
        } catch (error) {
          console.error("Error subiendo producto:", error);
          setErrorMessage("Error subiendo producto");
          reset();
        }
    }
      
        // crear un producto nuevo
        const uploadedProduct = await uploadProduct(productData);

        try{
        if (uploadedProduct) {
            showAlert();
            reset();
            setErrorMessage('');
            emptyProducts();
            closeHandle(false)
            }
        } catch (error) {
            console.error("Error subiendo producto:", error);
            setErrorMessage("Error subiendo producto");
            reset();
        }
    };
    
        const handleImageChange = (event) => {
            setSelectedImage(event.target.files[0]); 
        };
    
    
        // const handleInputChange = () => {
        //     setErrorMessage(''); 
        // };
    
  return (
    <Row className="justify-content-md-center">
    <Col>
        <Card className="my-5 p-3">
            <h2 className="text-center">Completa las características del producto</h2>
            
            <Form className = "form" onSubmit = {handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ingresa nombre del producto"{...register ("nombre", {required: productHandle ? false : true})} onChange={(e)=> setNombre(e.target.value)}
                value={nombre}
                />
                {errors.nombre && <span className="text-danger">Este campo es obligatorio</span>} 
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicImage">
                <Form.Label>Imagen</Form.Label>
                <Form.Control type="file" {...register("imagen", { required: productHandle ? false : true })} onChange={handleImageChange} />
                    {errors.imagen && <span className="text-danger">Este campo es obligatorio</span>}
                </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCategory">
                <Form.Label>Categoría</Form.Label>
                <Form.Select {...register("categoria", { required: productHandle ? false : true })} onChange={(e)=> setCategoria(e.target.value)}
                    value={categoria}
                    >
                        <option value="">Selecciona</option>
                        <option value="Accesorios">Accesorios</option>
                        <option value="Bisutería">Bisutería</option>
                        <option value="Cuadros y Pinturas">Cuadros y Pinturas</option>
                        <option value="Decoración">Decoración</option>
                        <option value="Hogar">Hogar</option>
                        <option value="Moda">Moda</option>
                        <option value="Papelería">Papelería</option>
                        <option value="Otros">Otros</option>
                    </Form.Select>
                    {errors.categoria && <span className="text-danger">Este campo es obligatorio</span>} 
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Descripción</Form.Label>
                <Form.Control type="text" placeholder="Ingresa descripción" {...register ("descripcion", {required: productHandle ? false : true})} onChange={(e)=> setDescripcion(e.target.value)}
                value={descripcion}
                />
                {errors.descripcion && <span className="text-danger">Este campo es obligatorio</span>} 
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrecio">
                <Form.Label>Precio</Form.Label>
                <Form.Control type="number" placeholder="Ingresa precio" {...register ("precio", {required: productHandle ? false : true, min: 1})}  min="1" onChange={(e)=> setPrecio(e.target.value)}
                value={precio}/>
                {errors.precio && <span className="text-danger">Este campo es obligatorio</span>} 
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" placeholder="Ingresa número de stock" {...register ("stock", {required: productHandle ? false : true, min: 1})} min="1" onChange={(e)=> setStock(e.target.value)}
                value={stock}/>
                {errors.stock && <span className="text-danger">Este campo es obligatorio</span>} 
            </Form.Group>

            <Button className = "form-button" variant="secondary" type="submit">
                Subir Producto
            </Button>

            </Form>                
        </Card>
    </Col>
</Row>
  )
}

export default FormHandle