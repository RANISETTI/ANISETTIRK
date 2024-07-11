import React, { useState } from 'react';
import { useRouter } from 'next/router';
// import htmlDoc from '../../public/customizedProduct.html';

function GeneratedDocument() {
  const router = useRouter();
  const { query: { id } } = router;

  return (
    <div className="d-flex flex-column">
      {id}
    </div>
  );
}

export default GeneratedDocument;
