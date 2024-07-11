import LinK from 'next/link';
import React from 'react';
import {
  Card, ListGroupItem, ListGroup, Image,
} from 'react-bootstrap';

function ProductCard({ product }) {
  return (

    <div className="product-card rounded bg-white" >
      <LinK passHref href={`/dashboard/procurement/new/product/${product.id}`}>
        <a>
          <div className="bordered divider p-2 w-100 h-auto m-auto">
            {product.featured_image ? (
             <div>
                <Image className="w-100 h-auto rounded m-auto bordered bg-light" src={product.featured_image} style={{ objectFit: 'contain' }} />
             </div>
            ) : (
              <div>
                <Image src="/images/no_image.jpg" className="w-100 h-100 rounded m-auto bordered bg-light" />
                </div>
            )}
            <div className="bg-white pro-cart1">
              <div className='px-3 py-0'>
                <div className="procurement-product-card-details">
                  <span className="procurement-product-title color-pink" >
                    {product.title}
                  </span>
                </div>
                <div className="hr" />
                <div>
                  <p  className="mt-1 mb-0 thank-you-style1">
                    <span className='thank-you-style1' > {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price)}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </LinK>
    </div>

  );
}

export default ProductCard;
