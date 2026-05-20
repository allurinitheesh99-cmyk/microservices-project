package com.microservices.cartservice.service;

import com.microservices.cartservice.dto.Product;
import com.microservices.cartservice.entity.Cart;
import com.microservices.cartservice.kafka.KafkaProducerService;
import com.microservices.cartservice.repository.CartRepository;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class CartService {

    private final WebClient webClient;

    private final CartRepository cartRepository;

    private final KafkaProducerService kafkaProducerService;

    public CartService(WebClient webClient,
                       CartRepository cartRepository,
                       KafkaProducerService kafkaProducerService) {

        this.webClient = webClient;
        this.cartRepository = cartRepository;
        this.kafkaProducerService = kafkaProducerService;
    }

    // GET PRODUCT FROM PRODUCT SERVICE
    public Product getProductById(int productId) {

        return webClient
                .get()
                .uri("http://localhost:8081/products/" + productId)
                .retrieve()
                .bodyToMono(Product.class)
                .block();
    }

    // ADD PRODUCT TO CART
    public String addToCart(Cart cart) {

        Product product =
                getProductById(cart.getProductId());

        // CHECK PRODUCT EXISTS
        if (product == null) {

            return "Product not found";
        }

        // CHECK STOCK
        if (product.getStock()
                < cart.getQuantity()) {

            return "Not enough stock available";
        }

        // SAVE CART
        cartRepository.save(cart);

        // SEND EVENT TO KAFKA
        String message =
                "ProductId: "
                        + cart.getProductId()
                        + ", Quantity: "
                        + cart.getQuantity();

        kafkaProducerService.sendMessage(message);

        return "Product added to cart successfully";
    }
}