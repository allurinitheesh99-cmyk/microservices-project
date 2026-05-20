package com.microservices.productservice.controller;

import com.microservices.productservice.entity.Product;
import com.microservices.productservice.service.ProductService;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {

    private final ProductService productService;

    public ProductController(
            ProductService productService) {

        this.productService = productService;
    }

    // GET ALL PRODUCTS
    @GetMapping("/products")
    public List<Product> getAllProducts() {

        return productService.getAllProducts();
    }

    // ADD PRODUCT
    @PostMapping("/products")
    public Product addProduct(
            @Valid @RequestBody Product product) {

        return productService.addProduct(product);
    }

    // GET PRODUCT BY ID
    @GetMapping("/products/{id}")
    public Product getProductById(
            @PathVariable int id) {

        return productService.getProductById(id);
    }

    // UPDATE PRODUCT
    @PutMapping("/products/{id}")
    public Product updateProduct(
            @PathVariable int id,
            @RequestBody Product product) {

        return productService.updateProduct(id, product);
    }

    // DELETE PRODUCT
    @DeleteMapping("/products/{id}")
    public String deleteProduct(
            @PathVariable int id) {

        return productService.deleteProduct(id);
    }

    // PAGINATION + SORTING
    @GetMapping("/products/pagination")
    public Page<Product> getProductsWithPagination(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam String sortBy) {

        return productService
                .getProductsWithPagination(
                        page,
                        size,
                        sortBy);
    }

    // JAVA STREAM FILTER
    @GetMapping("/products/expensive")
    public List<Product> getExpensiveProducts(
            @RequestParam double price) {

        return productService
                .getExpensiveProducts(price);
    }

    // NATIVE QUERY
    @GetMapping("/products/native")
    public List<Product> getProductsAbovePrice(
            @RequestParam double price) {

        return productService
                .getProductsAbovePrice(price);
    }

    // REDUCE STOCK
    @PutMapping("/products/{id}/reduce")
    public Product reduceStock(
            @PathVariable int id,
            @RequestParam int quantity) {

        return productService
                .reduceStock(id, quantity);
    }
}