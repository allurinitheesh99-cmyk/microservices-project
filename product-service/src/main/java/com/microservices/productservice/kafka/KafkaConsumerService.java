package com.microservices.productservice.kafka;

import com.microservices.productservice.async.AsyncService;
import com.microservices.productservice.entity.Product;
import com.microservices.productservice.repository.ProductRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class KafkaConsumerService {

    private final ProductRepository productRepository;

    private final AsyncService asyncService;

    private static final Logger logger =
            LoggerFactory.getLogger(
                    KafkaConsumerService.class);

    public KafkaConsumerService(
            ProductRepository productRepository,
            AsyncService asyncService) {

        this.productRepository = productRepository;
        this.asyncService = asyncService;
    }

    @KafkaListener(
            topics = "cart-topic",
            groupId = "product-group")
    public void consume(String message) {

        logger.info(
                "Message received from Kafka: {}",
                message);
        // ASYNC PROCESSING
        asyncService.processMessage(message);

        // EXTRACT PRODUCT ID
        String[] parts = message.split(",");

        Long productId=
                Long.parseLong(
                        parts[0]
                                .split(":")[1]
                                .trim());

        int quantity =
                Integer.parseInt(
                        parts[1]
                                .split(":")[1]
                                .trim());

        // FETCH PRODUCT
        Optional<Product> optionalProduct =
                productRepository.findById(productId);

        if (optionalProduct.isPresent()) {

            Product product =
                    optionalProduct.get();

            // REDUCE STOCK
            product.setStock(
                    product.getStock() - quantity);

            productRepository.save(product);

            logger.info(
                    "Stock updated successfully");
        }
    }
}