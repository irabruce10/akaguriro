import {
  createProductInsecure,
  getProductsInsecure,
} from '../../database/products';
import { ExpoApiResponse } from '../../ExpoApiResponse';
import {
  type Product,
  productsSchema,
} from '../../migrations/00000-createTableProducts';

export type ProductsResponseBodyGet = {
  products: Product[];
};

export async function GET(
  request: Request,
): Promise<ExpoApiResponse<ProductsResponseBodyGet>> {
  const cookie = request.headers.get('cookie');
  console.log('cookie', cookie);

  const products = await getProductsInsecure();
  if (!products) {
    alert('Error fetching products');
  }

  return ExpoApiResponse.json(
    {
      products: products,
    },
    {
      headers: {
        'Set-Cookie': 'test=123',
      },
    },
  );
}

export type ProductsResponseBodyPost =
  | {
      product: Product;
    }
  | {
      error: string;
      errorIssues?: { message: string }[];
    };

export async function POST(
  request: Request,
): Promise<ExpoApiResponse<ProductsResponseBodyPost>> {
  const requestBody = await request.json();

  const result = productsSchema.safeParse(requestBody);

  if (!result.success) {
    return ExpoApiResponse.json(
      {
        error: 'Request does not contain guest object',
        errorIssues: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }

  const newProduct = {
    name: result.data.name,
    price: result.data.price,
    address: result.data.address,
  };
  // description: result.data.description,
  // category: result.data.category,
  // image: result.data.image,
  // quantity: result.data.quantity,
  // owner: result.data.owner,
  const product = await createProductInsecure(newProduct);

  if (!product) {
    return ExpoApiResponse.json(
      {
        error: 'Guest not created',
      },
      {
        status: 500,
      },
    );
  }

  return ExpoApiResponse.json({ product: product });
}
