import {Fragment, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from "../../components/spinner/spinner.component";
import {CategoryContainer, Title} from './category.styles';
import {useSelector} from "react-redux";
import {selectCategoriesIsLoading, selectCategoriesMap} from "../../store/categories/category.selector";

const Category = () => {
    const {category} = useParams();
    // const {categoriesMap} = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);
    const isLoading = useSelector(selectCategoriesIsLoading)

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <Title>{category.toUpperCase()}</Title>
            {
                isLoading ? <Spinner/> : (<CategoryContainer>
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product.id} product={product}/>
                            ))}
                    </CategoryContainer>
                )
            }
        </Fragment>
    );
};

export default Category;