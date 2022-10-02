import { faker } from "@faker-js/faker"

export default function createNFakeProducts(n = 5) {
	let products = []
	for (let i = 0; i < n; i++) {
		products.push({
			id: faker.database.mongodbObjectId(),
			name: faker.commerce.product(),
			price: faker.commerce.price(700, 10000, 0, "$"),
			thumbnail: faker.image.food(640, 480, true),
		})
	}
	return products
}
