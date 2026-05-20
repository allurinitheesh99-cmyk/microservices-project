package com.microservices.productservice.async;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class AsyncService {

    private static final Logger logger =
            LoggerFactory.getLogger(
                    AsyncService.class);

    @Async
    public CompletableFuture<String> processMessage(
            String message) {

        logger.info(
                "Async processing started");

        try {

            Thread.sleep(3000);

        } catch (InterruptedException e) {

            logger.error(
                    "Error occurred during async processing",
                    e);
        }

        logger.info(
                "Async processing completed");

        return CompletableFuture.completedFuture(
                message);
    }
}