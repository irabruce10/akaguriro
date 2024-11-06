import { parse } from 'cookie';
import {
  productsSchema,
  type Product,
} from '../../../migrations/00007-createTableProducts';
import { ExpoApiResponse } from '../../../ExpoApiResponse';
import {
  createProductInsecure,
  getProductsInsecure,
} from '../../../database/products';

export type ProductsResponseBodyGet =
  | {
      products: Product[];
    }
  | {
      error: string;
      errorIssues?: { message: string }[];
    };

export async function GET(
  request: Request,
): Promise<ExpoApiResponse<ProductsResponseBodyGet>> {
  const cookie = parse(request.headers.get('cookie') || '');
  const sessionToken = cookie.sessionToken;

  if (!sessionToken) {
    return ExpoApiResponse.json({
      error: 'No session token found',
    });
  }

  const products = await getProductsInsecure(sessionToken);
  if (!products) {
    alert('Error fetching products');
  }

  return ExpoApiResponse.json({
    products: products,
  });
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
        error: 'Request does not contain product object',
        errorIssues: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }

  const cookies = parse(request.headers.get('cookie') || '');
  const sessionToken = cookies.sessionToken;

  if (!sessionToken) {
    return ExpoApiResponse.json({
      error: 'No session token found',
    });
  }

  const newProduct =
    sessionToken &&
    (await createProductInsecure(
      sessionToken,
      result.data.name,
      result.data.price,
      result.data.address,
    ));
  // description: result.data.description,
  // category: result.data.category,
  // image: result.data.image,
  // quantity: result.data.quantity,
  // owner: result.data.owner,
  // const product = await createProductInsecure(newProduct);

  if (!newProduct) {
    return ExpoApiResponse.json(
      {
        error: 'Product not created',
      },
      {
        status: 500,
      },
    );
  }

  return ExpoApiResponse.json({ product: newProduct });
}
