package com.microservices.productservice.service;

import com.microservices.productservice.entity.Product;
import java.util.stream.Collectors;
import com.microservices.productservice.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // GET ALL PRODUCTS
    public List<Product> getAllProducts() {

        return productRepository.findAll();
    }
    public List<Product>
    getProductsByPrice(
            double price
    ) {

        return productRepository
                .findProductsGreaterThanPrice(
                        price
                );
    }

    // GET PRODUCT BY ID
    public Optional<Product> getProductById(Long id) {

        return productRepository.findById(id);
    }

    // ADD PRODUCT
    public Product addProduct(Product product) {

        return productRepository.save(product);
    }

    // UPDATE PRODUCT
    public Product updateProduct(

            Long id,
            Product updatedProduct
    ) {

        Product product =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Product Not Found"
                                ));

        product.setName(
                updatedProduct.getName()
        );

        product.setPrice(
                updatedProduct.getPrice()
        );

        product.setStock(
                updatedProduct.getStock()
        );

        return productRepository.save(product);
    }

    // DELETE PRODUCT
    public void deleteProduct(Long id) {

        productRepository.deleteById(id);
    }

    // PAGINATION + SORTING
    public Page<Product> getProductsPaginated(

            int page,
            int size,
            String sortBy
    ) {

        Pageable pageable =

                PageRequest.of(

                        page,
                        size,

                        Sort.by(sortBy)
                );

        return productRepository
                .findAll(pageable);
    }
    public List<Product> getProductsGreaterThanPrice(
            double price
    ) {

        List<Product> products =
                productRepository.findAll();

        return products.stream()

                .filter(product ->

                        product.getPrice() > price
                )

                .collect(Collectors.toList());
    }
}