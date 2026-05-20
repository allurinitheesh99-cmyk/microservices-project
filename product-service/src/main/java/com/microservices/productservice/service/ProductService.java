package com.microservices.productservice.service;

import com.microservices.productservice.entity.Product;
import com.microservices.productservice.repository.ProductRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // GET ALL PRODUCTS
    public List<Product> getAllProducts() {

        return productRepository.findAll();
    }

    // ADD PRODUCT
    public Product addProduct(Product product) {

        return productRepository.save(product);
    }

    // GET PRODUCT BY ID
    public Product getProductById(int id) {

        Optional<Product> product =
                productRepository.findById(id);

        return product.orElse(null);
    }

    // UPDATE PRODUCT
    public Product updateProduct(int id,
                                 Product updatedProduct) {

        Optional<Product> optionalProduct =
                productRepository.findById(id);

        if (optionalProduct.isPresent()) {

            Product product = optionalProduct.get();

            product.setName(updatedProduct.getName());
            product.setPrice(updatedProduct.getPrice());
            product.setStock(updatedProduct.getStock());

            return productRepository.save(product);
        }

        return null;
    }

    // DELETE PRODUCT
    public String deleteProduct(int id) {

        productRepository.deleteById(id);

        return "Product deleted successfully";
    }

    // PAGINATION + SORTING
    public Page<Product> getProductsWithPagination(
            int page,
            int size,
            String sortBy) {

        Pageable pageable =
                PageRequest.of(page,
                        size,
                        Sort.by(sortBy));

        return productRepository.findAll(pageable);
    }

    // JAVA STREAM FILTER
    public List<Product> getExpensiveProducts(double price) {

        return productRepository.findAll()
                .stream()
                .filter(product ->
                        product.getPrice() > price)
                .toList();
    }

    // NATIVE QUERY
    public List<Product> getProductsAbovePrice(
            double price) {

        return productRepository
                .getProductsAbovePrice(price);
    }

    // REDUCE STOCK
    public Product reduceStock(int id,
                               int quantity) {

        Optional<Product> optionalProduct =
                productRepository.findById(id);

        if (optionalProduct.isPresent()) {

            Product product = optionalProduct.get();

            int updatedStock =
                    product.getStock() - quantity;

            product.setStock(updatedStock);

            return productRepository.save(product);
        }

        return null;
    }
}