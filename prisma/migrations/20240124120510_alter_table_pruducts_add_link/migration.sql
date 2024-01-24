-- AddForeignKey
ALTER TABLE `productimages` ADD CONSTRAINT `productimages_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
