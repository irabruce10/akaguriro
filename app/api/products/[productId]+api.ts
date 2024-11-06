import {
  deleteProductInsecure,
  getProductInsecure,
  updateProductInsecure,
} from '../../../database/products';
import { ExpoApiResponse } from '../../../ExpoApiResponse';
import {
  productsSchema,
  type Product,
} from '../../../migrations/00007-createTableProducts';
import { parse } from 'cookie';
export type ProductResponseBodyGet =
  | {
      product: Product;
    }
  | {
      error: string;
    };

export async function GET(
  request: Request,
  { productId }: { productId: string },
): Promise<ExpoApiResponse<ProductResponseBodyGet>> {
  const cookies = parse(request.headers.get('cookie') || '');
  const sessionToken = cookies.sessionToken;

  if (!sessionToken) {
    return ExpoApiResponse.json(
      {
        error: 'No session token found',
      },
      {
        status: 401,
      },
    );
  }
  const product = await getProductInsecure(sessionToken, Number(productId));

  if (!product) {
    return ExpoApiResponse.json(
      {
        error: `No product with id ${product} found`,
      },
      {
        status: 404,
      },
    );
  }
  return ExpoApiResponse.json({ product: product });
}

export type ProductResponseBodyPut =
  | {
      product: Product;
    }
  | {
      error: string;
      errorIssues?: { message: string }[];
    };

// export async function PUT(
//   request: Request,
//   { productId }: { productId: string },
// ): Promise<ExpoApiResponse<ProductResponseBodyPut>> {
//   const requestBody = await request.json();

//   const result = productsSchema.safeParse(requestBody);

//   if (!result.success) {
//     return ExpoApiResponse.json(
//       {
//         error: 'Request does not contain guest object',
//         errorIssues: result.error.issues,
//       },
//       {
//         status: 400,
//       },
//     );
//   }

//   const updatedProduct = await updateProductInsecure({
//     id: Number(productId),
//     name: result.data.name,
//     price: result.data.price,
//     address: result.data.address,
//   });

//   if (!updatedProduct) {
//     return ExpoApiResponse.json(
//       {
//         error: `Product ${productId} not found`,
//       },
//       {
//         status: 404,
//       },
//     );
//   }

//   return ExpoApiResponse.json({ product: updatedProduct });
// }

export type ProductResponseBodyDelete =
  | {
      product: Product;
    }
  | {
      error: string;
    };

export async function DELETE(
  request: Request,
  { productId }: { productId: string },
): Promise<ExpoApiResponse<ProductResponseBodyDelete>> {
  const product = await deleteProductInsecure(Number(productId));

  if (!product) {
    return ExpoApiResponse.json(
      {
        error: `Product ${productId} not found`,
      },
      {
        status: 404,
      },
    );
  }

  return ExpoApiResponse.json({ product: product });
}
