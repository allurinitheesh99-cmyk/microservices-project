package com.microservices.productservice.controller;

import com.microservices.productservice.entity.Product;

import com.microservices.productservice.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController

@RequestMapping("/products")

@CrossOrigin(origins = "http://localhost:3000")

public class ProductController {

    @Autowired
    private ProductService productService;

    // GET ALL PRODUCTS
    @GetMapping

    public List<Product> getAllProducts() {

        return productService
                .getAllProducts();
    }

    // GET PRODUCT BY ID
    @GetMapping("/{id}")

    public Optional<Product> getProductById(

            @PathVariable Long id
    ) {

        return productService
                .getProductById(id);
    }

    // ADD PRODUCT
    @PostMapping

    public Product addProduct(

            @Valid @RequestBody Product product
    ) {

        return productService
                .addProduct(product);
    }

    // UPDATE PRODUCT
    @PutMapping("/{id}")

    public Product updateProduct(

            @PathVariable Long id,

            @Valid @RequestBody Product product
    ) {

        return productService
                .updateProduct(
                        id,
                        product
                );
    }

    // DELETE PRODUCT
    @DeleteMapping("/{id}")

    public void deleteProduct(

            @PathVariable Long id
    ) {

        productService.deleteProduct(id);
    }

    // PAGINATION + SORTING
    @GetMapping("/paginated")

    public Page<Product> getProductsPaginated(

            @RequestParam int page,

            @RequestParam int size,

            @RequestParam String sortBy
    ) {

        return productService
                .getProductsPaginated(

                        page,
                        size,
                        sortBy
                );
    }
    @GetMapping("/filter/{price}")

    public List<Product>
    getProductsGreaterThanPrice(

            @PathVariable double price
    ) {

        return productService
                .getProductsGreaterThanPrice(
                        price
                );
    }
    @GetMapping("/price/{price}")

    public List<Product>
    getProductsByPrice(

            @PathVariable double price
    ) {

        return productService
                .getProductsByPrice(
                        price
                );
    }
}