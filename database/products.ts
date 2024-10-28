// import type { Products } from '../migrations/00000-createTableProducts';
import type { Product } from '../migrations/00000-createTableProducts';
import { sql } from './connect';

export const getProductsInsecure = async () => {
  const products = await sql<Product[]>`
    SELECT
      *
    FROM
      products
  `;

  return products;
};

export const getProductInsecure = async (productId: Product['id']) => {
  const [product] = await sql<Product[]>`
    SELECT
      *
    FROM
      products
    WHERE
      id = ${productId}
  `;

  return product;
};

export const createProductInsecure = async (
  newProduct: Omit<Product, 'id'>,
) => {
  const [product] = await sql<Product[]>`
    INSERT INTO
      products (name, price, address)
    VALUES
      (
        ${newProduct.name},
        ${newProduct.price},
        ${newProduct.address}
      )
    RETURNING
      products.*
  `;
  return product;
};

// export const updateGuestInsecure = async (updatedGuest: Guest) => {
//   const [guest] = await sql<Guest[]>`
//     UPDATE guests
//     SET
//       first_name = ${updatedGuest.firstName},
//       last_name = ${updatedGuest.lastName},
//       attending = ${updatedGuest.attending}
//     WHERE
//       id = ${updatedGuest.id}
//     RETURNING
//       guests.*
//   `;
//   return guest;
// };

// export const deleteGuestInsecure = async (guestId: Guest['id']) => {
//   const [guest] = await sql<Guest[]>`
//     DELETE FROM guests
//     WHERE
//       id = ${guestId}
//     RETURNING
//       guests.*
//   `;
//   return guest;
// };
