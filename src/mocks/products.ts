// import type { Product } from '@/shop/interfaces/product.interface'

// export const products: Product[] = [
// 	{
// 		id: '019a1465-abe0-786a-826c-f7e0dca273f7',
// 		name: 'Barricada Plegable',
// 		code: 'BARPLG',
// 		categoryName: 'Seguridad Vial',
// 		description: 'Valla plástica con reflejante para desvíos',
// 		price: 3200.0,
// 		stock: 18,
// 		isAvailable: true,
// 		imageUrl:
// 			'https://ogujzychknnsvxepkwkd.supabase.co/storage/v1/object/public/product-images/BARPLG.webp'
// 	},
// 	{
// 		id: '019a1465-abcb-70ef-bf85-21dec94bfaa0',
// 		name: 'Cono Reflectivo 28"',
// 		code: 'CON28R',
// 		categoryName: 'Seguridad Vial',
// 		description: 'Cono de tráfico PVC con banda reflectiva',
// 		price: 850.0,
// 		stock: 60,
// 		isAvailable: true,
// 		imageUrl:
// 			'https://ogujzychknnsvxepkwkd.supabase.co/storage/v1/object/public/product-images/CON28R.webp'
// 	},
// 	{
// 		id: '019a1465-abe1-7726-9534-4e5c5375415d',
// 		name: 'Panel de Yeso 1.22×2.44 m',
// 		code: 'PLY122',
// 		categoryName: 'Interiores',
// 		description: 'Placa drywall 1/2" estándar',
// 		price: 980.0,
// 		stock: 70,
// 		isAvailable: true,
// 		imageUrl:
// 			'https://ogujzychknnsvxepkwkd.supabase.co/storage/v1/object/public/product-images/PLY122.webp'
// 	},
// 	{
// 		id: '019a1465-abe1-74e4-b889-d4a8d9066156',
// 		name: 'Cornisa Decorativa 2 m',
// 		code: 'COR2M',
// 		categoryName: 'Interiores',
// 		description: 'Poliestireno, lista para pintar',
// 		price: 360.0,
// 		stock: 90,
// 		isAvailable: true,
// 		imageUrl:
// 			'https://ogujzychknnsvxepkwkd.supabase.co/storage/v1/object/public/product-images/COR2M.webp'
// 	},
// 	{
// 		id: '019a1465-abe0-7855-a49a-489a086a0eed',
// 		name: 'Malla Sombra 90%',
// 		code: 'SOM90',
// 		categoryName: 'Soluciones Ambientales',
// 		description: 'Rollo 2×25 m para control solar y polvo',
// 		price: 5400.0,
// 		stock: 9,
// 		isAvailable: true,
// 		imageUrl:
// 			'https://ogujzychknnsvxepkwkd.supabase.co/storage/v1/object/public/product-images/SOM90.webp'
// 	},
// 	{
// 		id: '019a1465-abe0-73bc-960d-c9acef8847ec',
// 		name: 'Geotextil No Tejido 150 g/m²',
// 		code: 'GTX150',
// 		categoryName: 'Soluciones Ambientales',
// 		description: 'Rollo 1.5×50 m para drenaje y filtración',
// 		price: 8700.0,
// 		stock: 7,
// 		isAvailable: true,
// 		imageUrl:
// 			'https://ogujzychknnsvxepkwkd.supabase.co/storage/v1/object/public/product-images/GTX150.webp'
// 	},
// 	{
// 		id: '019a1465-abe1-7f94-ba74-7b0570afd7b9',
// 		name: 'Fregadero Acero 84×48 cm',
// 		code: 'FRE8448',
// 		categoryName: 'Cocinas',
// 		description: 'Doble tina con desagüe incluido',
// 		price: 5600.0,
// 		stock: 14,
// 		isAvailable: true,
// 		imageUrl:
// 			'https://ogujzychknnsvxepkwkd.supabase.co/storage/v1/object/public/product-images/FRE8448.webp'
// 	},
// 	{
// 		id: '019a1465-abe1-7222-a733-0730856e2586',
// 		name: 'Tope de Cocina 1.50 m',
// 		code: 'TOP150',
// 		categoryName: 'Cocinas',
// 		description: 'Top de melamina con canto ABS',
// 		price: 4850.0,
// 		stock: 11,
// 		isAvailable: true,
// 		imageUrl:
// 			'https://ogujzychknnsvxepkwkd.supabase.co/storage/v1/object/public/product-images/TOP150.webp'
// 	},
// 	{
// 		id: '019a1465-abe1-7947-9ca3-8b1f2328c51d',
// 		name: 'Gabinete Baño 60 cm',
// 		code: 'GAB60CM',
// 		categoryName: 'Muebles',
// 		description: 'Mueble con espejo y lavamanos',
// 		price: 6850.0,
// 		stock: 10,
// 		isAvailable: true,
// 		imageUrl:
// 			'https://ogujzychknnsvxepkwkd.supabase.co/storage/v1/object/public/product-images/GAB60CM.webp'
// 	},
// 	{
// 		id: '019a1465-abe1-74b3-b101-d888ce61fdad',
// 		name: 'Sillón Reforzado de Trabajo',
// 		code: 'SILTRB',
// 		categoryName: 'Muebles',
// 		description: 'Sillón tapizado para interior',
// 		price: 4750.0,
// 		stock: 16,
// 		isAvailable: true,
// 		imageUrl:
// 			'https://ogujzychknnsvxepkwkd.supabase.co/storage/v1/object/public/product-images/SILTRB.webp'
// 	},
// 	{
// 		id: '019a1465-abe1-7d6e-a6ee-b888f55c834c',
// 		name: 'Cerradura de Seguridad 60 mm',
// 		code: 'CER60MM',
// 		categoryName: 'Puertas',
// 		description: 'Cilindro europeo con 5 llaves',
// 		price: 1950.0,
// 		stock: 36,
// 		isAvailable: true,
// 		imageUrl:
// 			'https://ogujzychknnsvxepkwkd.supabase.co/storage/v1/object/public/product-images/CER60MM.webp'
// 	},
// 	{
// 		id: '019a1465-abe0-716b-a0f4-fdefd94faea3',
// 		name: 'Puerta Metálica Externa 90 cm',
// 		code: 'PME90',
// 		categoryName: 'Puertas',
// 		description: 'Con marco y bisagras, lista para pintar',
// 		price: 11800.0,
// 		stock: 8,
// 		isAvailable: true,
// 		imageUrl:
// 			'https://ogujzychknnsvxepkwkd.supabase.co/storage/v1/object/public/product-images/PME90.webp'
// 	},
// 	{
// 		id: '019a1465-abe0-7d42-ac2e-71690183b6a8',
// 		name: 'Pintura Acrílica Mate 5 gal',
// 		code: 'PIN5GAL',
// 		categoryName: 'Terminaciones',
// 		description: 'Interior/exterior, blanco base',
// 		price: 3950.0,
// 		stock: 34,
// 		isAvailable: true,
// 		imageUrl:
// 			'https://ogujzychknnsvxepkwkd.supabase.co/storage/v1/object/public/product-images/PIN5GAL.webp'
// 	},
// 	{
// 		id: '019a1465-abe0-74f8-8ee9-a1d579e8c542',
// 		name: 'Yeso Tipo Pega 40 lb',
// 		code: 'YES40',
// 		categoryName: 'Terminaciones',
// 		description: 'Masilla para paneles y resanes finos',
// 		price: 480.0,
// 		stock: 95,
// 		isAvailable: true,
// 		imageUrl:
// 			'https://ogujzychknnsvxepkwkd.supabase.co/storage/v1/object/public/product-images/YES40.webp'
// 	},
// 	{
// 		id: '019a1465-abe0-7d0d-9810-37e042883d4d',
// 		name: 'Cemento Portland Tipo I 42.5 kg',
// 		code: 'CEM425',
// 		categoryName: 'Obra Gris',
// 		description: 'Saco de cemento para estructuras y losas',
// 		price: 495.0,
// 		stock: 240,
// 		isAvailable: true,
// 		imageUrl:
// 			'https://ogujzychknnsvxepkwkd.supabase.co/storage/v1/object/public/product-images/CEM425.webp'
// 	},
// 	{
// 		id: '019a1465-abe0-7610-abc0-29069628c934',
// 		name: 'Block 8" Estructural',
// 		code: 'BLOC8E',
// 		categoryName: 'Obra Gris',
// 		description: 'Bloque de concreto alta resistencia',
// 		price: 75.0,
// 		stock: 1800,
// 		isAvailable: true,
// 		imageUrl:
// 			'https://ogujzychknnsvxepkwkd.supabase.co/storage/v1/object/public/product-images/BLOC8E.webp'
// 	},
// 	{
// 		id: '3c6e7cdc-9de7-4fe3-949d-aae0891e6b86',
// 		name: 'MANGUERA 3/4 X 100 LIFE-FLEX ',
// 		code: 'MAN34L',
// 		categoryName: 'Equipos de Construcción',
// 		description: 'Manguera para Jardineria',
// 		price: 2500.0,
// 		stock: 25,
// 		isAvailable: true,
// 		imageUrl:
// 			'https://ogujzychknnsvxepkwkd.supabase.co/storage/v1/object/public/product-images/9ecdcbe2e5c14f5eb58af79ec9f29136.webp'
// 	},
// 	{
// 		id: '019a1465-abe1-7ec3-a61b-f52d2162c423',
// 		name: 'Mezcladora de Concreto 1/2 saco',
// 		code: 'MEZ12S',
// 		categoryName: 'Equipos de Construcción',
// 		description: 'Motor eléctrico 1 HP, tambor 140 L',
// 		price: 58900.0,
// 		stock: 4,
// 		isAvailable: true,
// 		imageUrl:
// 			'https://ogujzychknnsvxepkwkd.supabase.co/storage/v1/object/public/product-images/MEZ12S.webp'
// 	},
// 	{
// 		id: '019a1465-abe1-7267-bf29-6fee0b97e550',
// 		name: 'Compactador Tipo Rana 5.5 HP',
// 		code: 'COM55HP',
// 		categoryName: 'Equipos de Construcción',
// 		description: 'Para suelos granulares y zanjas',
// 		price: 112500.0,
// 		stock: 3,
// 		isAvailable: true,
// 		imageUrl:
// 			'https://ogujzychknnsvxepkwkd.supabase.co/storage/v1/object/public/product-images/COM55HP.webp'
// 	}
// ]

// export const categories = [
// 	'Todas',
// 	...Array.from(new Set(products.map((p) => p.categoryName)))
// ]
