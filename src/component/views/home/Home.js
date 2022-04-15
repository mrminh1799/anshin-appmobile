import {Link, Link as RouterLink, useHistory} from "react-router-dom";
import {useGetDetailProduct, useGetTop10, useGetTop10Sell} from "../../../service/product";
import {useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import {Card, Grid, Typography,Box,Stack} from "@mui/material";

const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
});

function Home() {
    let detail = useHistory();
    const top10Products = useGetTop10({})
    const [idProduct, setIdProduct] = useState()
    const detailProduct = useGetDetailProduct({
        id: idProduct
    })
    const toDetailProduct = (item) => {
        setIdProduct(item?.id)
    }
    useEffect(() => {
        if (idProduct) {
            detailProduct.refetch().then(res => {
                if (res) {
                    detail.push(`/detail/${idProduct}`, {
                        item: res?.data
                    })
                }
            })
        }
    }, [idProduct])

    useEffect(() => {
        top10Products.refetch()
    }, [])
    const top10ProductsSell = useGetTop10Sell({})
    useEffect(() => {
        top10ProductsSell.refetch()
    }, [])


    return (
        <div>
            <div >
                <div className="popular-items section-padding30" style={{marginLeft:50}}>
                    <div className="container">


                                <div className="section-tittle mb-70 text-center">
                                    <h2>Top 10 sản phẩm yêu thích</h2>
                                </div>

                        <Grid container spacing={3}>

                            {
                                top10Products?.data?.map((item, index) => {
                                    return (
                                        <Grid  key={item?.id} item xs={12} sm={6} md={2.2} onClick={() => toDetailProduct(item)}>
                                                <Card>
                                                    <Box sx={{ pt: '100%', position: 'relative' }}>

                                                            {/*<Label*/}
                                                            {/*    variant="filled"*/}
                                                            {/*    // color={(status === 'sale' && 'error') || 'info'}*/}
                                                            {/*    sx={{*/}
                                                            {/*        zIndex: 9,*/}
                                                            {/*        top: 16,*/}
                                                            {/*        right: 16,*/}
                                                            {/*        position: 'absolute',*/}
                                                            {/*        textTransform: 'uppercase'*/}
                                                            {/*    }}*/}
                                                            {/*>*/}
                                                            {/*   123*/}
                                                            {/*</Label>*/}

                                                        <ProductImgStyle src={item?.image} />
                                                    </Box>

                                                    <Stack spacing={2} sx={{ p: 3 }}>
                                                        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                                                            <Typography variant="subtitle2" noWrap>
                                                                {item?.name}}
                                                            </Typography>
                                                        </Link>

                                                        <Stack direction="row" alignItems="center" justifyContent="space-between">

                                                            <Typography variant="subtitle1">
                                                                {/*<Typography*/}
                                                                {/*    component="span"*/}
                                                                {/*    variant="body1"*/}
                                                                {/*    sx={{*/}
                                                                {/*        color: 'text.disabled',*/}
                                                                {/*        textDecoration: 'line-through'*/}
                                                                {/*    }}*/}
                                                                {/*>*/}
                                                                {/*   123*/}
                                                                {/*</Typography>*/}
                                                                &nbsp;
                                                                $ {item?.price}
                                                            </Typography>
                                                        </Stack>
                                                    </Stack>
                                                </Card>
                                        </Grid>
                                    )
                                })
                            }

                        </Grid>
                        <div className="row justify-content-center">
                            <div className="room-btn pt-70">
                                <Link style={{color: "white"}} href="catagori.html" className="btn view-btn1">View More
                                    Products</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="popular-items section-padding30" style={{marginLeft:50}}>
                    <div className="container">


                        <div className="section-tittle mb-70 text-center">
                            <h2>Top 10 sản phẩm bán chạy</h2>
                        </div>

                        <Grid container spacing={3}>

                            {
                                top10ProductsSell?.data?.map((item, index) => {
                                    return (
                                        <Grid  key={item?.id} item xs={12} sm={6} md={2.2}>
                                            <Card>
                                                <Box sx={{ pt: '100%', position: 'relative' }}>

                                                    {/*<Label*/}
                                                    {/*    variant="filled"*/}
                                                    {/*    // color={(status === 'sale' && 'error') || 'info'}*/}
                                                    {/*    sx={{*/}
                                                    {/*        zIndex: 9,*/}
                                                    {/*        top: 16,*/}
                                                    {/*        right: 16,*/}
                                                    {/*        position: 'absolute',*/}
                                                    {/*        textTransform: 'uppercase'*/}
                                                    {/*    }}*/}
                                                    {/*>*/}
                                                    {/*   123*/}
                                                    {/*</Label>*/}

                                                    <ProductImgStyle src={item?.image} />
                                                </Box>

                                                <Stack spacing={2} sx={{ p: 3 }}>
                                                    <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                                                        <Typography variant="subtitle2" noWrap>
                                                            {item?.name}}
                                                        </Typography>
                                                    </Link>

                                                    <Stack direction="row" alignItems="center" justifyContent="space-between">

                                                        <Typography variant="subtitle1">
                                                            {/*<Typography*/}
                                                            {/*    component="span"*/}
                                                            {/*    variant="body1"*/}
                                                            {/*    sx={{*/}
                                                            {/*        color: 'text.disabled',*/}
                                                            {/*        textDecoration: 'line-through'*/}
                                                            {/*    }}*/}
                                                            {/*>*/}
                                                            {/*   123*/}
                                                            {/*</Typography>*/}
                                                            &nbsp;
                                                            $ {item?.price}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </Card>
                                        </Grid>
                                    )
                                })
                            }

                        </Grid>
                        <div className="row justify-content-center">
                            <div className="room-btn pt-70">
                                <Link style={{color: "white"}} href="catagori.html" className="btn view-btn1">View More
                                    Products</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Home;