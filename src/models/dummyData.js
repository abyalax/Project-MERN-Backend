export const data = {
    users: [
        {
            id: 'user_bxdkj12',
            email: 'rLqFP@example.com',
            name: 'John Doe',
            password: 'password123',
            phone: '0871732783',
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z',
            address: [
                {
                    recipient: 'John Doe',
                    addressLine: 'Jalan Kenangan, Desa Bersamanya, Kec. Padang Timur, Padang, Sumatera Barat',
                    phone: '081234567890',
                    isMain: true
                },
                {
                    recipient: 'Jeni Doe',
                    addressLine: 'Jalan Kenangan, Desa Bersamanya, Kec. Padang Timur, Padang, Sumatera Barat',
                    phone: '08143467890',
                    isMain: false
                },
            ],
            carts: [
                {
                    productId: 'product_1',
                    quantity: 2,
                    price: 20000,
                    like: true
                },
                {
                    productId: 'product_2',
                    quantity: 1,
                    price: 34000,
                    like: false
                },
            ],
            stores: [
                {
                    storeId: 'store_1',
                    name: 'Store 1',
                    address: 'Jalan Kenangan, Desa Bersamanya, Kec. Padang Timur, Padang, Sumatera Barat',
                    products: [
                        {
                            productId: 'product_1',
                            quantity: 2,
                            price: 20000,
                            like: true
                        }
                    ]
                }
            ]
        },
    ],
    products: [
        {
            id: 'product_1',
            name: 'Product 1',
            description: 'This is product 1',
            price: 100,
            category: 'category 1',
            quantity: 10,
            sold: 1225,
            rate: 4.5,
            discount: 0.0,
            condition : 'new',
            minOrder: 1,
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z',
            reviews: [
                {
                    name: 'John Doe',
                    comment: 'This is comment 1',
                    like: 234,
                    createdAt: '2024-01-01T00:00:00.000Z',
                    sellerReply: {
                        text: 'This is seller reply 1',
                        createdAt: '2024-01-01T00:00:00.000Z'
                    }
                }
            ]
        },
    ]
}